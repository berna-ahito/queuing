// components/Queue.jsx
import React from 'react'

function Queue({ queueList, title }) {
  return (
    <div style={{
      marginBottom: '25px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      border: '2px solid #e0e0e0'
    }}>
      <h2 style={{
        color: '#6d4c41',
        marginBottom: '15px',
        fontSize: '1.4em',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        {title} ({queueList.length})
      </h2>
     
      {queueList.length === 0 ? (
        <p style={{
          textAlign: 'center',
          color: '#9e9e9e',
          fontStyle: 'italic',
          fontSize: '16px'
        }}>
          No customers waiting
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}>
          {queueList.map((customer) => (
            <div
              key={customer.id}
              style={{
                padding: '12px 16px',
                backgroundColor: customer.type === 'Priority' ? '#fff3e0' : '#e8f5e8',
                color: customer.type === 'Priority' ? '#f57c00' : '#2e7d32',
                border: `2px solid ${customer.type === 'Priority' ? '#ffb74d' : '#81c784'}`,
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{customer.id}</span>
              <span style={{
                fontSize: '12px',
                opacity: '0.8',
                marginLeft: '4px'
              }}>
                ({customer.type})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Queue
