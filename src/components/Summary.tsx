import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import sunrise from '../assets/sunrise.jpeg'
interface SummaryProps {
    day: string;
    temperature: string;
    date: string;
}

export default function Summary(props: SummaryProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={sunrise}
                    alt="imagen"
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
