import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Modal, Rate, Input, Button } from 'antd';

export default function OrderHistory() {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/orders/get/${userId}`);
            console.log(response.data);
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            window.toastify("Error fetching orders", "error");
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders(user._id);
        }
    }, [user]);

    const openReviewModal = (order, item) => {
        setSelectedOrder(order);
        setSelectedProduct(item);
        setIsModalOpen(true);
    };
    const handleReviewSubmit = async () => {
        if (rating === 0) {
            window.toastify("Please select a rating", "error");
            return;
        }
        if (reviewText.trim() === "") {
            window.toastify("Please write a review", "error");
            return;
        }

        const reviewData = {
            userId: user._id,
            orderId: selectedOrder._id,
            productId: selectedProduct.productId._id,
            rating: rating,
            comment: reviewText,
        };
        console.log('Review Data:', reviewData);

        try {
            const response = await axios.post("http://localhost:8000/reviews/add", reviewData);
            console.log(response.data);

            if (response.status === 201) {
                window.toastify("Review submitted successfully", "success");
                setRating(0)
                setReviewText("");
                setIsModalOpen(false);

            }

        } catch (error) {
            console.error("Error submitting review:", error);
            window.toastify("Error submitting review", "error");
        }
    };

    return (
        <main className="container-fluid bg-light p-0">
            <Breadcrumb />

            <div className="container py-5">
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Products</th>
                                <th scope="col">Quantities</th>
                                <th scope="col">Shipping Address</th>
                                <th scope="col">Total</th>
                                <th scope="col">Delivered At</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">No orders found</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        {/* Products */}
                                        <td>
                                            {order.orderItems.map((item, idx) => (
                                                <div key={item._id + idx} className="d-flex align-items-center gap-2 mb-3">
                                                    <img
                                                        src={item.productId?.image}
                                                        alt={item.name}
                                                        width="110"
                                                        height="110"
                                                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                                                    />
                                                    <div>
                                                        <p className='mb-0'>{item.name}</p>
                                                        <p className='mb-0'>size: {item.size}</p>
                                                        <p className='mb-0'>color: {item.color}</p>
                                                        <p className='mb-0'>price: ${item.price}</p>

                                                        {/* Review Button per product */}
                                                        <button
                                                            className="btn btn-secondary btn-sm mt-2"
                                                            onClick={() => openReviewModal(order, item)}
                                                        >
                                                            Review
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>

                                        {/* Quantities */}
                                        <td>
                                            {order.orderItems.map((item, idx) => (
                                                <div key={item._id + idx} className="mb-2">
                                                    {item.quantity}
                                                </div>
                                            ))}
                                        </td>

                                        {/* Shipping Address */}
                                        <td>
                                            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName},<br />
                                            {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
                                        </td>

                                        {/* Total */}
                                        <td>
                                            ${order.totalPrice}
                                        </td>

                                        {/* Delivered At */}
                                        <td>
                                            {order.deliverAt ? new Date(order.deliverAt).toLocaleDateString() : 'Not Delivered'}
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal
                title="Leave a Review"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {selectedOrder?.status === "Delivered" ? (
                    <>
                        <h5>Review for: {selectedProduct?.name}</h5> {/* Show product name */}

                        <h5>Rate:</h5>
                        <Rate onChange={(value) => setRating(value)} value={rating} />

                        <h5 className="mt-3">Write a review:</h5>
                        <Input.TextArea
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your experience..."
                        />

                        <div className="mt-4 text-end">
                            <Button type="primary" onClick={handleReviewSubmit}>
                                Submit Review
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h5 className="text-muted">You can only review after delivery.</h5>
                    </div>
                )}
            </Modal>
        </main>
    )
}
