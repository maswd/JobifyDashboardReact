import React from 'react';
import { useState, useEffect } from 'react'
import { Logo } from '../components/Logo'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow } from '../components/FormRow';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../context/appContext'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
}


const Register = () => {

    const { isLoading, showAlert, displayAlert,
        user, setupUser } = useAppContext()
    const [values, setValues] = useState(initialState)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'ورود موفق ! انتقال صفحه...',
            })
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'ثبت نام انجام شد ! انتقال صفحه ...',
            })
        }
        console.log(values)
    }
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? ' ورود به حساب' : 'ثبت نام'}</h3>

                {showAlert && <Alert />}
                {/* name field */}
                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                        labelText="نام و نام خانوادگی"
                    />
                )}                {/* email field */}
                <FormRow type={"email"} name="email" value={values.email} handleChange={handleChange} labelText="ایمیل" />
                <FormRow type={"password"} name="password" value={values.password} handleChange={handleChange} labelText="رمز عبور" />

                <button type='submit' disabled={isLoading} className='btn btn-block'>
                    ثبت
                </button>
                <p>
                    {values.isMember ? 'هنوز عضو نشده اید؟' : 'در حال حاضر عضو هستید؟'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'ثبت نام' : 'ورود'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
