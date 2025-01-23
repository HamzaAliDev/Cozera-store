import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 44) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
                                        <Link to='/auth/login' className='Links'>Sign in</Link>
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
                                    <li className="active"><Link className='link-decor'>Home</Link></li>
                                    <li><Link className='link-decor'>Shop</Link></li>
                                    <li><Link className='link-decor'>Blog</Link></li>
                                    <li><Link className='link-decor'>Contacts</Link></li>
                                    <li><Link className='link-decor'>Pages</Link>
                                        <ul className="dropdown">
                                            <li><Link className='link-decor'>About Us</Link></li>
                                            <li><Link className='link-decor'>Shop Details</Link></li>
                                            <li><Link className='link-decor'>Blog Details</Link></li>
                                            <li><Link className='link-decor'>Check Out</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="header__nav__option">
                                <Link><i className="fas fa-magnifying-glass fa-lg text-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"></i></Link>
                                <Link ><i className="far fa-heart fa-lg"></i></Link>
                                <Link ><i className="fas fa-cart-shopping fa-lg"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header-mobile'>
                <div className="container-xxl">
                    <div className="row px-3 bg-dark-subtle  border-bottom">
                        <div className="col-8 ">
                            <p className='fs-3 mt-3'><span className='fw-bold'>COZERA</span> STORE</p>
                        </div>
                        <div className="col-4">
                            <div className="canvas__open text-end me-3 me-sm-1 mt-4">
                                <i className="fa fa-bars fa-lg" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
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
                            <Link to='/auth/login' className='m-5 text-decoration-none text-dark'>Sign in</Link>
                            <Link to='/' className='m-5 text-decoration-none text-dark'>FAQs</Link>
                        </div>
                        <div className='text-center mt-4'>
                            <Link className='m-4 text-dark'><i className="fas fa-magnifying-glass fa-lg" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"></i></Link>
                            <Link className='m-4 text-dark'><i className="far fa-heart fa-lg"></i></Link>
                            <Link className='m-4 text-dark'><i className="fas fa-cart-shopping fa-lg"></i></Link>
                        </div>
                        <div className='mt-4'>
                            <Link className='text-dark text-decoration-none d-block mb-1'>Home</Link>
                            <Link className='text-dark text-decoration-none d-block mb-1'>shop</Link>
                            <Link className='text-dark text-decoration-none d-block mb-1'>Blog</Link>
                            <Link className='text-dark text-decoration-none d-block mb-1'>Contact</Link>
                            <Link className='text-dark text-decoration-none d-block mb-1 dropdown-toggle' data-bs-toggle="dropdown" >Pages</Link>
                            <ul className="dropdown-menu">
                                <li><Link className='dropdown-item text-dark text-decoration-none d-block mb-1'>About Us</Link></li>
                                <li><Link className='dropdown-item text-dark text-decoration-none d-block mb-1'>Shop Detail</Link></li>
                                <li><Link className='dropdown-item text-dark text-decoration-none d-block mb-1'>Blog Detail</Link></li>
                                <li><Link className='dropdown-item text-dark text-decoration-none d-block mb-1'>Checkout</Link></li>
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
                        <button type="button " className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <form action="">
                        <div className="row p-4">
                            <input type="text" className='input-custom  fw-light fs-2 p-lg-3 p-md-3 p-sm-3' placeholder='Search' />
                        </div>
                    </form>

                </div>
            </div>

        </header>
    )
}
