import React, { useState } from 'react'
import Queue from '../src/components/Queue.jsx';
import {
  Container, Typography, TextField, Button,
  MenuItem, Select, FormControl, InputLabel,
  Stack, Grid, Paper
} from '@mui/material'

let nextNumber = 1

function App() {
  const [queue, setQueue] = useState([])
  const [name, setName] = useState('')
  const [dish, setDish] = useState('Adobo')
  const [served, setServed] = useState([])

  const handleAdd = () => {
    if (name.trim() !== '') {
      const priority = `P-${String(nextNumber).padStart(3, '0')}`
      const newEntry = { priority, name, dish }
      setQueue([...queue, newEntry])
      setName('')
      nextNumber++
    }
  }

  const handleServe = (kiosk) => {
    if (queue.length > 0) {
      const current = queue[0]
      const updatedQueue = queue.slice(1)
      setQueue(updatedQueue)
      setServed([...served, { ...current, kiosk }])
    }
  }

  return (
    <Container
  maxWidth="sm"
  sx={{
    mt: 5,
    minHeight: '100vh',
    backgroundColor: '#fff3e0', // warm yellow-orange background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pt: 5,
  }}
>
  <Paper
    elevation={5}
    sx={{
      p: 4,
      borderRadius: 3,
      width: '100%',
      borderTop: '6px solid #e53935', // fiesta red strip
      backgroundColor: '#fffdf8',
    }}
  >
        <Typography
  variant="h4"
  gutterBottom
  sx={{
    color: '#d32f2f',
    fontWeight: 800,
    letterSpacing: 1,
    textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
  }}
>
 Filipino Food Queue
</Typography>


        <Stack spacing={2} mb={3}>
          <TextField
            label="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
  <InputLabel>Dish</InputLabel>
  <Select value={dish} label="Dish" onChange={(e) => setDish(e.target.value)}>
    {[
      "Adobo",
      "Sinigang",
      "Lechon",
      "Kare-Kare",
      "Pancit",
      "Tinola",
      "Lumpiang Shanghai",
      "Inihaw na Baboy",
      "Inasal",
      "Bulalo",
      "Dinuguan",
      "Tapsilog",
      "Tortang Talong",
      "Ginataang Gulay",
      "Lomi",
      "Bangus",
      "Halo-Halo"
    ].map((item, i) => (
      <MenuItem key={i} value={item}>{item}</MenuItem>
    ))}
  </Select>
</FormControl>

          <Button
  variant="contained"
  color="primary"
  sx={{
    backgroundColor: '#e53935',
    '&:hover': { backgroundColor: '#c62828' },
    fontWeight: 'bold',
  }}
  onClick={handleAdd}
>
  GET PRIORITY NUMBER
</Button>

        </Stack>
        
        

        <Queue queue={queue} title="Waiting Queue" />

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h6" color="primary">Kiosk A</Typography>
            <Button
  variant="contained"
  onClick={() => handleServe('A')}
  sx={{
    backgroundColor: '#ff6f00',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#e65100' },
    boxShadow: 3
  }}
>
  SERVE NEXT
</Button>


          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="primary">Kiosk B</Typography>
            <Button
  variant="contained"
  onClick={() => handleServe('B')}
  sx={{
    backgroundColor: '#ffa000',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#2e7d32' },
    boxShadow: 3
  }}
>
  SERVE NEXT
</Button>
          </Grid>
        </Grid>

        <Queue queue={served} title="Served Queue" showKiosk />
      </Paper>
    </Container>
  )
}

export default App


