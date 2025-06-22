// src/App.jsx
import React, { useState, useEffect, useRef } from 'react'
import Queue from './components/Queue'
import RegularCashier from './components/RegularCashier'
import PriorityCashier from './components/PriorityCashier'
import {
  Container, Typography, Button, Stack, Grid, Paper, Box
} from '@mui/material'

let nextNumber = 1

function App() {
  const [queue, setQueue] = useState([])
  const [priorityCashier, setPriorityCashier] = useState([])
  const [regularCashier1, setRegularCashier1] = useState([])
  const [regularCashier2, setRegularCashier2] = useState([])
  const [tick, setTick] = useState(0)
  const [servedCount, setServedCount] = useState(0)

  const priorityTimeout = useRef(null)
  const reg1Timeout = useRef(null)
  const reg2Timeout = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const getRandomTime = () => Math.floor(Math.random() * 21 + 20) * 1000

  const handleAdd = () => {
    const id = `C-${String(nextNumber++).padStart(3, '0')}`
    const newEntry = {
      id,
      type: Math.random() < 0.4 ? "Priority" : "Regular",
      servingTime: getRandomTime(),
    }
    setQueue(prev => [...prev, newEntry])
  }

  const handleAssign = () => {
    let available = [...queue]

    const assignToCashier = (cashier, setCashier, startFunc) => {
      if (cashier.length === 0 && available.length) {
        const customer = { ...available.shift(), startTime: Date.now(), servingTime: getRandomTime() }
        setCashier([customer])
        startFunc(customer)
      }
    }

    assignToCashier(priorityCashier, setPriorityCashier, startPriority)
    assignToCashier(regularCashier1, setRegularCashier1, startRegular1)
    assignToCashier(regularCashier2, setRegularCashier2, startRegular2)

    const reg1Extra = [], reg2Extra = []
    available.forEach((cust, idx) => (idx % 2 === 0 ? reg1Extra : reg2Extra).push(cust))
    if (reg1Extra.length) setRegularCashier1(prev => [...prev, ...reg1Extra])
    if (reg2Extra.length) setRegularCashier2(prev => [...prev, ...reg2Extra])
    setQueue([])
  }

  const startRegular1 = (current) => {
    reg1Timeout.current = setTimeout(() => {
      setServedCount(c => c + 1)
      setRegularCashier1(prev => {
        const updated = prev.slice(1)
        if (!updated.length) return []
        const next = { ...updated[0], startTime: Date.now(), servingTime: getRandomTime() }
        startRegular1(next)
        return [next, ...updated.slice(1)]
      })
    }, current.servingTime)
  }

  const startRegular2 = (current) => {
    reg2Timeout.current = setTimeout(() => {
      setServedCount(c => c + 1)
      setRegularCashier2(prev => {
        const updated = prev.slice(1)
        if (!updated.length) return []
        const next = { ...updated[0], startTime: Date.now(), servingTime: getRandomTime() }
        startRegular2(next)
        return [next, ...updated.slice(1)]
      })
    }, current.servingTime)
  }

  const startPriority = (current) => {
    setPriorityCashier([current])
    priorityTimeout.current = setTimeout(() => {
      setServedCount(c => c + 1)
      let nextCandidate = null

      setRegularCashier1(prev => {
        const waiting = prev.slice(1)
        if (!nextCandidate && waiting.length) {
          nextCandidate = { ...waiting[0], startTime: Date.now(), servingTime: getRandomTime() }
          return [prev[0], ...waiting.slice(1)]
        }
        return prev
      })

      setRegularCashier2(prev => {
        const waiting = prev.slice(1)
        if (!nextCandidate && waiting.length) {
          nextCandidate = { ...waiting[0], startTime: Date.now(), servingTime: getRandomTime() }
          return [prev[0], ...waiting.slice(1)]
        }
        return prev
      })

      nextCandidate ? startPriority(nextCandidate) : setPriorityCashier([])
    }, current.servingTime)
  }

  const handleReset = () => {
    [priorityTimeout, reg1Timeout, reg2Timeout].forEach(ref => clearTimeout(ref.current))
    setQueue([])
    setPriorityCashier([])
    setRegularCashier1([])
    setRegularCashier2([])
    setServedCount(0)
    nextNumber = 1
  }

  return (
    <Container maxWidth="md" style={{ marginTop: 40, minHeight: '100vh', backgroundColor: '#fffbe6', paddingTop: 40 }}>
      <Paper elevation={5} style={{ padding: 32, borderRadius: 16, backgroundColor: '#fff' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#c62828', fontWeight: 900, textAlign: 'center' }}>
          Cashier Queue System
        </Typography>
        <Stack spacing={2} direction="row" justifyContent="center" style={{ marginBottom: 24 }}>
          <Button variant="contained" style={{ backgroundColor: '#d32f2f', fontWeight: 'bold' }} onClick={handleAdd}>Add Customer</Button>
          <Button variant="contained" style={{ backgroundColor: '#9e9e9e', color: '#fff', fontWeight: 'bold' }} onClick={handleAssign}>Assign Customers</Button>
          <Button variant="outlined" color="error" onClick={handleReset}>Reset System</Button>
        </Stack>

        <Box textAlign="center" marginBottom={2}>
          <Typography><strong>Total Served:</strong> {servedCount}</Typography>
          <Typography><strong>Remaining in Queue:</strong> {queue.length}</Typography>
        </Box>

        <Queue queue={queue} title="Waiting Queue" />
        <Grid container spacing={2} style={{ marginTop: 24 }}>
          <Grid item xs={12}><PriorityCashier data={priorityCashier} tick={tick} /></Grid>
          <Grid item xs={12} md={6}><RegularCashier data={regularCashier1} title="Regular Cashier 1" tick={tick} /></Grid>
          <Grid item xs={12} md={6}><RegularCashier data={regularCashier2} title="Regular Cashier 2" tick={tick} /></Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default App
