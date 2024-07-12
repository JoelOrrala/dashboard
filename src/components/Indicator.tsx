import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Config {
    title: string;
    min?: number;
    max?: number;
    avg?: number;
    value?: number;
    probability?: number;
}

export default function Indicator(config: Config) {
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
                    <Typography variant="body1">Min: {config.min}</Typography>
                    <Typography variant="body1">Max: {config.max}</Typography>
                    {config.avg !== undefined && <Typography variant="body1">Prom: {config.avg}</Typography>}
                </div>
            )}
            {config.value !== undefined && (
                <div>
                    <Typography variant="body1">Valor: {config.value} mm</Typography>
                </div>
            )}
            {config.probability !== undefined && (
                <div>
                    <Typography variant="body1">Probabilidad: {config.probability}</Typography>
                </div>
            )}
          </Paper> 
    );
}
