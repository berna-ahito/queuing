// components/PriorityCashier.jsx
import React from 'react'

function PriorityCashier({ cashierData, currentTime, onRemove }) {
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (customer) => {
    if (!customer.startTime) return 0
    const elapsed = currentTime - customer.startTime
    return Math.min((elapsed / customer.serviceTime) * 100, 100)
  }

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#fff3e0',
      borderRadius: '15px',
      border: '3px solid #ffb74d',
      boxShadow: '0 4px 12px rgba(255, 183, 77, 0.3)'
    }}>
      <h3 style={{
        color: '#f57c00',
        marginBottom: '15px',
        fontSize: '1.5em',
        fontWeight: '700',
        textAlign: 'center'
      }}>
        Priority Lane
      </h3>

      <div style={{ marginBottom: '10px', textAlign: 'center', color: '#e65100', fontSize: '12px' }}>
        Tip: Click on a waiting customer to remove them from the queue
      </div>

      {cashierData.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#ff8f00',
          fontStyle: 'italic',
          fontSize: '16px',
          padding: '20px'
        }}>
          No customers currently being served
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cashierData.map((customer, index) => (
            <div
              key={customer.id}
              onClick={index > 0 ? () => onRemove(customer.id) : undefined}
              style={{
                padding: '15px',
                backgroundColor: index === 0 ? '#ffcc02' : '#fff8e1',
                border: index === 0 ? '3px solid #ff8f00' : '2px solid #ffcc02',
                borderRadius: '10px',
                position: 'relative',
                cursor: index > 0 ? 'pointer' : 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#e65100' }}>
                  {customer.id} {index === 0 && <span style={{ fontWeight: '500', fontSize: '12px' }}>(Serving)</span>}
                </div>
                <div style={{ fontSize: '12px' }}>
                  {index === 0 && customer.startTime ? (
                    <span style={{ color: '#e65100', fontWeight: '600' }}>
                      ⏱️ {formatTime(currentTime - customer.startTime)}
                    </span>
                  ) : (
                    <span style={{ color: '#f44336', opacity: '0.7' }}>✖</span>
                  )}
                </div>
              </div>
              {index === 0 && customer.startTime && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#ffcc02',
                    borderRadius: '3px'
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: '#4caf50',
                      width: `${getProgressPercentage(customer)}%`,
                      transition: 'width 1s ease'
                    }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PriorityCashier
