import React, { useState } from 'react';
import { Button, Card, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../config/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const initialState = { fullName: '', email: '', password: '' };
const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Register() {

    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate();

    // handle state
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // handle register
    const handleRegister = (e) => {
        e.preventDefault();
        let { fullName, email, password } = state
        fullName = fullName.trim()
        email = email.trim()

        if (fullName === "" || email === "" || password === '') { return window.toastify("All fields are must required", 'error') }
        if (fullName.length < 3) { return window.toastify("Enter your Full Name", 'error') }
        if (!email.match(isValidEmail)) { return window.toastify("Enter a valid email address", 'error') }
        if (password.length < 6) { return window.toastify("Password must contain 6 chars", 'error') }

        setIsProcessing(true);
        // authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                window.toastify("Successfully registered a new user", "success")
                addData(user)
                setState(initialState);
                setIsProcessing(false);
                navigate('/');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        window.toastify("Email address already is used", 'error'); break;
                    default:
                        window.toastify("Something went wrong  while creating new user", 'error');
                }
                setIsProcessing(false);
            });

        // add document in firestore
        const addData = async (user) => {
            try {
                await setDoc(doc(firestore, "users", user.uid), {
                    fullName,
                    email,
                    id: user.uid,
                    createdAt: serverTimestamp(),
                    roles: ["user"],
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }


    return (
        <main className='auth-main' >
            <Card className='login-register-card' >
                <form action="">
                    <div className="row mb-3">
                        <div className="col">
                            <h1 className='text-center fs-1 fw-semibold auth-heading'>Register</h1>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <Input type='text' size="large" placeholder="Full Name" prefix={<UserOutlined />} name='fullName' value={state.fullName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <Input type='email' size="large" placeholder="email" prefix={<UserOutlined />} name='email' value={state.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <Input.Password size="large" placeholder="password" name='password' value={state.password} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row px-3">
                        <Button className='btn btn-dark fw-semibold register-btn' size='large' loading={isProcessing} onClick={handleRegister}>Register</Button>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p className=' text-center fs-6 fw-semibold'>Already have an account? <Link to='/auth/login' className='text-primary text-decoration-none'>Login</Link></p>
                        </div>
                    </div>
                </form>
            </Card>
        </main>
    )
}
