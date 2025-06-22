import React from 'react'
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material'

const Queue = ({ queue, title }) => {
  return (
    <Paper elevation={2} style={{ padding: '16px', backgroundColor: '#fffde7' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>

      {queue.length === 0 ? (
        <Typography variant="body2" color="textSecondary">No one in this list</Typography>
      ) : (
        <Box style={{ maxHeight: '240px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px' }}>
          <List dense>
            {queue.map((customer, index) => (
              <React.Fragment key={customer.id}>
                <ListItem>
                  <ListItemText primary={customer.id} />
                </ListItem>
                {index < queue.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  )
}

export default Queue
