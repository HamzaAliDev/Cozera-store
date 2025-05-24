import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {  EditOutlined, MailOutlined, ProductOutlined, UnorderedListOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
export default function LayoutDesign() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('0')
    const navigate = useNavigate();

    // Layout components data
    const items = [
        { key: '1', icon: <ProductOutlined />, label: 'Products' },
        { key: '2', icon: <EditOutlined />, label: 'Add Products' },
        { key: '3', icon: <UnorderedListOutlined />, label: 'Orders' },
        { key: '6', icon: <MailOutlined />, label: 'Users Email', },
    ]

    const handleSelectedMenu = (key) => {
        setSelectedKey(key);
        switch (key) {
            case '1':
                navigate('products');
                break;
            case '2':
                navigate('add-products');
                break;
            case '3':
                navigate('orders');
                break;
            case '6':
                navigate('users-email');
                break;
            default:
            // navigate('/');
        }
    };

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={items} onClick={({ key }) => handleSelectedMenu(key)} />
            </Sider>

        </>
    )
}
