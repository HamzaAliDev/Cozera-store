import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import Breadcrumb from '../../../components/Breadcrumb'
import { useCartStore } from '../../../store/useCartStore'
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const initialState = { fname: '', lname: '', country: '', city: '', address: '', postcode: '', email: '', phone: '' }
export default function Checkout() {
    const { user } = useAuthContext();
    const { cart, clearCart } = useCartStore();
    const [state, setState] = useState(initialState)
    const [address, setAddress] = useState([])
    const [addLoading, setAddLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [orderLoading, setOrderLoading] = useState(false);
    const navigate = useNavigate()

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;


    const fetchUserAddress = async () => {
        const token = localStorage.getItem('token') || ''
        if (!token) return window.toastify('Please login to continue', 'error')
        try {
            const response = await axios.get('http://localhost:8000/address/user-address', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setAddress(response.data.data)
            }
        } catch (error) {
            console.log(error)
            return window.toastify('Something went wrong', 'error')
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserAddress()
        }
    }, [user])


    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) return window.toastify('Please login to continue', 'error')

        let { fname, lname, country, city, address, postcode, email, phone } = state

        fname = fname.trim()
        lname = lname.trim()
        country = country.trim()
        city = city.trim()
        address = address.trim()
        postcode = postcode.trim()
        email = email.trim()
        phone = phone.trim()


        if (!fname || !lname || !country || !city || !address || !postcode || !email || !phone) return window.toastify('Please fill all fields', 'error');
        if (!/^[a-zA-Z]+$/.test(fname)) return window.toastify('First name should only contain letters', 'error')
        if (!/^[a-zA-Z]+$/.test(lname)) return window.toastify('Last name should only contain letters', 'error')
        if (!/^[a-zA-Z]+$/.test(country)) return window.toastify('Country should only contain letters', 'error')
        if (!/^[a-zA-Z]+$/.test(city)) return window.toastify('City should only contain letters', 'error')
        if (!/^[a-zA-Z0-9\s]+$/.test(address)) return window.toastify('Address should only contain letters and numbers', 'error')
        if (!/^[0-9]+$/.test(postcode)) return window.toastify('Postcode should only contain numbers', 'error')
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return window.toastify('Email is not valid', 'error')
        if (!/^[0-9]+$/.test(phone)) return window.toastify('Phone should only contain numbers', 'error')
        if (phone.length !== 11) return window.toastify('Phone number should be at least 11 digits', 'error')
        if (fname.length < 3 || lname.length < 3) return window.toastify('Name should be at least 3 characters', 'error')

        const formData = {
            firstName: fname, lastName: lname, country, city, address, postalCode: postcode, email, phone
        }
        const token = localStorage.getItem('token') || ''
        if (!token) return window.toastify('Please login to continue', 'error')

        try {
            setAddLoading(true)
            const response = await axios.post('http://localhost:8000/address/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data.data
            if (response.status === 201) {
                window.toastify('Address added successfully', 'success')
                setState(initialState)
                setAddress(prev => [...prev, data])
            }
        } catch (error) {
            console.log(error)
            return window.toastify('Something went wrong', 'error')
        } finally {
            setAddLoading(false)
        }

    }

    const handleDeleteAddress = async (id) => {
        const token = localStorage.getItem('token') || ''
        if (!token) return window.toastify('Please login to continue', 'error')
        try {
            setDeleteLoading(true)
            const response = await axios.delete(`http://localhost:8000/address/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setAddress(address.filter(item => item._id !== id))
                window.toastify('Address deleted successfully', 'success')
            }
        } catch (error) {
            console.log(error)
            return window.toastify('Something went wrong', 'error')
        } finally {
            setDeleteLoading(false)
        }
    }


    const handlePlaceOrder = async () => {
        if (!user) return window.toastify('Please login to place an order', 'error');
        if (cart.length === 0) return window.toastify('Your cart is empty', 'error');
        if (!selectedAddressId) return window.toastify('Please select a shipping address', 'error');

        const token = localStorage.getItem('token') || ''
        if (!token) return window.toastify('Please login to continue', 'error');

        const selectedAddress = address.find(a => a._id === selectedAddressId);
        if (!selectedAddress) return window.toastify('Selected address not found', 'error');

        const orderPayload = {
            orderItems: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
                color: item.color,
                size: item.size,
                
            })),
            shippingAddress: selectedAddress,
            totalPrice: total,
        }

        try {
            setOrderLoading(true);
            const response = await axios.post('http://localhost:8000/orders/add', orderPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                window.toastify('Order placed successfully', 'success');
                clearCart();
                navigate('/shop')
            }
        } catch (error) {
            console.log(error);
            return window.toastify('Failed to place order', 'error');
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section className='my-5 '>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-8 col-md-6 col-sm-12 px-4">
                            <div>
                                <h2 className='fs-4 text-uppercase'>Your Address</h2>
                                <hr />
                                <div className="row mt-5">
                                    {address.map((item, index) => {
                                        const isSelected = selectedAddressId === item._id;
                                        return (
                                            <div className="col-12 mb-4" key={index}>
                                                <div
                                                    className={`card p-3 ${isSelected ? 'border-primary shadow' : ''}`}
                                                    style={{ cursor: 'pointer', borderWidth: '2px' }}
                                                    onClick={() => setSelectedAddressId(item._id)}
                                                >
                                                    <div className='d-flex justify-content-between align-items-start'>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                name="selectedAddress"
                                                                value={item._id}
                                                                checked={isSelected}
                                                                onChange={() => { }} // prevent double update
                                                                onClick={(e) => e.stopPropagation()} // stop radio from bubbling to parent
                                                            />
                                                            <label className='ms-2'>
                                                                <strong>{item.firstName} {item.lastName}</strong> - {item.address}, {item.city}, {item.country}, {item.postalCode}<br />
                                                                <small>{item.email}, {item.phone}</small>
                                                            </label>
                                                        </div>
                                                        <div>
                                                            {deleteLoading ? (
                                                                <span className='text-danger'>Deleting...</span>
                                                            ) : (
                                                                <MdDelete
                                                                    size={20}
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // stop delete click from triggering card click
                                                                        handleDeleteAddress(item._id);
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}


                                </div>
                            </div>
                            <h2 className='fs-4 text-uppercase'>Billing Details</h2>
                            <hr />

                            <form onSubmit={handleSubmit} className="contact__form mt-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="First Name *" name='fname' value={state.fname} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Last Name *" name='lname' value={state.lname} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Country *" name='country' value={state.country} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="City *" name='city' value={state.city} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Address *" name='address' value={state.address} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Postcode / ZIP *" name='postcode' value={state.postcode} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Email *" name='email' value={state.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Phone *" name='phone' value={state.phone} onChange={handleChange} />
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        {addLoading ? <button type="submit" className="contact-btn" disabled>Adding...</button> : <button type="submit" className="contact-btn">Add Address</button>}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 checkout-cart">
                            <h2 className='fs-4 text-uppercase'>Your Order</h2>
                            <hr />
                            <div className="row mt-5">
                                <table className='table-borderless' >
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row mt-5">
                                <hr />
                                <div className="col-6">
                                    <p>Subtotal</p>
                                    <p>Shipping</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>${subtotal.toFixed(2)}</p>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <hr />
                                <div className="col-6">
                                    <p>Total</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>${total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="row mt-3 px-3">
                                <button
                                    className='btn checkout-btn'
                                    onClick={handlePlaceOrder}
                                    disabled={orderLoading}
                                >
                                    {orderLoading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main >
    )
}
