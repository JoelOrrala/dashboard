import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

interface SummaryProps {
    day: string;
    temperature: string;
    date: string;
    icon: string; 
}

export default function Summary(props: SummaryProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} // URL del icono del clima
                    alt="weather icon"
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {props.day}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {props.temperature}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {props.date}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
