import React from 'react';
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components/Logo'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <img src={main} alt="job hunt" className='img main-img' />
                {/* info  */}
                <div className="info">
                    <h1>
                        اپلیکشین <span>شاغل شو</span>
                    </h1>
                    <p>
                        من بچه راه انداز هستم هودی سطح بعدی تایاکی بروکلین بطری آبی تک منشا قهوه چیا. ونمو زیبایی پس از ایرون، کینوآ لو-فای کیسه آداپتوژن برای حمل روزانه مگینگ + 1 برانچ ناروال.                    </p>
                    <Link to='/register' className='btn btn-hero'>
                        ورود / ثبت نام
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
}

export default Landing;
