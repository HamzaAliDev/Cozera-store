import React from 'react'
import { ImCross } from 'react-icons/im'
import productImg from '../../../assets/images/banner-1.jpg'
import Breadcrumb from '../../../components/Breadcrumb'

export default function Wishlist() {
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section>
                <div className="container">
                    <div className="row my-5 px-lg-5">
                        <div className="table-responsive">
                            <table className="table table-light cart-table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock Status</th>
                                        <th scope="col">Action</th>
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
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            $60.00
                                        </td>
                                        <td>
                                            Instock
                                        </td>
                                        <td>
                                            <button className='btn btn-dark text-uppercase rounded-0' style={{ fontSize: "12px" }}>add to cart</button>
                                        </td>
                                        <td>
                                            <ImCross style={{cursor: "pointer"}} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>
                                            <div className="d-flex align-items-center ">
                                                <img src={productImg} alt="" width={110} />
                                                <div className="ms-3 product-info">
                                                    <p>Black jacket</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            $60.00
                                        </td>
                                        <td>
                                            Instock
                                        </td>
                                        <td>
                                            <button className='btn btn-dark text-uppercase rounded-0' style={{ fontSize: "12px" }}>add to cart</button>
                                        </td>
                                        <td>
                                            <ImCross  style={{cursor: "pointer"}}/>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>
                                            <div className="d-flex align-items-center ">
                                                <img src={productImg} alt="" width={110} />
                                                <div className="ms-3 product-info">
                                                    <p>Black jacket</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            $60.00
                                        </td>
                                        <td>
                                            Instock
                                        </td>
                                        <td>
                                            <button className='btn btn-dark text-uppercase rounded-0' style={{ fontSize: "12px" }}>add to cart</button>
                                        </td>
                                        <td>
                                            <ImCross  style={{cursor: "pointer"}}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
