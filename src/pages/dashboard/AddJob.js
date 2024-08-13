import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { enTofa } from '../../utils/enTofa'
const AddJob = () => {
    const {
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob, isLoading,
        isEditing, editJob
    } = useAppContext()


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }
        if (isEditing) {
            editJob()
            return
        }
        createJob()
    }

    const handleJobInput = (e) => {
        handleChange({ name: e.target.name, value: e.target.value })
    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'ویرایش شغل' : 'اضافه کردن شغل'} </h3>
                {showAlert && <Alert />}

                {/* position */}
                <div className='form-center'>
                    <FormRow
                        labelText='شغل'
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        labelText='شرکت'
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type='text'
                        labelText='موقعیت'
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job status */}

                    <FormRowSelect
                        labelText='وضعیت'
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    {/* job type */}
                    <FormRowSelect
                        labelText='نوع'
                        name='jobType'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />

                    <div className='btn-container'>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            پاک کردن
                        </button>
                        <button
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            ثبت
                        </button>

                    </div>

                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob