import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <section className="breadcrumb-option" style={{ backgroundColor: '#f3f2ee', padding: "40px 0px" }}>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/' >Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Contact</li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* Contact Section Begin */}
            <section>
                <div className='container py-5'>
                    <div className="row">
                        <div className="col-6">
                            <p className='text-primary contact-info'>INFORMATION</p>
                            <h1 className='contact-us'>Contact US</h1>
                            <p className='text-secondary'>As you might expect of a company that began as a high-end interiors contractor, we pay strict attention.</p>

                            <div className="contact__address mt-5">
                                <h4 className='fw-bold'>Main Office</h4>
                                <p className='contact-address'>Address: 60-49 Road 11378 New York</p>
                                <p className='contact-address'>Phone: +65 11.188.888</p>
                                <p className='contact-address'>Email: cozera@gmail.com</p>

                                <h4 className='fw-bold mt-5'>Store Information</h4>
                                <p className='contact-address'>Address: 60-49 Road 11378 New York</p>
                                <p className='contact-address'>Phone: +65 11.188.888</p>
                                <p className='contact-address'>Email: cozerastore@gmail.com </p>
                            </div>
                        </div>

                        <div className="col-6">
                            <form action="#" className="contact__form">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Name" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Email" />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Subject" />
                                        <textarea placeholder="Message" className='contact-input input-textarea' rows={7} ></textarea>
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        <button type="submit" className="contact-btn">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="contact__map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.8726557131105!2d-73.9873763845945!3d40.75049997932864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f4f3d4b3d7%3A0x5e8b1e1d1d7f3b3a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sbd!4v1627877588028!5m2!1sen!2sbd" style={{ width: "100%", height: "450px", border: "0" }} allowFullScreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
