import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/JobsContainer'
import Loading from './Loading';
import Job from './Job';
import PageButtonContainer from './PageBtnContainer';

const JobsContainer = () => {
    const {
        getJobs,
        jobs,
        isLoading,
        page,
        numOfPages,
        totalJobs,
        search,
        searchStatus,
        searchType,
        sort,

    } = useAppContext()
    useEffect(() => {
        getJobs()
    }, [search, searchStatus, searchType, sort, page])
    if (isLoading) {
        return <Loading center />
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>هیچ شغلی برای نمایش وجود ندارد...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h5>
                {totalJobs} شغل{jobs.length > 1}   پیدا شد
            </h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageButtonContainer />}

        </Wrapper>
    );
}

export default JobsContainer;
