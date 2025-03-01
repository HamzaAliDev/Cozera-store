import React from 'react'
import Blogs from '../../../components/Blogs'

export default function Blog() {
    return (
        <main className='container-fluid bg-light p-0'>
            <section className='blog-hero-section'>
                <h1>Our blogs</h1>
            </section>

            <div className='container'>
                <Blogs />

            </div>
        </main>
    )
}
