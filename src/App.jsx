import React, { useState, useEffect, useRef } from 'react'
import Queue from '../src/components/Queue.jsx'
import RegularCashier from './components/RegularCashier.jsx'
import PriorityCashier from './components/PriorityCashier.jsx'
import {
  Container, Typography, Button, Stack, Grid, Paper
} from '@mui/material'

let nextNumber = 1

function App() {
  const [queue, setQueue] = useState([])
  const [priorityCashier, setPriorityCashier] = useState([])
  const [regularCashier1, setRegularCashier1] = useState([])
  const [regularCashier2, setRegularCashier2] = useState([])

  // Track if a cashier is busy
  const [priorityBusy, setPriorityBusy] = useState(false)
  const [reg1Busy, setReg1Busy] = useState(false)
  const [reg2Busy, setReg2Busy] = useState(false)

  // Refs to store timeouts for cleanup
  const priorityTimeout = useRef(null)
  const reg1Timeout = useRef(null)
  const reg2Timeout = useRef(null)

  // Add customer
  const handleAdd = () => {
    const isPriority = Math.random() < 0.4
    const id = `C-${String(nextNumber).padStart(3, '0')}`
    const newEntry = {
      id,
      type: isPriority ? "Priority" : "Regular"
    }
    setQueue(prev => [...prev, newEntry])
    nextNumber++
  }

  // Assign customers to cashiers (manual trigger)
  const handleAssign = () => {
    // Priority cashier
    if (!priorityBusy && queue.some(c => c.type === "Priority")) {
      const idx = queue.findIndex(c => c.type === "Priority")
      if (idx !== -1) {
        const customer = { ...queue[idx], timestamp: new Date().toLocaleTimeString() }
        setPriorityCashier([customer])
        setPriorityBusy(true)
        setQueue(q => q.filter((_, i) => i !== idx))
        priorityTimeout.current = setTimeout(() => {
          setPriorityCashier([])
          setPriorityBusy(false)
        }, 3000)
      }
    }

    // Regular cashier 1
    if (!reg1Busy && queue.some(c => c.type === "Regular")) {
      const idx = queue.findIndex(c => c.type === "Regular")
      if (idx !== -1) {
        const customer = { ...queue[idx], timestamp: new Date().toLocaleTimeString() }
        setRegularCashier1([customer])
        setReg1Busy(true)
        setQueue(q => q.filter((_, i) => i !== idx))
        reg1Timeout.current = setTimeout(() => {
          setRegularCashier1([])
          setReg1Busy(false)
        }, 5000)
      }
    }

    // Regular cashier 2
    if (!reg2Busy && queue.some(c => c.type === "Regular")) {
      const idx = queue.findIndex(c => c.type === "Regular")
      if (idx !== -1) {
        const customer = { ...queue[idx], timestamp: new Date().toLocaleTimeString() }
        setRegularCashier2([customer])
        setReg2Busy(true)
        setQueue(q => q.filter((_, i) => i !== idx))
        reg2Timeout.current = setTimeout(() => {
          setRegularCashier2([])
          setReg2Busy(false)
        }, 5000)
      }
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(priorityTimeout.current)
      clearTimeout(reg1Timeout.current)
      clearTimeout(reg2Timeout.current)
    }
  }, [])

  return (
    <Container maxWidth="sm" sx={{ mt: 5, minHeight: '100vh', backgroundColor: '#fff3e0', pt: 5 }}>
      <Paper elevation={5} sx={{ p: 4, borderRadius: 3, borderTop: '6px solid #e53935', backgroundColor: '#fffdf8' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#d32f2f', fontWeight: 800 }}>
          Cashier Queue System
        </Typography>

        <Stack spacing={2} mb={3}>
          <Button variant="contained" sx={{ backgroundColor: '#e53935', fontWeight: 'bold' }} onClick={handleAdd}>
            Add Customer
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#e53935', fontWeight: 'bold' }} onClick={handleAssign}>
            Assign Customer
          </Button>
        </Stack>

        <Queue queue={queue} title="Waiting Queue" />

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <PriorityCashier data={priorityCashier} />
          </Grid>
          <Grid item xs={6}>
            <RegularCashier data={regularCashier1} title="Regular Cashier 1" />
          </Grid>
          <Grid item xs={6}>
            <RegularCashier data={regularCashier2} title="Regular Cashier 2" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default App