import React, { useCallback, useEffect, useState } from 'react';
import { Space, Table, Image, message, Modal } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import axios from 'axios';
import ProductForm from '../../../components/ProductForm';


export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const fetchProducts = useCallback(async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/products/get-complete-products', {
                params: { page, limit },
            });
            const { data, total } = response.data;
            setProducts(data);
            setPagination(prev => ({
                ...prev,
                current: page,
                total,
            }));
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const { current, pageSize } = pagination;

    useEffect(() => {
        fetchProducts(current, pageSize);
    }, [fetchProducts, current, pageSize]);


    const handleTableChange = (pagination) => {
        fetchProducts(pagination.current, pagination.pageSize);
    };



    const columns = [
        {
            title: 'St #',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Image',
            key: 'images',
            dataIndex: 'images',
            render: (images) => (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {images.map((img, idx) => (
                        <Image key={img} width={60} height={60} src={img} alt={`Product Image ${idx + 1}`} />
                    ))}
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Varients',
            key: 'varients',
            dataIndex: 'varients',
            render: (_, record) => (
                Array.isArray(record.variants) && record.variants.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {record.variants.map((variant, index) => (
                            <div key={index + 1}>
                                <strong>{variant.color || 'N/A'}:</strong>{" "}
                                {Array.isArray(variant.sizes) && variant.sizes.length > 0 ? (
                                    variant.sizes.map((s, i) => (
                                        <span key={i + 1}>
                                            {s.size}-{s.stock}
                                            {i < variant.sizes.length - 1 ? ', ' : ''}
                                        </span>
                                    ))
                                ) : 'N/A'}
                            </div>
                        ))}
                    </div>
                ) : '-'
            )
        },
        {
            title: 'Sku',
            key: 'sku',
            dataIndex: 'sku',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {record.tags.map((tag, index) => (
                        <span key={index + 1} className='badge bg-secondary'>{tag}</span>
                    ))}
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className='btn btn-warning' onClick={() => { showModal(record) }}>Edit</button>
                    <button className='btn btn-danger' onClick={() => deleteProduct(record._id)}>Delete</button>
                </Space>
            ),
        },
    ];

    const deleteProduct = async (id) => {
        const productId = id;
        try {
            const response = await axios.delete(`http://localhost:8000/products/delete/${productId}`);

            setProducts(products.filter(product => product._id !== productId));
            setPagination(prev => ({
                ...prev,
                total: prev.total - 1
            }));
            message.success(response.data.message || "Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            message.error(error.response?.data?.message || "Error deleting product");
        }
    }


    const showModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);

    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSearch = async () => {
        console.log("search", search);
        if (search.trim() === '') {
            message.error("Please enter a search term.");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/products/search', {
                params: {
                    search,
                }
            });

            // console.log("updation response", response.data);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error searching products:", error);
            message.error("Error searching products");
        } finally {
            setLoading(false);
            setSearch('');
        }
    }

    // console.log("selectedProduct", selectedProduct);
    // console.log("products", products);
    return (
        <div className='container'>
            <div className='row m-3'>
                <h4 className='text-center my-3'>Products</h4>
            </div>

            {/* search bar */}
            <form onSubmit={handleSearch}>
                <div className='row m-2 my-3'>
                    <div className='col-11 px-0'>
                        <input type="text" className='form-control' placeholder='Search Products...'
                            name='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className='col-1 px-0 '>
                        <span className='bg-white ms-1 p-2 rounded-5 d-flex justify-content-center align-items-center'
                            style={{ height: '40px', width: '40px' }}
                            onClick={handleSearch}>
                            <IoSearchOutline size={28} />
                        </span>
                    </div>
                </div>
            </form>
            <div className='table-responsive'>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={products}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                />
            </div>



            <Modal
                title='Edit Product'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <ProductForm
                    initialData={selectedProduct}
                    onClose={handleCancel}
                    isEdit={true}
                    onUpdate={(updatedProduct) => {
                        // Update the product in your local state
                        setProducts((prev) =>
                            prev.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod))
                        );
                    }}
                />
            </Modal>
        </div>
    )
}
