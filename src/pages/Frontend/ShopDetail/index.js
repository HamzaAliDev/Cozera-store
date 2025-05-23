import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, InputNumber, Rate } from 'antd'
import { GoHeart } from 'react-icons/go'
import { GoHeartFill } from "react-icons/go";
import { RiLoader2Line } from "react-icons/ri";
import Products from '../../../components/Products'
import Breadcrumb from '../../../components/Breadcrumb'
import axios from 'axios';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useCartStore } from '../../../store/useCartStore';

export default function ShopDetail() {
    const { productId } = useParams();
    const { user } = useAuthContext();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const { addToCart } = useCartStore();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState([]);
    const [activeSize, setActiveSize] = useState(""); // State for Size
    const [activeColor, setActiveColor] = useState(""); // State for Color
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("reviews");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isWishlisted = isInWishlist(productId);


    useEffect(() => {
        if (!productId || productId.trim() === '') {
            navigate('/shop');
        }
    }, [productId, navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/products/${productId}`);
                const data = res.data.data;
                setProduct(data);
                setImage(data.images?.[0])
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);


    if (loading) return <><p className="text-center py-5"><RiLoader2Line /></p></>;

    if (!product) return <p className="text-center py-5">Product not found</p>;

    const handleSizeClick = (size) => {
        setActiveSize(size);
    };


    const Tab = ({ title, count, isActive, onClick }) => {
        return (
            <button
                onClick={onClick}
                className={`tab-button ${isActive ? "active" : ""}`}
            >
                {title} {count !== undefined && `(${count})`}
                {isActive && <div className="tab-indicator"></div>}
            </button>
        );
    };

    const handleWishlistToggle = () => {

        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
            window.toastify("Removed from wishlist", 'warning');
        } else {
            if (!user?._id) return window.toastify("Please log in to add to wishlist", 'error');

            addToWishlist(user._id, {
                _id: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
            });
            window.toastify("Added to wishlist", 'success');
        }
    };


    const handleAddToCart = () => {
        if (!activeColor || !activeSize) {
            return window.toastify("Please select color and size", 'warning');
        }

        const item = {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            color: activeColor,
            size: activeSize,
            quantity,
        };

        if (!user?._id) return window.toastify("Please log in to add to cart", 'error');

        addToCart(user._id, item);
        window.toastify("Added to cart", 'success');
    };

    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb productName={product.name} />

            {/* Hero Section Begin */}
            <section className="hero-shopDetail-section" style={{ padding: "40px 0px" }}>
                <div className="container">
                    <div className="row">
                        {/* Big Image - Appears first on small screens */}
                        <div className="col-lg-8 col-md-8 col-sm-12 mb-2 order-lg-2 order-md-2 order-sm-1">
                            <div className="hero-big-image d-flex justify-content-center align-items-center">
                                <img src={image} alt="Big" className="img-fluid" />
                            </div>
                        </div>

                        {/* Thumbnail Images - Appears below on small screens */}
                        <div className="col-lg-3 col-md-2 col-sm-12 px-lg-5 p-md-3 order-lg-1 order-md-1 order-sm-2">
                            <div className="hero-small-images d-flex flex-sm-row flex-lg-column flex-md-column justify-content-center">
                                {product.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Small ${index + 1}`}
                                        className={`img-fluid thumb-images ${image === img ? "active-thumb" : ""}`}
                                        onClick={() => setImage(img)}
                                        style={{
                                            cursor: "pointer",
                                            border: image === img ? "1px solid #000" : "1px solid #ccc",
                                            marginBottom: "3px",
                                            borderRadius: "4px"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="row px-lg-5 mt-5 border-top pt-5 text-center">
                        <h4 className='fw-bold'>{product.name}</h4>
                        <div className="d-flex align-items-center justify-content-center">
                            <Rate disabled defaultValue={4} className="custom-rate" />
                            <p className='mb-0'>{product.numReviews} Reviews</p>
                        </div>
                        <h1 className='fw-bold my-4'>${product.price}</h1>
                        <p className='product-short-desription px-lg-5'>{product.description}</p>
                    </div>

                    <div className="row mt-5 ">
                        {/* Colors */}
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-end justify-content-center align-items-center mb-3">
                            <p className='mb-1 me-2'>Color:</p>
                            <div className="color-container d-flex justify-content-center align-items-center">
                                {product.variants.map((variant) => (
                                    <div
                                        key={variant._id}
                                        className="color-circle p-2"
                                        style={{
                                            margin: "0 3px",
                                            cursor: "pointer",
                                            border: activeColor === variant.color ? "2px solid #000" : "1px solid #ccc"
                                        }}
                                        onClick={() => {
                                            setActiveColor(variant.color);
                                            setActiveSize(""); // reset size when color changes
                                        }}
                                    ><p className='fs-6 m-0'>{variant.color}</p></div>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center align-items-center mb-3">
                            <p className='mb-1 me-2'>Size:</p>
                            <div className="size-btn-container">
                                {product.variants.find((v) => v.color === activeColor)?.sizes.map((s) => (
                                    <button
                                        key={s._id}
                                        className={`btn ${activeSize === s.size ? "active" : ""}`}
                                        onClick={() => handleSizeClick(s.size)}
                                    >
                                        {s.size}
                                    </button>
                                )) || <p className="text-muted">Please select a color first</p>}
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-end justify-content-center align-items-center mb-3">
                            <p className='mb-1'>Quantity:</p>
                            <span className='border'>
                                <InputNumber min={1} max={5}
                                    variant="underlined"
                                    value={quantity}
                                    onChange={(val) => setQuantity(val)}
                                />
                            </span>
                        </div>
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center align-items-center mb-3">
                            <button className='btn btn-dark py-3 px-5 rounded-0' onClick={handleAddToCart}>Add to cart</button>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className='btn custom-wishlist-btn' onClick={handleWishlistToggle}>
                            {isWishlisted ? (
                                <GoHeartFill className='me-2 mb-1' size={20} color="red" />
                            ) : (
                                <GoHeart className='me-2 mb-1' size={20} />
                            )}
                            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                        </button>
                    </div>

                </div>
            </section>

            {/* prodect detail section */}
            <section>
                <div className="product-tabs">
                    <div className="tabs-container">
                        <div className="nav nav-tabs">
                            <Tab title="Description" isActive={activeTab === "description"} onClick={() => setActiveTab("description")} />
                            <Tab title="Customer Previews" count={5} isActive={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} />
                            <Tab title="Additional Information" isActive={activeTab === "additional"} onClick={() => setActiveTab("additional")} />
                        </div>
                    </div>

                    <div className="tab-content">
                        {activeTab === "description" && (
                            <div className="tab-pane fade show active">
                                <h2>Product Description</h2>
                                <p>Detailed product description would go here.</p>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="tab-pane fade show active">
                                <h2>Products Information</h2>
                                <p>
                                    A Pocket PC is a handheld computer, which features many of the same capabilities as a modern PC.
                                    These handy little devices allow individuals to retrieve and store e-mail messages, create a contact file,
                                    coordinate appointments, surf the internet, exchange text messages, and more.
                                </p>
                                <p>
                                    As is the case with any new technology product, the cost of a Pocket PC was substantial during its early
                                    release. These days, customers are finding that prices have become much more reasonable.
                                </p>
                            </div>
                        )}

                        {activeTab === "additional" && (
                            <div className="tab-pane fade show active">
                                <h2>Additional Information</h2>
                                <p>Additional product information would go here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* related products */}
            <section className="container">
                <div className="row mt-5">
                    <Divider><h3>Related Products</h3></Divider>

                    <Products large={3} medium={4} />
                </div>
            </section>

        </main>
    )
}
