// components/RegularCashier.jsx
import React from 'react'

function RegularCashier({ cashierData, cashierName, currentTime, onRemove }) {
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
      backgroundColor: '#e8f5e8',
      borderRadius: '15px',
      border: '3px solid #81c784',
      boxShadow: '0 4px 12px rgba(129, 199, 132, 0.3)'
    }}>
      <h3 style={{
        color: '#2e7d32',
        marginBottom: '15px',
        fontSize: '1.3em',
        fontWeight: '700',
        textAlign: 'center'
      }}>
        {cashierName} ({cashierData.length})
      </h3>

      <div style={{ marginBottom: '10px', textAlign: 'center', color: '#1b5e20', fontSize: '12px' }}>
        Tip: Click on a waiting customer to remove them
      </div>

      {cashierData.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#4caf50',
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
                backgroundColor: index === 0 ? '#c8e6c9' : '#f1f8e9',
                border: index === 0 ? '3px solid #4caf50' : '2px solid #a5d6a7',
                borderRadius: '10px',
                cursor: index > 0 ? 'pointer' : 'default'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#1b5e20' }}>
                  {customer.id} {index === 0 && <span style={{ fontWeight: '500', fontSize: '12px' }}>(Serving)</span>}
                </div>
                <div style={{ fontSize: '12px' }}>
                  {index === 0 && customer.startTime ? (
                    <span style={{ color: '#1b5e20', fontWeight: '600' }}>
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
                    backgroundColor: '#a5d6a7',
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

export default RegularCashier
