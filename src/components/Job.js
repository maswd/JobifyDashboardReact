import React from 'react';
import moment from "moment-jalaali";
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import JobInfo from './JobInfo'
import { enTofa } from '../utils/enTofa';
import { faToen } from '../utils/faToen';

const Job = ({ _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status }) => {
    const { setEditJob, deleteJob } = useAppContext()
    let date = moment(createdAt)
    date = date.format('jYYYY/jM/jD')
    return (
        <Wrapper>
            <header>
                <div className='main-icon'><span className='main-text'>{company.charAt(0)}</span></div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${enTofa(status)}`}>{faToen(status)}</div>
                </div>
                {/* content center later */}
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-job'
                            onClick={() => setEditJob(_id)}
                            className='btn edit-btn'
                        >
                            ویرایش
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={() => deleteJob(_id)}
                        >
                            حذف
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
}

export default Job;
