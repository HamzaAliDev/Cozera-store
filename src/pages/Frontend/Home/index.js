import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import heroImg from '../../../assets/images/hero-image.png';
import banner1 from '../../../assets/images/banner-1.jpg';
import banner2 from '../../../assets/images/banner-2.jpg';
import banner3 from '../../../assets/images/banner-3.jpg';
import blog1 from '../../../assets/images/blog-2.jpg';
import blog2 from '../../../assets/images/blog-3.jpg';
import blog3 from '../../../assets/images/blog-6.jpg';
import Products from '../../../components/Products';
import Blogs from '../../../components/Blogs';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isfilled, setIsfilled] = useState(false);

  return (
    <>
      <main className='container-fluid bg-light p-0'>
        {/* hero section */}
        <section className=' hero-section'>
          <div className="row w-100 min-vh-100 hero-content ">
            <div className='col-lg-6 col-md-6 col-sm-12 p-5 d-flex flex-column justify-content-center ps-5 ms-lg-5'>
              <p className='fw-bold' style={{ color: '#f44336' }}>SUMMER COLLECTION</p>
              <h1 className='fw-bold'>Discover the Latest Trends & Exclusive Deals!</h1>
              <p className=' mt-2'>Shop the hottest fashion, top-quality accessories, and must-have essentials—all in one place.</p>
              <div>
                <button className='my-5 btn btn-dark px-5 py-2 rounded-0'>Shop Now</button>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 p-1 hero-section-img'>
              <img src={heroImg} alt="logo" style={{ width: '100%', height: 350 }} />
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 offset-lg-4">
                <div className="banner__item">
                  <div className="banner__item__pic">
                    <img src={banner1} alt="" />
                  </div>
                  <div className="banner__item__text">
                    <h2>Clothing Collections 2025</h2>
                    <a href="#">SHOP NOW</a>
                    <div className='text-bar'></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="banner__item banner__item--middle">
                  <div className="banner__item__pic">
                    <img src={banner2} alt="" />
                  </div>
                  <div className="banner__item__text">
                    <h2>Accessories</h2>
                    <a href="#">SHOP NOW</a>
                    <div className='text-bar'></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 ">
                <div className="banner__item banner__item--last">
                  <div className="banner__item__pic">
                    <img src={banner3} alt="" />
                  </div>
                  <div className="banner__item__text">
                    <h2>Shoes Spring 2025</h2>
                    <a href="#">SHOP NOW</a>
                    <div className='text-bar'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="featured-section mt-5">
          <div className="container">
            <h1 className='fw-bold'>Product Overview</h1>
            <div className='filter-btns mt-3 d-flex flex-wrap justify-content-between align-items-center'>
              <div className='pt-2'>
                <ul className='d-flex list-unstyled justify-content-left align-items-center'>
                  <li className='products-navbar'>All</li>
                  <li className='products-navbar'>Clothing</li>
                  <li className='products-navbar'>Accessories</li>
                  <li className='products-navbar'>Shoes</li>
                </ul>
              </div>
              <div>
                <button className='btn btn-outline-secondary ms-2 rounded-1 d-flex align-items-center'
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <RxCross2 className='me-1' size={18}/> // Show 'x' icon when open
                  ) : (
                    <IoIosSearch className='me-1' size={18} /> // Show search icon when closed
                  )}
                  Search</button>
              </div>
            </div>
            <div class="collapse" id="collapseExample">
              <div class="my-3">
                <input type="text" className='search-input' placeholder='Search' />
              </div>
            </div>
            <Products large={3} medium={4} />
          </div>
        </section>


        {/* blog section */}
        <section className='blog-section my-5'>
          <div className="container">
            <h1>Fashion New Trends</h1>
            <Blogs number={3} />
          </div>
        </section>

      </main>

    </>
  )
}
