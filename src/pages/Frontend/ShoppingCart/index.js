import React from 'react'
import productImg from '../../../assets/images/banner-1.jpg'
import { InputNumber } from 'antd'
import { ImCross } from "react-icons/im";
import Breadcrumb from '../../../components/Breadcrumb';

export default function ShoppingCart() {
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 mb-5 ">
                            <div className="table-responsive">
                                <table className="table table-light cart-table align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>
                                                <div className="d-flex align-items-center ">
                                                    <img src={productImg} alt="" width={110} />
                                                    <div className="ms-3 product-info">
                                                        <p>Black jacket</p>
                                                        <p>$60.00</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='border py-2'>
                                                    <InputNumber min={1} max={10} defaultValue={1}
                                                        variant="underlined"
                                                    />
                                                </span>
                                            </td>
                                            <td>$60.00</td>
                                            <td>
                                                <div className="px-1 py-3 rounded-5 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer', backgroundColor: '#f3f2ee' }}>
                                                    <ImCross />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>
                                                <div className="d-flex align-items-center ">
                                                    <img src={productImg} alt="" width={110} />
                                                    <div className="ms-3 product-info">
                                                        <p>Black jacket</p>
                                                        <p>$60.00</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='border py-2'>
                                                    <InputNumber min={1} max={10} defaultValue={1}
                                                        variant="underlined"
                                                    />
                                                </span>
                                            </td>
                                            <td>$60.00</td>
                                            <td>
                                                <div className="px-1 py-3 rounded-5 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer', backgroundColor: '#f3f2ee' }}>
                                                    <ImCross />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>
                                                <div className="d-flex align-items-center ">
                                                    <img src={productImg} alt="" width={110} />
                                                    <div className="ms-3 product-info">
                                                        <p>Black jacket</p>
                                                        <p>$60.00</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='border py-2'>
                                                    <InputNumber min={1} max={10} defaultValue={1}
                                                        variant="underlined"
                                                    />
                                                </span>
                                            </td>
                                            <td>$60.00</td>
                                            <td>
                                                <div className="px-1 py-3 rounded-5 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer', backgroundColor: '#f3f2ee' }}>
                                                    <ImCross />
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <button className='btn mt-5 py-2 px-3 btn-outline-dark rounded-0'>Continue Shopping</button>
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="row">
                                <h4 className='fw-bold text-uppercase'>Discount Code</h4>
                                <div className="mb-5 mt-3 d-flex w-100 coupen-container">
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        // value={couponCode}
                                        // onChange={(e) => setCouponCode(e.target.value)}
                                        className="coupen-input rounded-end-0 border-end-0"
                                    />
                                    <button className="btn btn-dark rounded-0 px-4">
                                        APPLY
                                    </button>
                                </div>

                            </div>
                            <div className="p-5" style={{ backgroundColor: '#f3f2ee' }}>
                                <h5 className="card-title">Cart Totals</h5>
                                <div className="mt-3 d-flex justify-content-between">
                                    <p>Subtotal</p>
                                    <p>$180.00</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Shipping</p>
                                    <p>Free</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Total</p>
                                    <p>$180.00</p>
                                </div>
                                <div className="row mt-3">
                                    <button className='btn py-3 btn-dark rounded-0 proceed-btn'>Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
