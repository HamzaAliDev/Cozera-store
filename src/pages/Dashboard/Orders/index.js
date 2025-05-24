import React, { useCallback, useEffect, useState } from 'react';
import { Table, Button, Modal, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [newDeliverAt, setNewDeliverAt] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const fetchOrders = useCallback(async (page, pageSize) => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.React_APP_API_URL}/orders/get?page=${page}&limit=${pageSize}`);
            const fetchedOrders = res.data.data;
            const total = res.data.total;

            if (res.status !== 200) {
                message.error('Failed to fetch orders');
                return;
            }
            const formattedOrders = fetchedOrders.map((order, index) => ({
                key: order._id,
                number: index + 1,
                orderId: order._id,
                userName: order.userId?.name || 'Unknown User',
                userEmail: order.userId?.email || 'Unknown Email',
                shippingAddress: order.shippingAddress
                    ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}, Postal: ${order.shippingAddress.postalCode}, Email: ${order.shippingAddress.email}, Phone: ${order.shippingAddress.phone}`
                    : 'No address found',
                createdAt: new Date(order.createdAt).toLocaleString(),
                deliverAt: order.deliverAt ? dayjs(order.deliverAt).format('YYYY-MM-DD HH:mm:ss') : "Not delivered yet",
                rawDeliverAt: order.deliverAt || null,
                status: order.status,
                total: order.totalPrice || 0,
                orderItems: order.orderItems || [],
            }));

            setOrders(formattedOrders);
            setPagination(prev => ({
                ...prev,
                total: total,
                current: page,
            }));

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    }, []);



    useEffect(() => {
        fetchOrders(1, pagination.pageSize);
    }, [fetchOrders, pagination.pageSize]);



    const handleTableChange = (pagination) => {
        fetchOrders(pagination.current, pagination.pageSize);
        setPagination({
            ...pagination,
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const openEditModal = (record) => {
        setEditingOrder(record);
        setNewDeliverAt(record.rawDeliverAt ? dayjs(record.rawDeliverAt) : null);
        setNewStatus(record.status || 'pending');
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!newDeliverAt || !newStatus) {
            message.error('Please select delivered date and status.');
            return;
        }

        try {
            const isoDate = newDeliverAt.toISOString();

            const res = await axios.put(`${process.env.React_APP_API_URL}/orders/update/${editingOrder.orderId}`, {
                deliverAt: isoDate,
                status: newStatus,
            });

            if (res.status === 200) {
                message.success('Order updated successfully');
                setIsModalOpen(false);
                setOrders((prevOrders) =>
                    prevOrders.map((order) => {
                        if (order.orderId === editingOrder.orderId) {
                            return {
                                ...order,
                                deliverAt: dayjs(isoDate).format('YYYY-MM-DD HH:mm:ss'),
                                rawDeliverAt: isoDate,
                                status: newStatus,
                            };
                        }
                        return order;
                    })
                );
            }
            else {
                message.error('Failed to update order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
            message.error('Failed to update order');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const columns = [
        { title: 'No.', dataIndex: 'number', key: 'number' },
        { title: 'Customer Name', dataIndex: 'userName', key: 'userName' },
        { title: 'Customer Email', dataIndex: 'userEmail', key: 'userEmail' },
        { title: 'Shipping Address', dataIndex: 'shippingAddress', key: 'shippingAddress' },
        { title: 'Order Created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Delivered At', dataIndex: 'deliverAt', key: 'deliverAt' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Total ($)', dataIndex: 'total', key: 'total' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={() => openEditModal(record)}>
                    Edit
                </Button>
            ),
        },

    ];

    // Mini table inside when you expand a row
    const expandedRowRender = (record) => {
        const orderItemsColumns = [
            { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
            { title: 'Size', dataIndex: 'size', key: 'size' },
            { title: 'Color', dataIndex: 'color', key: 'color' },
            { title: 'Price ($)', dataIndex: 'price', key: 'price' },
        ];

        const orderItemsData = record.orderItems.map((item, index) => ({
            key: item._id || index,
            productName: item.productId?.name || item.name || 'Unknown Product',
            quantity: item.quantity,
            size: item.size || 'N/A',
            color: item.color || 'N/A',
            price: item.productId?.price || item.price || 0,

        }));

        return <Table columns={orderItemsColumns} dataSource={orderItemsData} pagination={false} />;
    };

    return (
        <div className="p-5">
            <h1 className="my-5 text-center text-2xl font-bold">Orders</h1>

            <Table
                dataSource={orders}
                columns={columns}
                loading={loading}
                expandable={{ expandedRowRender }}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                }}
                onChange={handleTableChange}
                scroll={{ x: true }}
            />

            <Modal
                title="Edit Order"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Update"
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="font-medium">Delivered At:</label>
                        <DatePicker
                            showTime
                            value={newDeliverAt}
                            onChange={(date) => setNewDeliverAt(date)}
                            style={{ width: '100%', marginTop: '5px' }}
                        />
                    </div>
                    <div>
                        <label className="font-medium">Status:</label>
                        <Select
                            value={newStatus}
                            onChange={(value) => setNewStatus(value)}
                            style={{ width: '100%', marginTop: '5px' }}
                        >
                            <Option value="Pending">Pending</Option>
                            <Option value="Delivered">Delivered</Option>
                            <Option value="Cancelled">Cancelled</Option>
                            <Option value="Shipped">Shipped</Option>
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
