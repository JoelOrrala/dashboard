import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import CityIndicator from './components/CityIndicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';


import './App.css'

function App() {

     let [cityData, setCityData] = useState([])

     let [rowsTable, setRowsTable] = useState([])

     let [indicators, setIndicators] = useState([])

     let [summaries, setSummaries] = useState([])

    {/* Hook: useEffect */}

     {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */} 


     useEffect(()=>{

        (async ()=>{


            let savedTextXML = localStorage.getItem("openWeatherMap")
            let expiringTime = localStorage.getItem("expiringTime")

            {/* 3. Obtenga la estampa de tiempo actual */}

            let nowTime = (new Date()).getTime();

            {/* 4. Realiza la petición asicrónica cuando: 
                (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
                (2) La estampa de tiempo actual es mayor al tiempo de expiración */}

            if(expiringTime === null || nowTime > parseInt(expiringTime)) {

                {/* 5. Request */}

                let API_KEY = "e79960422708a63a2b445f2e78842ffc"
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
                savedTextXML = await response.text();


                {/* 6. Diferencia de tiempo */}

                let hours = 1
                let delay = hours * 3600000


                {/* 7. En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */}

                localStorage.setItem("openWeatherMap", savedTextXML)
                localStorage.setItem("expiringTime", (nowTime + delay ).toString() )
            }

             const parser = new DOMParser();
             const xml = parser.parseFromString(savedTextXML, "application/xml");


             let dataToCityIndicator = new Array()

             {/* 
                 Análisis, extracción y almacenamiento del contenido del XML 
                 en el arreglo de resultados
             */}


            let location = xml.getElementsByTagName("location")[0];
            let locationNode = location.getElementsByTagName("location")[0];
            let cityName = location.getElementsByTagName("name")[0].textContent;
            dataToCityIndicator.push(cityName);
            let country = location.getElementsByTagName("country")[0].textContent;
            dataToCityIndicator.push(country);
            let timezone = location.getElementsByTagName("timezone")[0].textContent;
            dataToCityIndicator.push(timezone);
            let latitude = locationNode.getAttribute("latitude");
            dataToCityIndicator.push(latitude);
            let longitude = locationNode.getAttribute("longitude");
            dataToCityIndicator.push(longitude);


            setCityData(dataToCityIndicator)

            let dataToIndicators = [];

            let forecastElement = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")[0];
            
            let temperature = forecastElement.getElementsByTagName("temperature")[0].getAttribute("value");
            let temperatureMin = forecastElement.getElementsByTagName("temperature")[0].getAttribute("min");
            let temperatureMax = forecastElement.getElementsByTagName("temperature")[0].getAttribute("max");
            let humidity = forecastElement.getElementsByTagName("humidity")[0].getAttribute("value");
            let probability = forecastElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability");

            dataToIndicators.push(
                {
                    title: 'Temperatura (Kelvin)',
                    min: parseFloat(temperatureMin),
                    avg: parseFloat(temperature),
                    max: parseFloat(temperatureMax)
                },
                {
                    title: 'Humedad',
                    min: parseFloat(humidity),
                    avg: parseFloat(humidity),
                    max: parseFloat(humidity)
                },
                {
                    title: 'Precipitación',
                    probability: parseFloat(probability)
                }
            );

            setIndicators(dataToIndicators);

            let forecastElements = Array.from(xml.getElementsByTagName("forecast")[0].getElementsByTagName("time"));
            let summaryData = [];

            let daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

            // Variables para controlar los días ya agregados
            let currentDay = new Date().getDate();
            let addedDays = [];

            for (let i = 0; i < forecastElements.length; i++) {
                let forecast = forecastElements[i];
                let date = new Date(forecast.getAttribute("from"));
                let day = daysOfWeek[date.getDay()];
                let temperature = forecast.getElementsByTagName("temperature")[0].getAttribute("value");
                let icon = forecast.getElementsByTagName("symbol")[0].getAttribute("var");
                let formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;

                // Añadir solo un pronóstico por día y saltar el día actual
                if (date.getDate() !== currentDay && !addedDays.includes(date.getDate())) {
                    summaryData.push({
                        day: day,
                        temperature: `${(parseFloat(temperature) - 273.15).toFixed(1)}°C`, // Convertir de Kelvin a Celsius
                        date: formattedDate,
                        icon: icon
                    });
                    addedDays.push(date.getDate());
                }

                // Parar cuando tengamos 6 días de pronóstico
                if (summaryData.length >= 6) {
                    break;
                }
            }

            setSummaries(summaryData);


             {/* 
                 2. Procese los resultados de acuerdo con el diseño anterior.
                    Revise la estructura del documento XML para extraer los datos necesarios. 
             */}

             let arrayObjects = Array.from( xml.getElementsByTagName("time") ).map( (timeElement) =>  {
					
                let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

                let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code") 
                   
                return { "rangeHours": rangeHours,"windDirection": windDirection }
               
            })

            arrayObjects = arrayObjects.slice(0,8)
           
            {/* 3. Actualice de la variable de estado mediante la función de actualización */}

            setRowsTable(arrayObjects)


        })()

    },[])

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
                    cityName={cityData[0]}
                    country={cityData[1]}
                    timezone={parseInt(cityData[2])}
                    latitude={parseFloat(cityData[3])}
                    longitude={parseFloat(cityData[4])}
                />
            </Grid>

        {indicators.map((indicator, index) => (
                <Grid key={index} xs={6} md={4} lg={2}>
                    <Indicator {...indicator} />
                </Grid>
        ))}

		<Grid xs={12} md={12} lg={12} id="weather-forecast">
			<h2 style={{ color: 'black', textAlign: 'left' }}> Pronóstico de la semana</h2>
		</Grid>

		{summaries.map((summary, index) => (
                <Grid key={index} xs={6} sm={4} md={3} lg={2}>
                    <Summary
                        day={summary.day}
                        temperature={summary.temperature}
                        date={summary.date}
                        icon={summary.icon}
                    />
                </Grid>
        ))}

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
		<Grid xs={12} lg={8}>

             {/* 4. Envíe la variable de estado (dataTable) como prop (input) del componente (BasicTable) */}

             <BasicTable rows={rowsTable}></BasicTable>

        </Grid>

		    
	    </Grid>
  )
}

export default App
