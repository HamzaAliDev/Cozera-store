import React, { useState } from 'react'
import { Col, InputNumber, Row, Slider, } from 'antd'
import { IoIosSearch } from 'react-icons/io'
import { HiOutlineAdjustments } from "react-icons/hi";
import Products from '../../../components/Products';
import Breadcrumb from '../../../components/Breadcrumb';
import { useProductStore } from '../../../store/useProductStore';
import { BiLoader } from 'react-icons/bi';

export default function Shop() {
    const { searchProduct, searchProductLoading } = useProductStore()
    const [search, setSearch] = useState("");
    const [inputValue, setInputValue] = useState(1);
    const [activeSize, setActiveSize] = useState(""); // State for Size
    const [activeTag, setActiveTag] = useState(""); // State for Tag

    const handleSizeClick = (size) => {
        setActiveSize(size);
    };

    const handleTagClick = (tag) => {
        setActiveTag(tag);
    }
    const onChange = (newValue) => {
        setInputValue(newValue);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        let searchValue = search.trim();

        if (searchValue) {
            await searchProduct(searchValue);
        } else {
            setSearch("");
        }
    }
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            {/* shop section */}
            <section className='shop-section'>
                <div className="container">
                    <div className="row shop_filter_container">
                        <div className="col">
                            <button className='btn btn-outline-secondary filter-btn ms-2 rounded-1 d-flex align-items-center'
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >
                                <HiOutlineAdjustments />
                                Filter</button>
                        </div>
                    </div>
                    <div className="collapse" id="collapseExample">
                        <div className="my-3">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__search ">
                                    <form >
                                        <input type="text" placeholder="Search..." name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                                        <button className='search-btn' onClick={handleSearchSubmit}><IoIosSearch size={20} /></button>
                                    </form>
                                </div>
                                <div className="shop__sidebar__filter mt-4">
                                    <h5 className='fw-bold'>CATEGORIES</h5>
                                    <div className="shop__sidebar__filter__categories">
                                        <ul className='list-unstyled ms-2'>
                                            <li>Clothing</li>
                                            <li>Shoes</li>
                                            <li>Accessories</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="shop__sidebar__filter mt-2">
                                    <h5 className='fw-bold'>PRICE</h5>
                                    <Row className='ms-3'>
                                        <Col span={14}>
                                            <Slider
                                                min={1}
                                                max={40}
                                                onChange={onChange}
                                                value={typeof inputValue === 'number' ? inputValue : 0}
                                            />
                                        </Col>
                                        <Col span={2}>
                                            <InputNumber
                                                min={1}
                                                max={40}
                                                style={{
                                                    margin: '0 12px',
                                                    borderRadius: '2px',
                                                    width: '50px'
                                                }}
                                                value={inputValue}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="shop__sidebar__filter mt-2">
                                    <h5 className='fw-bold'>SIZE</h5>
                                    <div className="shop__sidebar__filter__size ms-2">
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
                                <div className="shop__sidebar__filter mt-3">
                                    <h5 className='fw-bold'>TAG</h5>
                                    <div className="shop__sidebar__filter__tag ms-3">
                                        {['sale', 'new arrival', 'eid collects', 'summers'].map((tag) => (
                                            <button
                                                key={tag}
                                                className={`btn ${activeTag === tag ? "active" : ""}`}
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="large-slider col-lg-3 col-md-3 ps-0">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__search ">
                                    <form action="#">
                                        <input type="text" placeholder="Search..." />
                                        <button type="submit" className='search-btn'><IoIosSearch size={20} /></button>
                                    </form>
                                </div>
                                <div className="shop__sidebar__filter mt-4">
                                    <h5 className='fw-bold'>CATEGORIES</h5>
                                    <div className="shop__sidebar__filter__categories">
                                        <ul className='list-unstyled ms-2'>
                                            <li>Clothing</li>
                                            <li>Shoes</li>
                                            <li>Accessories</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="shop__sidebar__filter mt-2">
                                    <h5 className='fw-bold'>PRICE</h5>
                                    <Row className='ms-3'>
                                        <Col span={14}>
                                            <Slider
                                                min={1}
                                                max={40}
                                                onChange={onChange}
                                                value={typeof inputValue === 'number' ? inputValue : 0}
                                            />
                                        </Col>
                                        <Col span={2}>
                                            <InputNumber
                                                min={1}
                                                max={40}
                                                style={{
                                                    margin: '0 12px',
                                                    borderRadius: '2px',
                                                    width: '50px'
                                                }}
                                                value={inputValue}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="shop__sidebar__filter mt-2">
                                    <h5 className='fw-bold'>SIZE</h5>
                                    <div className="shop__sidebar__filter__size ms-2">
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
                                <div className="shop__sidebar__filter mt-3">
                                    <h5 className='fw-bold'>TAG</h5>
                                    <div className="shop__sidebar__filter__tag ms-3">
                                        {['sale', 'new arrival', 'eid collects', 'summers'].map((tag) => (
                                            <button
                                                key={tag}
                                                className={`btn ${activeTag === tag ? "active" : ""}`}
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col=sm-12 bg-white">
                            <div className="row">
                                {searchProductLoading ? <BiLoader /> : <Products large={4} medium={6} showLoadMore={true} />}
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </main>
    )
}
