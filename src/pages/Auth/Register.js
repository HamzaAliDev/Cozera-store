import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';

const initialState = { name: '', email: '', password: '' };
const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Register() {
    const { register } = useAuthStore();
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate();

    // handle state
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // handle register
    const handleRegister = async (e) => {
        e.preventDefault();
        let { name, email, password } = state
        name = name.trim()
        email = email.trim()

        if (name === "" || email === "" || password === '') { return window.toastify("All fields are must required", 'error') }
        if (name.length < 3) { return window.toastify("Enter your Full Name", 'error') }
        if (!email.match(isValidEmail)) { return window.toastify("Enter a valid email address", 'error') }
        if (password.length < 6) { return window.toastify("Password must contain 6 chars", 'error') }


        const data = {
            name,
            email,
            password
        }
        setIsProcessing(true);
        try {
            const res = await register(data)
            if (!res) {
                setState(initialState)
                navigate('/')
            }

        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <main className='auth-main' >
            <Card className='login-register-card' >
                <div className="row mb-3">
                    <div className="col">
                        <h1 className='text-center fs-1 fw-semibold auth-heading'>Register</h1>
                    </div>
                </div>
                <form>
                    <div className="row mb-3">
                        <div className="col">
                            <Input type='text' size="large" placeholder="Full Name" prefix={<UserOutlined />} name='name' value={state.name} onChange={handleChange} />
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
