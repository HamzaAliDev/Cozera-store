import React from 'react'
import Breadcrumb from '../../../components/Breadcrumb'

export default function Checkout() {
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section className='my-5 '>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-8 col-md-6 col-sm-12 px-4">
                            <h2 className='fs-4 text-uppercase'>Billing Details</h2>
                            <hr />

                            <form action="#" className="contact__form mt-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="First Name *" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Last Name *" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Country *" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="City *" />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Address *" />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Postcode / ZIP *" />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Email *" />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Phone *" />
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        <button type="submit" className="contact-btn">Add Address</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 checkout-cart">
                            <h2 className='fs-4 text-uppercase'>Your Order</h2>
                            <hr />
                            <div className="row mt-5">
                                <div className="col-6">
                                    <p>Product</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>Total</p>
                                </div>
                                <div className="col-6 products-name">
                                    <p>Product Name</p>
                                    <p>Product Name</p>
                                    <p>Product Name</p>
                                    <p>Product Name</p>
                                    <p>Product Name</p>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <hr />
                                <div className="col-6">
                                    <p>Subtotal</p>
                                    <p>Shipping</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>$240.00</p>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <hr />
                                <div className="col-6">
                                    <p>Total</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>$240.00</p>
                                </div>
                            </div>
                            <div className="row mt-3 px-3">
                                <button className='btn checkout-btn'>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    )
}
