import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
const SearchContainer = () => {
    const {
        isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
    } = useAppContext()
    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()
    }
    const handleSearch = (e) => {
        if (isLoading) return
        handleChange({ name: e.target.name, value: e.target.value })
    }

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                {/* search position */}
                <div className='form-center'>
                    <FormRow
                        labelText='جستجو'
                        type='text'
                        name='search'
                        value={search}
                        handleChange={handleSearch}
                    ></FormRow>
                    {/* search by status */}
                    <FormRowSelect
                        labelText='وضعیت شغلی'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['همه', ...statusOptions]}
                    ></FormRowSelect>
                    {/* search by type */}

                    <FormRowSelect
                        labelText='نوع شغل'
                        name='searchType'
                        value={searchType}
                        handleChange={handleSearch}
                        list={['همه', ...jobTypeOptions]}
                    ></FormRowSelect>
                    {/* sort */}

                    <FormRowSelect
                        labelText='مرتب سازی'
                        name='sort'
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        پاک کردن فیلترها
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer