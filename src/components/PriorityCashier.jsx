import React from 'react'

const PriorityCashier = ({ cashierData, currentTime }) => {
  const currentCustomer = cashierData[0]
  const waitingCustomers = cashierData.slice(1)

  const containerStyle = {
    backgroundColor: '#fff5f5',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #ffcccc',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#d32f2f', marginBottom: '15px' }}>🏆 Priority Lane</h3>

      {currentCustomer ? (
        <div style={{ marginBottom: '10px' }}>
          <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>🧾 Now Serving: {currentCustomer.id}</p>
          <p>Serving for: {Math.floor((currentTime - currentCustomer.startTime) / 1000)}s</p>
          <p>Started at: {new Date(currentCustomer.startTime).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#888' }}>No customer being served</p>
      )}

      <hr style={{ margin: '15px 0' }} />
      <h4 style={{ marginBottom: '10px', color: '#b71c1c' }}>Waiting in Priority Line:</h4>

      {waitingCustomers.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#888' }}>Nobody waiting</p>
      ) : (
        <ul style={{ paddingLeft: '15px' }}>
          {waitingCustomers.map(customer => (
            <li key={customer.id} style={{ marginBottom: '6px', color: '#444' }}>
              <strong>{customer.id}</strong> - Waiting
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PriorityCashier
