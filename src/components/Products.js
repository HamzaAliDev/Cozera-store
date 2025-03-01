import React, { useState } from 'react';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import banner1 from '../assets/images/banner-1.jpg';

export default function Products({large, medium}) {
    const [isfilled, setIsfilled] = useState(false);
    return (
        <section>
            <div className="row mt-5 d-flex justify-content-center align-items-center">
                {[...Array(7)].map((_, index) => ( // Assuming 7 items
                    <div key={index} className={`col-lg-${large} col-md-${medium} col-6 mb-3`}>
                        <div className="featured-item">
                            <div className="product-img-container">
                                <img src={banner1} alt="" className='product-img' />
                                <button className="product-btn">Quick View</button>
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                                <div>
                                    <p>Clothing Collections</p>
                                    <p>$ 34.0</p>
                                </div>
                                <div>
                                    {
                                        isfilled ? (
                                            <GoHeartFill size={20} onClick={() => setIsfilled(!isfilled)} />
                                        ) : (
                                            <GoHeart size={20} onClick={() => setIsfilled(!isfilled)} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
