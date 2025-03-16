import React from 'react'
import blogImage from '../../../assets/images/blog-big-01.jpg';
import blogDesc from '../../../assets/images/blog-des-01.jpg';
import Breadcrumb from '../../../components/Breadcrumb';

export default function BlogDetail() {
    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section>
                <div className="container">
                    <div className="blog-bg-image" style={{ backgroundImage: `url(${blogImage})` }}>
                        <div className="blog-bg-text">
                            <p className="m-0"><span className='fs-4 fw-bold'>24</span><br /> Feb 2024</p>
                        </div>
                    </div>

                    <div className="row key-data-blog mt-3">
                        <p>By Admin | 24 Fed, 2024 | StreetStyle, Fashion, Couple | 8 comments </p>
                    </div>

                    <div className="row mt-4">
                        <h1 className='fw-bold'>8 Inspiring Ways to Wear Dresses in the Winter</h1>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <p className='text-secondary text-justify'>Winter fashion doesn’t mean saying goodbye to your favorite dresses! With the right layering and styling,
                                you can stay warm while looking effortlessly chic. Here are eight inspiring ways to wear dresses in the winter,
                                so you can enjoy fashion-forward outfits all season long. Layering a dress with a fitted turtleneck underneath is
                                a stylish way to stay warm without compromising on elegance. This works especially well with sleeveless or strappy dresses,
                                allowing you to make the most of your wardrobe year-round. Opt for neutral or bold colors to create a statement look.
                            </p>

                            <p className='text-secondary'>Pairing dresses with knee-high or over-the-knee boots is both fashionable and practical. Tall boots provide coverage
                                against the cold while adding elegance to your look. They are perfect for styling with midi or mini dresses to create a
                                balanced silhouette. Accessorizing with scarves and hats is another effortless way to enhance your winter dress outfit.
                                A chic scarf or beanie complements your dress while keeping you warm, and experimenting with different textures like wool,
                                cashmere, or faux fur adds a luxurious touch.</p>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                            <img src={blogDesc} alt="Wnter Cloth" className='blog-description-img' />
                        </div>
                    </div>

                    <div className="row">
                        <p className='text-secondary'>Dresses aren’t just for warmer months! By layering strategically and choosing the right accessories, you can stay stylish and warm all winter long.
                            Explore our latest winter dress collection at Cozera and find the perfect pieces to rock this season.
                            Stay fashionable, stay warm!
                        </p>
                    </div>

                    <div className="row mt-5">
                        <h4>Tags</h4>
                        <div className="blog-tag-container">
                            <span className='tag'>StreetStyle</span>
                            <span className='tag'>Fashion</span>

                        </div>
                    </div>

                </div>
            </section>

            <section>
                <div className='container py-5'>
                    <div className="row ">
                        <div className="col-lg-8 col-md-8 col-sm-12 offset-lg-2 offset-md-2">
                            <h2 className='comment-heading fs-4 text-uppercase text-center'>Leave a Comment</h2>
                            <p className='text-secondary text-center'>Your email address will not be published. Required fields are marked *</p>
                            <form action="#" className="contact__form">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Name *" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className='contact-input' placeholder="Email *" />
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" className='contact-input' placeholder="Website" />
                                        <textarea placeholder="Comment *" className='contact-input input-textarea' rows={7} ></textarea>
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        <button type="submit" className="contact-btn">Post Comment</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
