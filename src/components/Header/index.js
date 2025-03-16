import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { BsList } from "react-icons/bs";
import { logout } from '../../store/slices/authSlice';

export default function Header() {
    const location = useLocation(); // Get current route
    const user = useSelector(store => store.authSlice.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className={`header`}>
            <div className='header-web'>
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7">
                                <div className="header__top__left">
                                    <p>Free shipping, 30-day return or refund guarantee.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="header__top__right">
                                    <div className="header__top__links">
                                        {user ?
                                            <span className='Links' role="button" tabIndex="0" onClick={handleLogout}>Sign out</span>
                                            :
                                            <Link to='/auth/login' className='Links'>Sign in</Link>
                                        }
                                        <Link to='/' className='Links'>FAQs</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="header__logo">
                                <Link to="/" className='brand-name'><p className='fs-3 mb-0'><span className='fw-bold'>COZERA</span> STORE</p></Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className={location.pathname === '/' ? 'active' : ''}><Link to='/' className='link-decor'>Home</Link></li>
                                    <li className={location.pathname === '/shop' ? 'active' : ''}><Link to='shop' className='link-decor'>Shop</Link></li>
                                    <li className={location.pathname === '/blog' ? 'active' : ''}><Link to='blog' className='link-decor'>Blog</Link></li>
                                    <li className={location.pathname === '/contact' ? 'active' : ''}><Link to='contact' className='link-decor'>Contacts</Link></li>
                                    <li className={location.pathname === '/about' ? 'active' : ''}><Link className='link-decor'>Pages</Link>
                                        <ul className="dropdown">
                                            <li><Link to='about' className='link-decor'>About Us</Link></li>
                                            <li><Link to="shop-detail" className='link-decor'>Shop Details</Link></li>
                                            <li><Link to='blog-detail' className='link-decor'>Blog Details</Link></li>
                                            <li><Link to='checkout' className='link-decor'>Check Out</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="header__nav__option">
                                <Link><IoIosSearch size={24} data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" /></Link>
                                <Link to='wishlist'><GoHeart size={22} /></Link>
                                <Link to='shopping-cart' ><RiShoppingBag4Fill size={22} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header-mobile'>
                <div className="container-xxl">
                    <div className="row px-3 bg-dark-subtle border-bottom ">
                        <div className="col-8 ">
                            <p className='fs-3 mt-3'><span className='fw-bold'>COZERA</span> STORE</p>
                        </div>
                        <div className="col-4">
                            <div className="canvas__open text-end me-3 me-sm-1 mt-4">
                                <BsList size={26} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{ marginTop: '-5px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* canvas */}
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Cozera Store</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className='text-center'>
                            {user ? <span className='m-5 text-decoration-none text-dark' role='button' tabIndex='0' onClick={handleLogout}>Logout</span>
                                :
                                <Link to='/auth/login' className='m-5 text-decoration-none text-dark'>Sign in</Link>
                            }
                            <Link to='/' className='m-5 text-decoration-none text-dark'>FAQs</Link>
                        </div>
                        <div className='text-center mt-4'>
                            <Link className='m-4 text-dark'><IoIosSearch size={22} data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" /></Link>
                            <Link to='wishlist' className='m-4 text-dark'><GoHeart size={22} /></Link>
                            <Link to='shopping-cart' className='m-4 text-dark'><RiShoppingBag4Fill size={22} /></Link>
                        </div>
                        <div className='mt-4'>
                            <Link to='/' className='text-dark text-decoration-none d-block mb-1'>Home</Link>
                            <Link to='shop' className='text-dark text-decoration-none d-block mb-1'>shop</Link>
                            <Link to='blog' className='text-dark text-decoration-none d-block mb-1'>Blog</Link>
                            <Link to='contact' className='text-dark text-decoration-none d-block mb-1'>Contact</Link>
                            <Link className='text-dark text-decoration-none d-block mb-1 dropdown-toggle' data-bs-toggle="dropdown" >Pages</Link>
                            <ul className="dropdown-menu">
                                <li><Link to='about' className='dropdown-item text-dark text-decoration-none d-block mb-1'>About Us</Link></li>
                                <li><Link to='shop-detail' className='dropdown-item text-dark text-decoration-none d-block mb-1'>Shop Detail</Link></li>
                                <li><Link to='blog-detail' className='dropdown-item text-dark text-decoration-none d-block mb-1'>Blog Detail</Link></li>
                                <li><Link to='checkout' className='dropdown-item text-dark text-decoration-none d-block mb-1'>Checkout</Link></li>
                            </ul>
                        </div>
                        <div className='mt-4'>
                            <p>Free shipping, 30-day return or refund guarantee.</p>
                        </div>

                    </div>
                </div>
            </div>
            {/* search canvas */}
            <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-body">
                    <div className="row mt-5 d-flex justify-content-end me-5">
                        <button type="button " className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <form action="">
                        <div className="row p-4">
                            <input type="text" className='input-custom fw-light fs-2 p-lg-3 p-md-3 p-sm-3' placeholder='Search' />
                        </div>
                    </form>
                </div>
            </div>
        </header>
    )
}
