import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } =
        useAppContext()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !lastName || !location) {
            // test and remove temporary
            displayAlert()
            return
        }

        updateUser({ name, email, lastName, location })
    }
    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>نمایه </h3>
                {showAlert && <Alert />}

                {/* name */}
                <div className='form-center'>
                    <FormRow
                        labelText='نام'
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        labelText='نام خانوادگی'
                        type='text'
                        name='lastName'
                        value={lastName}
                        handleChange={(e) => setLastName(e.target.value)}
                    />
                    <FormRow
                        labelText='ایمیل'
                        type='email'
                        name='email'
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />

                    <FormRow
                        labelText='شهر'
                        type='text'
                        name='location'
                        value={location}
                        handleChange={(e) => setLocation(e.target.value)}
                    />
                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'لطفا صبر کنید ...' : '  بروزرسانی'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile