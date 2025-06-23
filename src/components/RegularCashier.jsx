import React from 'react'

const RegularCashier = ({ cashierData, cashierName, currentTime }) => {
  const currentCustomer = cashierData[0]
  const waitingCustomers = cashierData.slice(1)

  const containerStyle = {
    backgroundColor: '#fdfdfd',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#222', marginBottom: '12px' }}>{cashierName}</h3>

      {currentCustomer ? (
        <div style={{ marginBottom: '10px' }}>
          <p style={{ color: '#e67e22', fontWeight: 'bold', fontSize: '16px' }}>🔔 Now Serving: {currentCustomer.id}</p>
          <p style={{ margin: 0 }}>Serving for: {Math.floor((currentTime - currentCustomer.startTime) / 1000)}s</p>
          <p style={{ margin: 0 }}>Started at: {new Date(currentCustomer.startTime).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#999' }}>No customer being served</p>
      )}

      <hr style={{ margin: '15px 0' }} />
      <h4 style={{ marginBottom: '8px', color: '#555', fontWeight: '500' }}>Waiting in Line:</h4>

      {waitingCustomers.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#aaa' }}>Nobody waiting</p>
      ) : (
        <ul style={{ paddingLeft: '18px' }}>
          {waitingCustomers.map(customer => (
            <li key={customer.id} style={{ marginBottom: '5px', color: '#333', fontSize: '14px' }}>
              <strong>{customer.id}</strong> - Waiting
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RegularCashier
