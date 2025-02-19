import React, { useReducer, useContext, useEffect } from 'react'
import {
    CLEAR_ALERT, DISPLAY_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_BEGIN,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    CREATE_JOB_BEGIN,
    GET_JOBS_SUCCESS,
    GET_JOBS_BEGIN,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_SUCCESS,
    SHOW_STATS_BEGIN,
    CLEAR_FILTERS,
    CHANGE_PAGE,
} from './actions'
import reducer from './reducer'
import axios from 'axios'
import { enTofa } from '../utils/enTofa'
import { faToen } from '../utils/faToen'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    // jobLocation
    jobTypeOptions: ["تمام وقت", "پاره وقت", "از راه دور", "کارآموزی"],
    jobType: 'تمام وقت',
    statusOptions: [" انتظار", "مصاحبه", "رد شده"],
    status: 'انتظار',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['آخرین', 'قدیمی ترین', 'a-z', 'z-a'],
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state);
    const authFetch = axios.create({
        baseURL: '/api/v1'
    })
    //request interceptor
    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )
    const displayAlert = () => {
        dispatch({
            type: DISPLAY_ALERT,
        })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }


    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser)
            const { user, token, location } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText },
            })
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg || error.response.data },
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            // no token
            const { user, location, token } = data

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token },
            })

            addUserToLocalStorage({ user, location, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }

    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value },
        })
    }
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }
    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state
            const statu = faToen(status)
            await authFetch.post('/jobs', {
                company,
                position,
                jobLocation,
                jobType,
                statu
            })
            dispatch({
                type: CREATE_JOB_SUCCESS,
            })
            // call function instead clearValues()
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }
    const getJobs = async () => {
        const { search, searchStatus, searchType, sort, page } = state
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search) {
            url = url + `&search=${search}`
        }
        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { jobs, totalJobs, numOfPages } = data
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages,
                },
            })
        } catch (error) {
            console.log(error.response)
            // logoutUser()
        }
        clearAlert()
    }

    useEffect(() => {
        getJobs()
    }, [])
    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state
            const statu = faToen(status)
            await authFetch.patch(`/jobs/${state.editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                statu,
            })
            dispatch({
                type: EDIT_JOB_SUCCESS,
            })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            await authFetch.delete(`/jobs/${jobId}`)
            getJobs()
        } catch (error) {
            logoutUser()
        }
    }
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch('/jobs/stats')
            console.log('kitrefd', data);
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                },
            })
        } catch (error) {
            console.log(error.response)
            // logoutUser()
        }

        clearAlert()
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }
    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
    }
    return (
        <AppContext.Provider
            value={{
                ...state, displayAlert, setupUser,
                toggleSidebar, logoutUser, updateUser,
                handleChange, clearValues, createJob,
                getJobs, setEditJob,
                editJob, deleteJob,
                showStats, clearFilters, changePage
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider }