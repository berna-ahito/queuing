import React from 'react'
import { Paper, Typography } from '@mui/material'

function RegularCashier({ data, title }) {
  const [current, ...queue] = data

  return (
    <Paper elevation={2} style={{ padding: 16 }}>
      <Typography variant="h6"><strong>{title}</strong></Typography>
      {current ? (
        <>
          <Typography color="warning.main"><strong>🔔 Now Serving: {current.id}</strong></Typography>
          <Typography>Serving Time: {Math.floor((Date.now() - current.startTime) / 1000)}s</Typography>
          <Typography>Assigned at: {new Date(current.startTime).toLocaleTimeString()}</Typography>
        </>
      ) : (
        <Typography>No customer is being served.</Typography>
      )}
      <hr />
      {queue.map(cust => (
        <div key={cust.id}>
          <Typography style={{ fontWeight: 'bold' }}>{cust.id}</Typography>
          <Typography color="textSecondary">Waiting in line</Typography>
        </div>
      ))}
    </Paper>
  )
}

export default RegularCashier
