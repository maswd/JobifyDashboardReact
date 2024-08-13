import React from 'react';
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <img src={img} alt='not found' />
                <h3>اوه! صفحه ای پیدا نشد</h3>
                <p>ما نتوانستیم صفحه مورد نظر شمار پیدا کنیم</p>
                <Link to='/'> برگشت به صفحه اصلی</Link>
            </div>
        </Wrapper>
    )
}

export default Error;
