import React, { useState } from 'react'

import BarChart from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

export default function ChartsContainer() {
    const [barChart, setBarChart] = useState(true)
    const { monthlyApplications: data } = useAppContext()

    return (
        <Wrapper>
            <h4>برنامه های کاربردی ماهانه</h4>

            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'نمودار منطقه' : 'نمودار میله ای'}
            </button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    )
}