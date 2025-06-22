import React from 'react'
import { Paper, Typography } from '@mui/material'

function PriorityCashier({ data }) {
  const current = data[0]
  return (
    <Paper elevation={2} style={{ padding: 16, backgroundColor: '#fff5f5' }}>
      <Typography variant="h6"><strong>Priority Lane</strong></Typography>
      {current ? (
        <>
          <Typography color="error"><strong>🧾 Now Serving: {current.id}</strong></Typography>
          <Typography>Serving Time: {Math.floor((Date.now() - current.startTime) / 1000)}s</Typography>
          <Typography>Assigned at: {new Date(current.startTime).toLocaleTimeString()}</Typography>
        </>
      ) : (
        <Typography>No customer is being served.</Typography>
      )}
    </Paper>
  )
}

export default PriorityCashier
