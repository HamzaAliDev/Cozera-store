import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import axios from 'axios';

const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const initialState = [{ color: '', sizes: [{ size: 'S', stock: 0 }] }]
const initialStateData = { title: '', description: '', price: 0, category: '', sku: '', tags: '' }
export default function ProductForm({ initialData = {}, isEdit = false, onClose, onUpdate }) {
    // console.log('Initial Data', initialData);

    const [state, setState] = useState(initialStateData);
    const [variants, setVariants] = useState(initialData.variants || initialState);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);


    useEffect(() => {
        if (isEdit && initialData) {
            setState({
                title: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || 0,
                category: initialData.category || '',
                sku: initialData.sku || '',
                tags: (initialData.tags || []).join(', '),
            });

            setVariants(initialData.variants && initialData.variants.length > 0 ? initialData.variants : initialState);

            // if you want to set images into fileList for preview in edit mode, you can do that too:
            if (initialData.images?.length) {
                const formattedImages = initialData.images.map((url, index) => ({
                    uid: `-${index}`, // unique id
                    name: `image-${index + 1}.jpg`,
                    status: 'done',
                    url,
                }));
                setFileList(formattedImages);
            }
        }
    }, [initialData, isEdit]);


    // Handle Image Upload Preview
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleStateChange = e => setState({ ...state, [e.target.name]: e.target.value });
    const handleChange = ({ fileList: newList }) => setFileList(newList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );


    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
        const updated = [...variants];
        updated[variantIndex].sizes[sizeIndex][field] = value;
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([...variants, { color: '', sizes: [{ size: 'S', stock: 0 }] }]);
    };

    const addSize = (variantIndex) => {
        const updated = [...variants];
        updated[variantIndex].sizes.push({ size: 'S', stock: 0 });
        setVariants(updated);
    };

    const removeVariant = (index) => {
        const updated = variants.filter((_, i) => i !== index);
        setVariants(updated);
    };

    // Upload Images to Cloudinary
    const uploadImagesToCloudinary = async () => {
        const uploadedUrls = [];

        for (const file of fileList) {
            // If it's an already uploaded image (has a `url`), keep it as-is
            if (file.url) {
                uploadedUrls.push(file.url);
                continue;
            }

            // Otherwise, upload the new image
            const formData = new FormData();
            formData.append('file', file.originFileObj);
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

            try {
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                    formData
                );
                uploadedUrls.push(res.data.secure_url);
            } catch (error) {
                console.error('Upload failed:', error);
                message.error('Image upload failed');
                return [];
            }
        }

        return uploadedUrls;
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let { title, description, price, category, sku, tags } = state;

        let images = [];
        let name = title

        price = Number(price);
        tags = tags.split(',').map(tag => tag.trim());



        name = name.trim()
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        description = description.trim()
        sku = sku.trim()
        sku = sku.toUpperCase()


        if (!name || !description || !price || !category || !sku || !variants.length || tags.length === 0) {
            message.error('Please fill all fields!');
            setLoading(false);
            return;
        }

        try {
            const imageUrls = await uploadImagesToCloudinary();
            if (imageUrls.length === 0) {
                message.error('No images uploaded!')
                setLoading(false);
                return;
            };

            images = imageUrls;

        } catch (error) {
            console.error('Error uploading images:', error);
            message.error('Image upload failed!');
            setLoading(false);
            return;
        }


        const product = {
            name,
            description,
            price,
            category,
            sku,
            images,
            variants,
            tags
        };

        // console.log('Product data:', product);

        if (isEdit && initialData._id) {
            try {
                // Edit product logic
                const response = await axios.put(`http://localhost:8000/products/update/${initialData._id}`, product);

                // console.log("response.data", response.data);
                const data = response.data.data
                // console.log("data", data);
                message.success(response.data.message || 'Product updated successfully!');

                if (onUpdate) onUpdate(data);
            }
            catch (error) {
                console.error('Error updating product:', error);
                message.error('Product update failed!');
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const response = await axios.post(`${process.env.React_APP_API_URL}/products/add`, product);
                // console.log("response.data", response.data);
                message.success(response.data.message);

                setState(initialStateData);
                setVariants(initialState);
                setFileList([]);
                e.target.reset();
                setVariants(initialState);

            } catch (error) {
                console.error('Error adding product:', error);
                message.error('Product addition failed!');
            } finally {
                setLoading(false);
            }

        }

        if (!isEdit) {
            e.target.reset();
            setFileList([]);
            setVariants(initialState);
        }

        onClose();
    };

    return (
        <div className='container p-5'>
            <h1 className='text-center'>Add Product</h1>
            <form onSubmit={handleSubmit}>
                {/* Basic Fields */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Product Title</label>
                    <input type="text" className="form-control form-control-sm" id="title" name="title" value={state.title} onChange={handleStateChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control form-control-sm" min={0} id="price" name="price" value={state.price} onChange={handleStateChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select form-select-sm" name="category" value={state.category} onChange={handleStateChange} required>
                        <option value=""></option>
                        <option value="Clothing">Clothing</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" maxLength="300" value={state.description} onChange={handleStateChange}
                        style={{ overflowY: 'auto', resize: 'vertical' }} placeholder="Max 300 characters..." required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Product Tags</label>
                    <input type="text" className="form-control form-control-sm" placeholder='tags separated by comma' name='tags' value={state.tags} onChange={handleStateChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor='sku'>SKU</label>
                    <input type="text" className="form-control form-control-sm" id='sku' name='sku' value={state.sku} onChange={handleStateChange} required />
                </div>
                {/* Image Upload */}
                <div className="mb-3">
                    <label className="form-label">Product Images</label>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={() => false} // Prevent auto upload
                        required
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: visible => setPreviewOpen(visible),
                                afterOpenChange: visible => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>

                {/* Variants Section */}
                <div className="mb-3">
                    <p className="fs-6">Variants</p>
                    {variants.map((variant, variantIndex) => (
                        <div key={variantIndex} className="border p-3 mb-3 position-relative">
                            <div className="mb-2">
                                <label className="form-label">Color</label>
                                <input type="text" className="form-control form-control-sm"
                                    value={variant.color}
                                    onChange={(e) => handleVariantChange(variantIndex, 'color', e.target.value)}
                                    required />
                            </div>
                            <div>
                                <label className="form-label">Sizes</label>
                                {variant.sizes.map((sizeObj, sizeIndex) => (
                                    <div key={sizeIndex} className="d-flex gap-2 mb-2">
                                        <select
                                            className="form-select form-select-sm"
                                            value={sizeObj.size}
                                            onChange={(e) => handleSizeChange(variantIndex, sizeIndex, 'size', e.target.value)}
                                        >
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            placeholder="Stock"
                                            min={0}
                                            value={sizeObj.stock}
                                            onChange={(e) => handleSizeChange(variantIndex, sizeIndex, 'stock', e.target.value)}
                                            required />
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => addSize(variantIndex)}>
                                    Add Size
                                </button>
                            </div>
                            <button type="button" className="btn btn-sm btn-danger mt-3" onClick={() => removeVariant(variantIndex)}>
                                Remove Variant
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary mt-2" onClick={addVariant}>Add Variant</button>
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );

}
