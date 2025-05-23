import React, { useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import { ImCross } from "react-icons/im";
import Breadcrumb from '../../../components/Breadcrumb';
import { useCartStore } from '../../../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
    const { cart, removeFromCart, updateQuantity } = useCartStore()
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const initialQuantities = {};
        cart.forEach((item) => {
            const key = `${item.productId}-${item.color}-${item.size}`;
            initialQuantities[key] = item.quantity;
        });
        setQuantities(initialQuantities);
    }, [cart]);

    const handleRemoveFromCart = (productId, color, size) => {
        removeFromCart(productId, color, size);
    }

    const getCartTotal = () => {
        return cart.reduce((acc, item) => {
            const key = `${item.productId}-${item.color}-${item.size}`;
            const quantity = quantities[key] || item.quantity;
            return acc + item.price * quantity;
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };
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
                                        {cart.map((item, index) => (
                                            <tr key={index}>
                                                <td className="d-flex align-items-center ">
                                                    <img src={item.image} alt="" width={110} />
                                                    <div className="ms-3 product-info">
                                                        <p className='m-0 p-0'>{item.name}</p>
                                                        <p className='m-0 p-0 mb-2'>${item.price}</p>
                                                        <p className='m-0 p-0'>size: {item.size}</p>
                                                        <p className='m-0 p-0'>color: {item.color}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className='border py-2'>
                                                        <InputNumber
                                                            min={1}
                                                            max={5}
                                                            variant='underlined'
                                                            value={quantities[`${item.productId}-${item.color}-${item.size}`]}
                                                            onChange={(value) => {
                                                                const key = `${item.productId}-${item.color}-${item.size}`;
                                                                setQuantities((prev) => ({
                                                                    ...prev,
                                                                    [key]: value,
                                                                }));
                                                                updateQuantity(item.productId, item.color, item.size, value);
                                                            }}
                                                        />
                                                    </span>
                                                </td>
                                                <td>${(item.price * (quantities[`${item.productId}-${item.color}-${item.size}`] || item.quantity)).toFixed(2)}</td>
                                                <td>
                                                    <div className="px-1 py-3 rounded-5 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer', backgroundColor: '#f3f2ee' }} onClick={() => handleRemoveFromCart(item.productId, item.color, item.size)}>
                                                        <ImCross />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Link to='/shop'><button className='btn mt-5 py-2 px-3 btn-outline-dark rounded-0'>Continue Shopping</button></Link>
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="row">
                                <h4 className='fw-bold text-uppercase'>Discount Code</h4>
                                <div className="mb-5 mt-3 d-flex w-100 coupen-container">
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        disabled
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
                                    <p>${getCartTotal()}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Shipping</p>
                                    <p>Free</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Total</p>
                                    <p>${getCartTotal()}</p>
                                </div>
                                <div className="row mt-3">
                                    <button className='btn py-3 btn-dark rounded-0 proceed-btn' onClick={handleCheckout}>Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
