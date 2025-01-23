import React, { useState } from 'react'
import { Button, Card, Input, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

const initialState = { email: '', password: '' };

export default function Login() {
    const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSendProcessing,setIsSendProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();

    // handle state.
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // handle login.
    const handleLogin = (e) => {
        e.preventDefault();
        let { email, password } = state;
        email = email.trim();

        if (email === '' || password === '') { return window.toastify("All fields are must required", 'error') }
        if (password.length < 6) { return window.toastify("Password must contain 6 chars", 'error') }

        setIsProcessing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                window.toastify("Successfully login", "success")
                setIsProcessing(false);
                dispatch({ type: 'SET_LOGGED_IN', payload: { user } })
                setState(initialState);
                navigate('/')
            })
            .catch((error) => {
                // console.log("error", error)
                switch (error.code) {
                    case 'auth/invalid-credential':
                        window.toastify("Invalid email and password", 'error'); break;
                    default:
                        window.toastify("Something went wrong  while signing", 'error');
                }
                setIsProcessing(false);
                setShowForgotPassword(true);
            }
            );
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handlePasswordReset = () => {
        const { email } = state;
        if (!email) {
            window.toastify("Please enter your email to reset your password", 'error');
            return;
        }

        setIsSendProcessing(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.toastify("Password reset email sent! Please check your inbox.", "success");
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error sending reset email:", error);
                window.toastify("Error sending reset email. Please try again later.", "error");
            }).finally(() => {
                setIsSendProcessing(false);
                setIsModalOpen(false);
            })
    }

    return (
        <main className='auth-main'>
            <Card className='login-register-card' >
                <form action="">
                    <div className="row mb-3">
                        <div className="col">
                            <h1 className='text-center fs-1 fw-semibold auth-heading'>Login</h1>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <Input type='email' size="large" placeholder="email" prefix={<UserOutlined />} name='email' value={state.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col">
                            <Input.Password size="large" placeholder="password" name='password' value={state.password} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row m-0 p-0">
                        <div className="col text-end">
                            {showForgotPassword && (
                                <span className='text-end fw-semibold m-0 p-0' style={{ cursor: 'pointer' }} onClick={showModal}>Forgot Password</span>
                            )}
                        </div>
                    </div>
                    <div className="row mt-3 px-3">
                        <Button className='btn btn-dark fw-semibold login-btn' size="large" loading={isProcessing} onClick={handleLogin}>Login</Button>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <p className=' text-center fs-6 fw-semibold' >Don't have an account? <Link to='/auth/register' className='text-primary text-decoration-none'>Register</Link></p>
                        </div>
                    </div>
                </form>
            </Card>

            <Modal title="Reset Password" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <p>Click on the send button.We will send a password reset email to: {state.email}</p>
                <Button className='btn btn-warning pt-1'  loading={isSendProcessing} onClick={handlePasswordReset}>Send</Button>
                <p>Please check your email for further instructions.</p>
            </Modal>
        </main>
    )
}
