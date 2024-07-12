import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Config {
    title: string;
    min?: number;
    max?: number;
    avg?: number;
    value?: number;
    unit?: string;
    probability?: number;
}

export default function Indicator(config: Config) {
    const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2); // Conversión de Kelvin a Celsius

    return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              mb: 2
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {config.title}
            </Typography>
            {config.min !== undefined && config.max !== undefined && (
                <div>
                    <Typography variant="body1"><strong>Min:</strong> {config.title === 'Temperatura' ? convertKelvinToCelsius(config.min) : config.min} {config.unit}</Typography>
                    <Typography variant="body1"><strong>Max:</strong> {config.title === 'Temperatura' ? convertKelvinToCelsius(config.max) : config.max} {config.unit}</Typography>
                    {config.avg !== undefined && <Typography variant="body1"><strong>Prom:</strong> {config.title === 'Temperatura' ? convertKelvinToCelsius(config.avg) : config.avg} {config.unit}</Typography>}
                </div>
            )}
            {config.value !== undefined && (
                <div>
                    <Typography variant="body1"><strong>Valor:</strong> {config.value} {config.unit}</Typography>
                </div>
            )}
            {config.probability !== undefined && (
                <div>
                    <Typography variant="body1"><strong>Probabilidad:</strong> {config.probability}%</Typography>
                </div>
            )}
          </Paper>
    );
}
