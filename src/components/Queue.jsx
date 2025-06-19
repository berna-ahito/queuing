import React from 'react'
import {
  Typography, List, ListItem, ListItemText, Divider
} from '@mui/material'

function Queue({ queue, title, showKiosk }) {
  return (
    <div style={{ marginTop: 24 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {queue.length === 0 ? (
        <Typography>No one in this list</Typography>
      ) : (
        <List>
          {queue.map((entry, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`${entry.priority} - ${entry.name}`}
                  secondary={`Dish: ${entry.dish}` + (showKiosk ? ` | Served at Kiosk ${entry.kiosk}` : '')}
                />
              </ListItem>
              {index < queue.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      )}
    </div>
  )
}

export default Queue
