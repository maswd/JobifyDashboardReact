
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { CustomTooltip } from './CustomTooltip';


const BarChartComponent = ({ data }) => {

    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 50,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={'count'} fill='#2cb1bc' barSize={26} />
            </BarChart>
        </ResponsiveContainer>
    )
}
export default BarChartComponent;
