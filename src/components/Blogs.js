import React from 'react';
import blog1 from '../assets/images/blog-1.jpg';
import blog2 from '../assets/images/blog-2.jpg';
import blog3 from '../assets/images/blog-3.jpg';
import blog4 from '../assets/images/blog-4.jpg';
import blog5 from '../assets/images/blog-5.jpg';
import blog6 from '../assets/images/blog-6.jpg';
import blog7 from '../assets/images/blog-7.jpg';
import blog8 from '../assets/images/blog-8.jpg';
import blog9 from '../assets/images/blog-9.jpg';

const blogData = [
    {
        id: 1,
        image: blog1,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 2,
        image: blog2,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 3,
        image: blog3,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 4,
        image: blog4,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 5,
        image: blog5,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 6,
        image: blog6,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 7,
        image: blog7,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 8,
        image: blog8,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    },
    {
        id: 9,
        image: blog9,
        date: '5 February 2024',
        title: 'Eternity Bands Do Last Forever',
        link: '#'
    }
];

export default function Blogs({number}) {
    let dispalyBlogs = [];
    if (number === undefined) {
        dispalyBlogs = blogData;
    }else{
        dispalyBlogs = blogData.slice(0, number);
    }


    return (
        <section>
            <div className="row mt-5 d-flex justify-content-center align-items-center">
                {dispalyBlogs.map(blog => (
                    <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12 mb-5">
                        <div className="blog-item d-flex flex-column align-items-center">
                            <div className="blog-img-container">
                                <img src={blog.image} alt="" className='blog-img' />
                            </div>
                            <div className="blog-content">
                                <i className="fa-regular fa-calendar-days text-secondary"></i>
                                <span className='text-secondary ms-3'>{blog.date}</span>
                                <h5 className='mt-4'>{blog.title}</h5>
                                <a href={blog.link} className="blog-btn">Read More</a>
                                <div className='blog-btn-line'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
