import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface CityConfig {
    cityName: string;
    country: string;
    timezone: number;
    latitude: number;
    longitude: number;
}

export default function CityIndicator(config: CityConfig) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Información de la Ciudad
            </Typography>
            <Typography variant="body1">
                <strong>Nombre de la Ciudad:</strong> {config.cityName}
            </Typography>
            <Typography variant="body1">
                <strong>País:</strong> {config.country}
            </Typography>
            <Typography variant="body1">
                <strong>Zona Horaria:</strong> {config.timezone}
            </Typography>
            <Typography variant="body1">
                <strong>Latitud:</strong> {config.latitude}
            </Typography>
            <Typography variant="body1">
                <strong>Longitud:</strong> {config.longitude}
            </Typography>
        </Paper>
    )
}
