import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import paymentImg from '../../assets/images/payment.png';
import { useAuthContext } from '../../contexts/AuthContext';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

export default function Footer() {
    const {isAuthenticated, user} = useAuthContext();
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const year =  new Date().getFullYear();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
     
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!isAuthenticated) { window.toastify("Please Login", "info"); return navigate('/auth/login') }

        
        if(!email){return window.toastify("Enter email",'error')}
        let trimmedEmail = email.trim();

        if(!window.isEmail(trimmedEmail)){return  window.toastify("Invalid Email",'error')}
        
        try {
            // Create a new document reference with an auto-generated ID
            const newDocRef = doc(collection(firestore, "Emails"));

            // Get the generated document ID
            const documentId = newDocRef.id;

            // Set the document data with the document ID included
            await setDoc(newDocRef, {
                email: trimmedEmail,
                userId: user.id,
                createdAt: serverTimestamp(),
                emailId: documentId,  // Include the ID in the document data
            });

            window.toastify("Email Added Successfully", "success");
            setEmail(' ');

        } catch (error) {
            console.error("Error adding email: ", error);
            window.toastify("Something went wrong while adding Email", "error");
        }
    }
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__logo">
                                <p className='text-white fs-3'><span className='fw-bold'>COZERA</span> STORE</p>
                            </div>
                            <p>The customer is at the heart of our unique business model, which includes design.</p>
                            <Link to='/' ><img src={paymentImg} alt="" /></Link>
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>Shopping</h6>
                            <ul>
                                <li><Link to='/' className='text-decoration-none'>Clothing Store</Link></li>
                                <li><Link to='/' className='text-decoration-none'>Trending Shoes</Link></li>
                                <li><Link to='/' className='text-decoration-none'>Accessories</Link></li>
                                <li><Link to='/' className='text-decoration-none'>Sale</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>Shopping</h6>
                            <ul>
                                <li><Link to='/' className='text-decoration-none'>Contact Us</Link></li>
                                <li><Link to='/' className='text-decoration-none'>Payment Methods</Link></li>
                                <li><Link to='/' className='text-decoration-none'>Delivary</Link></li>
                                <li><Link to='/' className='text-decoration-none'>Return & Exchanges</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                        <div className="footer__widget">
                            <h6>NewLetter</h6>
                            <div className="footer__newslatter">
                                <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                                <form action="#">
                                    <input type="text" placeholder="Your email" name='email' value={email} onChange={handleEmailChange} />
                                        <button type="submit" onClick={handleSubmit}><MdOutlineEmail size={22} /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="footer__copyright__text">
                            <p>Copyright ©{year} All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
