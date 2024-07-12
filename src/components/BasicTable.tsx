import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

interface Config {
  rows: Array<object>;
}

export default function BasicTable(data:Config) {
  let [rows, setRows] = useState([]);

  useEffect(() => {
    (() => {
      setRows(data.rows);
    })();
  }, [data]);

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Rango de horas</strong></TableCell>
            <TableCell align="right"><strong>Temperatura</strong></TableCell>
            <TableCell align="right"><strong>Dirección del viento</strong></TableCell>
            <TableCell align="right"><strong>Velocidad del viento</strong></TableCell>
            <TableCell align="right"><strong>Ráfagas de viento</strong></TableCell>
            <TableCell align="right"><strong>Presión</strong></TableCell>
            <TableCell align="right"><strong>Humedad</strong></TableCell>
            <TableCell align="right"><strong>Visibilidad</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.rangeHours}
              </TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.windDirection}</TableCell>
              <TableCell align="right">{row.windSpeed}</TableCell>
              <TableCell align="right">{row.windGust}</TableCell>
              <TableCell align="right">{row.pressure}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.visibility}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
