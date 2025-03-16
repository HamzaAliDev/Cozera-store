import React from 'react';
import { Carousel } from 'antd';
import about01 from "../../../assets/images/about-01.jpg";
import about02 from "../../../assets/images/about-02.jpg";
import Breadcrumb from '../../../components/Breadcrumb';


const contentStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#525252',
};
export default function About() {
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section>
                <div className='container py-5'>
                    <div className="row hero-about"></div>

                    <div className="row my-5 ">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3 className='fw-bold'>Our Story</h3>
                            <p className='about-story'>At <b>Cozera Store</b>, fashion isn’t just about clothing—it’s a statement of confidence, creativity, and individuality.
                                Our journey began with a simple yet powerful idea: to bring high-quality, stylish, and affordable fashion to everyone
                                who believes in expressing themselves through what they wear.
                                It all started when our founder, passionate about fashion and driven by the dream of creating a brand that blends elegance,
                                comfort, and affordability, noticed a gap in the market. Too often, trendy fashion came with a hefty price tag, while affordable
                                options compromised on quality. We knew there had to be a better way—<b>so Cozera Store was born.</b>
                            </p>

                            <p className='about-story'>More than just a brand, Cozera Store is a community of fashion enthusiasts who celebrate individuality. We are dedicated to providing
                                exceptional customer service, ensuring every shopper feels valued and satisfied. As we continue to grow, our mission remains clear:
                                to make fashion exciting, empowering, and accessible. Join us on this journey and redefine your style—because you deserve to look and feel your best every day.</p>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12 mt-4 d-flex justify-content-center align-items-center">
                            <div className="img-border-container">
                                <img src={about01} alt="about us" className='story-img' />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 mt-4 d-flex justify-content-center align-items-center order-md-2 order-sm-2 order-lg-1">
                            <div className="img-border-container">
                                <img src={about02} alt="our mission" className='story-img' />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12 order-md-1 order-sm-1 order-lg-2">
                            <h3 className='fw-bold'>Our Mission</h3>
                            <p className='about-story'>At Cozera Store, our mission is to redefine fashion by making it stylish, affordable, and accessible to everyone.
                                We believe that fashion is not just about wearing clothes—it’s about expressing individuality, confidence, and personality.
                                Our goal is to provide high-quality clothing, shoes, and accessories that empower people to embrace their unique style without
                                compromising on comfort or budget. We are committed to staying ahead of trends, curating collections that blend elegance with
                                everyday wear, and ensuring that every piece reflects our dedication to quality and craftsmanship. At Cozera Store, we strive to
                                create a seamless shopping experience, offering exceptional customer service and a brand that truly values its customers.
                                Our mission is simple: to make fashion effortless, empowering, and enjoyable for all.
                            </p>
                            <blockquote className="blockquote mt-4 fs-6 border-start border-3 border-secondary">
                                <p className='ms-2 about-story'>Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because
                                    they didn't really do it, they just saw something. It seemed obvious to them after a while.</p>
                                <footer className="blockquote-footer ms-2 ">Steve Job’s</footer>
                            </blockquote>

                        </div>
                    </div>
                </div>
            </section>

            <section className=' py-5'>
                <div className="container ">
                    <div className="row">
                        <h1 className='fw-bold text-center'>Our Clients Says</h1>
                    </div>
                    <div className="row mt-5 d-flex justify-content-center align-items-center">
                        <div className='col-lg-8 col-md-12 col-sm-12'>
                            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
                                <div>
                                    <div className="card bg-secondary text-white tesimonial-card" >
                                        <div className="card-body">
                                            <p className="card-text fs-6">"Cozera Store has completely transformed my wardrobe! The clothes are stylish,
                                                comfortable, and surprisingly affordable. I love how each piece feels premium without the hefty price tag. Highly recommended!"</p>
                                            <div className="row my-3">
                                                <div className="col-5 p-0 ms-3 testimonial-img-container ">
                                                    <img src={about02} alt="customer" className='customer-img' />
                                                </div>
                                                <div className="col-7">
                                                    <p className="card-text mt-4 fw-bold fs-4">- Jane Doe</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="card bg-secondary text-white tesimonial-card" >
                                        <div className="card-body">
                                            <p className="card-text fs-6">Shopping at Cozera Store has been a fantastic experience.
                                                The website is easy to navigate, the delivery is quick, and the customer service is outstanding. I always find exactly what I’m looking for!</p>
                                            <div className="row my-3">
                                                <div className="col-5 p-0 ms-3 testimonial-img-container ">
                                                    <img src={about02} alt="customer" className='customer-img' />
                                                </div>
                                                <div className="col-7">
                                                    <p className="card-text mt-4 fw-bold fs-4">- James L.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="card bg-secondary text-white tesimonial-card" >
                                        <div className="card-body">
                                            <p className="card-text fs-6">"Finally, a store that offers both quality and affordability!
                                                I bought a handbag and some accessories, and I couldn’t be happier with my purchase. The attention to detail is incredible!"</p>
                                            <div className="row my-3">
                                                <div className="col-5 p-0 ms-3 testimonial-img-container ">
                                                    <img src={about02} alt="customer" className='customer-img' />
                                                </div>
                                                <div className="col-7">
                                                    <p className="card-text mt-4 fw-bold fs-4">- Olivia P.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="card bg-secondary text-white tesimonial-card" >
                                        <div className="card-body">
                                            <p className="card-text fs-6">"Cozera Store has completely transformed my wardrobe! The clothes are stylish,
                                                comfortable, and surprisingly affordable. I love how each piece feels premium without the hefty price tag. Highly recommended!"</p>
                                            <div className="row my-3">
                                                <div className="col-5 p-0 ms-3 testimonial-img-container ">
                                                    <img src={about02} alt="customer" className='customer-img' />
                                                </div>
                                                <div className="col-7">
                                                    <p className="card-text mt-4 fw-bold fs-4">- Jane Doe</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
