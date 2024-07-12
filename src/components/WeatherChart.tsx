import { Chart } from 'react-google-charts';
import Paper from '@mui/material/Paper';

export default function WeatherChart({ data }) {
    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Chart
                chartType="LineChart"
                data={data}
                width="100%"
                height="400px"
                options={{
                    title: 'Precipitación, Humedad y Nubosidad vs Hora',
                    curveType: 'function',
                    legend: { position: 'right' },
                    hAxis: { title: 'Hora' },
                    vAxis: { title: 'Unidades' }
                }}
            />
        </Paper>
    );
}
