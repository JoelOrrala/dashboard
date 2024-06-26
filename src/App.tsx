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

     {/* 
         1. Agregue la variable de estado (dataTable) y función de actualización (setDataTable).
     */}

     let [rowsTable, setRowsTable] = useState([])


     {/* Variable de estado y función de actualización */}

     let [indicators, setIndicators] = useState([])

    {/* Hook: useEffect */}

     {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */} 


     useEffect(()=>{

        (async ()=>{

            {/* Request */}

            // let API_KEY = "e79960422708a63a2b445f2e78842ffc"
            // let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
            // let savedTextXML = await response.text();

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


             {/* XML Parser */}

             const parser = new DOMParser();
             const xml = parser.parseFromString(savedTextXML, "application/xml");

             {/* Arreglo para agregar los resultados */}

             let dataToIndicators = new Array()

             {/* 
                 Análisis, extracción y almacenamiento del contenido del XML 
                 en el arreglo de resultados
             */}

             let location = xml.getElementsByTagName("location")[1]

             let geobaseid = location.getAttribute("geobaseid")
             dataToIndicators.push(["Location","geobaseid", geobaseid])

             let latitude = location.getAttribute("latitude")
             dataToIndicators.push(["Location","Latitude", latitude])

             let longitude = location.getAttribute("longitude")
             dataToIndicators.push(["Location","Longitude", longitude])

             //console.log( dataToIndicators )

             {/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */}

             let indicatorsElements = Array.from(dataToIndicators).map(
                (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
            )
               
            {/* Modificación de la variable de estado mediante la función de actualización */}

            setIndicators(indicatorsElements)

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
                cityName='Guayaquil'
                country='Ecuador'
                timezone={-18000}
                latitude={-2.1667}
                longitude={-79.9}
            />
        </Grid>

        <Grid xs={6} lg={2}>

                 {indicators[0]}

                 {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				
             </Grid>
				
             <Grid xs={6} lg={2}>

                 {indicators[1]}
					
                 {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				
             </Grid>
				
             <Grid xs={6} lg={2}>

                 {indicators[2]}
					
                 {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
				
             </Grid>
        
    {/*
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

        */}

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
		<Grid xs={12} lg={8}>

             {/* 4. Envíe la variable de estado (dataTable) como prop (input) del componente (BasicTable) */}

             <BasicTable rows={rowsTable}></BasicTable>

        </Grid>

		    
	    </Grid>
  )
}

export default App
