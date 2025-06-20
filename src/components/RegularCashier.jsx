import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

function RegularCashier({ data, title }) {
  return (
    <div>
      <Typography variant="h6" color="primary" gutterBottom>{title}</Typography>
      <List>
        {data.map((entry, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={entry.id}
              secondary={entry.timestamp ? `Assigned at: ${entry.timestamp}` : ''}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default RegularCashier
