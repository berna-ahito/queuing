import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

function PriorityCashier({ data }) {
  return (
    <div>
      <Typography variant="h6" color="secondary" gutterBottom>Priority Cashier</Typography>
      <List>
        {data.map((entry, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={
                <span style={{ color: 'red', fontWeight: 600 }}>
                  {entry.id}
                </span>
              }
              secondary={entry.timestamp ? `Assigned at: ${entry.timestamp}` : ''}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default PriorityCashier