import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import thumb01 from '../../../assets/images/thumb-1.png'
import thumb02 from '../../../assets/images/thumb-2.png'
import thumb03 from '../../../assets/images/thumb-3.png'
import thumb04 from '../../../assets/images/thumb-4.png'
import shoppingCrd from '../../../assets/images/payment.png';
import { Divider, InputNumber, Rate } from 'antd'
import { GoHeart } from 'react-icons/go'
import Products from '../../../components/Products'

export default function ShopDetail() {
    const [image, setImage] = useState(thumb01);
    const [activeSize, setActiveSize] = useState(""); // State for Size
    const [activeColor, setActiveColor] = useState(""); // State for Color
    const [activeTab, setActiveTab] = useState("reviews");

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

    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <section className="breadcrumb-option" style={{ backgroundColor: '#f3f2ee', padding: "40px 0px" }}>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/' >Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
            </section>

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
                                <img src={thumb01} alt="Small 1" className="img-fluid thumb-images" onClick={() => setImage(thumb01)} />
                                <img src={thumb02} alt="Small 2" className="img-fluid thumb-images" onClick={() => setImage(thumb02)} />
                                <img src={thumb03} alt="Small 3" className="img-fluid thumb-images" onClick={() => setImage(thumb03)} />
                                <img src={thumb04} alt="Small 4" className="img-fluid thumb-images" onClick={() => setImage(thumb04)} />
                            </div>
                        </div>

                    </div>


                    <div className="row px-lg-5 mt-5 border-top pt-5 text-center">
                        <h4 className='fw-bold'>Hooded thermal anorak</h4>
                        <div className="d-flex align-items-center justify-content-center">
                            <Rate disabled defaultValue={4} className="custom-rate" />
                            <p className='mb-0'>-5 Reviews</p>
                        </div>
                        <h1 className='fw-bold my-4'>$59.90</h1>
                        <p className='product-short-desription px-lg-5'>Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable cuff tabs, adjustable asymmetric hem with elastic side tabs and a front zip fastening with placket.</p>
                    </div>

                    <div className="row mt-5 ">
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-end justify-content-center align-items-center mb-3">
                            <p className='mb-1'>Size:</p>
                            <div className="size-btn-container">
                                {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                                    <button
                                        key={size}
                                        className={`btn ${activeSize === size ? "active" : ""}`}
                                        onClick={() => handleSizeClick(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center align-items-center mb-3">
                            <p className='mb-1'>Color:</p>
                            <div className="color-container d-flex justify-content-center align-items-center">
                                {["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"].map((color) => (
                                    <div
                                        key={color}
                                        className="color-circle"
                                        style={{
                                            backgroundColor: color,
                                            width: "27px",
                                            height: "27px",
                                            borderRadius: "50%",
                                            margin: "0 3px",
                                            cursor: "pointer",
                                            border: activeColor === color ? "2px solid #000" : "none"
                                        }}
                                        onClick={() => setActiveColor(color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-end justify-content-center align-items-center mb-3">
                            <p className='mb-1'>Quantity:</p>
                            <span className='border'>
                                <InputNumber min={1} max={10} defaultValue={1}
                                    variant="underlined"
                                />
                            </span>
                        </div>
                        <div className="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center align-items-center mb-3">
                            <button className='btn btn-dark py-3 px-5 rounded-0'>Add to cart</button>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className='btn custom-wishlist-btn'><GoHeart className='me-2 mb-1' size={20} />Add to Wishlist</button>
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
