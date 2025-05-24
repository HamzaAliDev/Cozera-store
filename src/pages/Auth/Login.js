import React, { useState } from 'react'
import { Button, Card, Input, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const initialState = { email: '', password: '' };

export default function Login() {
    const { login} = useAuthContext();
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSendProcessing, setIsSendProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0); // Track failed login attempts
    const navigate = useNavigate();


    // handle state.
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // handle login.
    const handleLogin = async (e) => {
        e.preventDefault();
        let { email, password } = state;
        email = email.trim();

        if (email === '' || password === '') { return window.toastify("All fields are must required", 'error') }
        if (password.length < 6) { return window.toastify("Password must contain 6 chars", 'error') }

        const data = {
            email,
            password
        }

        setIsProcessing(true);
        try {
            const res = await login(data)

            if(!res){
                setState(initialState)
                navigate('/')
            }

            if(res === 'Invalid credentials'){
                setFailedAttempts(prev => prev + 1); 
            }
        } finally {
            setIsProcessing(false);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // more working on it
    const handlePasswordReset = () => {
        const { email } = state;
        if (!email) {
            window.toastify("Please enter your email to reset your password", 'error');
            return;
        }
        setIsSendProcessing(true);


    }

    return (
        <main className='auth-main'>
            <Card className='login-register-card' >
                <div className="row mb-3">
                    <div className="col">
                        <h1 className='text-center fs-1 fw-semibold auth-heading'>Login</h1>
                    </div>
                </div>
                <form action="">
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
                            {failedAttempts >= 1 && (
                                <span className='text-end text-primary fw-semibold m-0 p-0' style={{ cursor: 'pointer' }} onClick={showModal}>Forgot Password</span>
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
                <Button className='btn btn-warning pt-1' loading={isSendProcessing} onClick={handlePasswordReset}>Send</Button>
                <p>Please check your email for further instructions.</p>
            </Modal>
        </main>
    )
}
