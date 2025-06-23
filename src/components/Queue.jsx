// Queue.jsx
import React from 'react'

const Queue = ({ queueList, title }) => {
  const containerStyle = {
    backgroundColor: '#fff8dc',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    border: '1px solid #f0e6c0'
  }

  const listStyle = {
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #eee',
    padding: '10px'
  }

  const itemStyle = {
    padding: '8px 10px',
    borderBottom: '1px solid #f3f3f3',
    fontSize: '14px'
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#aa8500' }}>{title}</h3>

      {queueList.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#777' }}>Nobody here yet...</p>
      ) : (
        <div style={listStyle}>
          {queueList.map((customer) => (
            <div key={customer.id} style={itemStyle}>
              <strong>{customer.id}</strong> - {customer.type}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Queue
