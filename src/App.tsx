import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import CityIndicator from './components/CityIndicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';


import './App.css'

function App() {

  return (
    <Grid container spacing={5}>
		<Grid xs={12} md={12} lg={12}>
		<nav className="nav">
        <h1>Dashboard</h1>
        <ul>
          <li><a href="#general-info">Información General</a></li>
          <li><a href="#weather-forecast">Pronóstico de la semana</a></li>
          <li><a href="#climate-trends">Tendencias Climáticas</a></li>
          <li><a href="#detailed-forecast">Pronósticos Detallados</a></li>
          <li><a href="#weather-summary">Resumen del Clima</a></li>
        </ul>
      </nav>
		</Grid>
		<Grid xs={12} md={12} lg={12} id="general-info">
			<h2 style={{ color: 'black', textAlign: 'left' }}> Información general</h2>
		</Grid>
		<Grid xs={6} md={4} lg={2}>
            <CityIndicator
                cityName='Guayaquil'
                country='Ecuador'
                timezone={-18000}
                latitude={-2.1667}
                longitude={-79.9}
            />
        </Grid>

		<Grid xs={6} md={4} lg={2}>
            <Indicator
                title='Precipitación'
                value={0.1}
                probability={0.38}
            />
        </Grid>

		<Grid xs={6} md={4} lg={2}>
            <Indicator
                title='Temperatura (Kelvin)'
                min={294.81}
                avg={298.9}
                max={305.81}
            />
        </Grid>  

        <Grid xs={6} md={4} lg={2}>
            <Indicator
                title='Humedad'
                min={51}
                avg={76.25}
                max={93}
            />
        </Grid>

		<Grid xs={12} md={12} lg={12} id="weather-forecast">
			<h2 style={{ color: 'black', textAlign: 'left' }}> Pronóstico de la semana</h2>
		</Grid>

		<Grid xs={6} sm={4} md={3} lg={2}>
				<Summary
                day='Lunes'
                temperature='30°C'
                date='17 Junio, 2024'
            	/>
	    </Grid>
		<Grid xs={6} sm={4} md={3} lg={2}>
		<Summary
                day='Martes'
                temperature='30°C'
                date='17 Junio, 2024'
            	/>
	    </Grid>
		<Grid xs={6} sm={4} md={3} lg={2}>
		<Summary
                day='Miércoles'
                temperature='30°C'
                date='17 Junio, 2024'
            	/>
	    </Grid>
		<Grid xs={6} sm={4} md={3} lg={2}>
		<Summary
                day='Jueves'
                temperature='30°C'
                date='17 Junio, 2024'
            	/>
	    </Grid>
		<Grid xs={6} sm={4} md={3} lg={2}>
		<Summary
                day='Viernes'
                temperature='30°C'
                date='17 Junio, 2024'
            	/>
	    </Grid>
		<Grid xs={6} sm={4} md={3} lg={2}>
		<Summary
                day='Sábado'
                temperature='30°C'
                date='17 Junio, 2024'
            	/>
	    </Grid>

		<Grid xs={12} md={12} lg={12} id="climate-trends">
			<h2 style={{ color: 'black', textAlign: 'left' }}> Tendencias climáticas</h2>
		</Grid>
        <Grid xs={12} lg={2}>
			<ControlPanel />
		</Grid>
		<Grid xs={12} lg={10}>
			<WeatherChart></WeatherChart>
		</Grid>
		<Grid xs={12} md={12} lg={12} id="detailed-forecast">
			<h2 style={{ color: 'black', textAlign: 'left' }}> Pronósticos detallados</h2>
		</Grid>
		<Grid xs={12} md={10} lg={12} >
	       <BasicTable />
	    </Grid> 

		    
	    </Grid>
  )
}

export default App
