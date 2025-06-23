// App.jsx
import React, { useState, useEffect, useRef } from 'react'
import Queue from './components/Queue'
import PriorityCashier from './components/PriorityCashier'
import RegularCashier from './components/RegularCashier'

function App() {
  const [waitingQueue, setWaitingQueue] = useState([])
  const [priorityLane, setPriorityLane] = useState([])
  const [regularLane1, setRegularLane1] = useState([])
  const [regularLane2, setRegularLane2] = useState([])
  const [totalCustomersServed, setTotalCustomersServed] = useState(0)
  const [currentTime, setCurrentTime] = useState(Date.now())

  const priorityTimerRef = useRef(null)
  const regular1TimerRef = useRef(null)
  const regular2TimerRef = useRef(null)
  const customerIdCounter = useRef(1)

  const handleRemovePriorityCustomer = (id) => {
    setPriorityLane(prev => prev.filter(customer => customer.id !== id))
  }

  const handleRemoveRegular1Customer = (id) => {
    setRegularLane1(prev => prev.filter(customer => customer.id !== id))
  }

  const handleRemoveRegular2Customer = (id) => {
    setRegularLane2(prev => prev.filter(customer => customer.id !== id))
  }

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const getRandomServiceTime = () => Math.floor(Math.random() * 20000) + 20000

  const addCustomer = () => {
    const id = `C-${String(customerIdCounter.current++).padStart(3, '0')}`
    const type = Math.random() < 0.4 ? "Priority" : "Regular"
    const newCustomer = { id, type, serviceTime: getRandomServiceTime(), createdAt: Date.now() }
    setWaitingQueue(prev => [...prev, newCustomer])
  }

  const assignSingleCustomer = () => {
    if (waitingQueue.length === 0) {
      alert("No customers to assign!")
      return
    }
    const customer = waitingQueue[0]
    setWaitingQueue(prev => prev.slice(1))

    if (customer.type === "Priority" && priorityLane.length < 5) {
      if (priorityLane.length === 0) {
        setPriorityLane([customer])
        startServingCustomerInPriority(customer)
      } else {
        setPriorityLane(prev => [...prev, customer])
      }
    } else {
      if (regularLane1.length <= regularLane2.length) {
        if (regularLane1.length === 0) {
          setRegularLane1([customer])
          startServingCustomerInRegular1(customer)
        } else {
          setRegularLane1(prev => [...prev, customer])
        }
      } else {
        if (regularLane2.length === 0) {
          setRegularLane2([customer])
          startServingCustomerInRegular2(customer)
        } else {
          setRegularLane2(prev => [...prev, customer])
        }
      }
    }
  }

  const assignCustomersToLanes = () => {
    if (waitingQueue.length === 0) {
      alert("No customers to assign!")
      return
    }

    const priority = []
    const reg1 = []
    const reg2 = []

    const priorityCustomers = waitingQueue.filter(c => c.type === 'Priority')
    const regularCustomers = waitingQueue.filter(c => c.type === 'Regular')

    priorityCustomers.slice(0, 5).forEach(c => { priority.push(c) })

    regularCustomers.concat(priorityCustomers.slice(5)).forEach(c => {
      if (reg1.length <= reg2.length) reg1.push(c)
      else reg2.push(c)
    })

    setWaitingQueue([])
    setPriorityLane(priority)
    setRegularLane1(reg1)
    setRegularLane2(reg2)

    if (priority.length > 0) startServingCustomerInPriority(priority[0])
    if (reg1.length > 0) startServingCustomerInRegular1(reg1[0])
    if (reg2.length > 0) startServingCustomerInRegular2(reg2[0])
  }

  const startServingCustomerInPriority = (customer) => {
    if (priorityTimerRef.current) clearTimeout(priorityTimerRef.current)
    const newCustomer = { ...customer, startTime: Date.now(), serviceTime: getRandomServiceTime() }

    setPriorityLane(prev => {
      const updated = [...prev]
      updated[0] = newCustomer
      return updated
    })

    priorityTimerRef.current = setTimeout(() => {
      setTotalCustomersServed(c => c + 1)
      setPriorityLane(prev => {
        const remaining = prev.slice(1)
        if (remaining.length > 0) {
          startServingCustomerInPriority(remaining[0])
          return remaining
        } else {
          tryMoveToPriorityFromRegulars()
          return []
        }
      })
      balanceRegularLanes()
    }, newCustomer.serviceTime)
  }

  const tryMoveToPriorityFromRegulars = () => {
    let moved = false

    setRegularLane1(reg1 => {
      if (!moved && reg1.length > 1) {
        const customer = reg1[1]
        const updated = [...reg1]
        updated.splice(1, 1)
        setPriorityLane([customer])
        startServingCustomerInPriority(customer)
        moved = true
        return updated
      }
      return reg1
    })

    setRegularLane2(reg2 => {
      if (!moved && reg2.length > 1) {
        const customer = reg2[1]
        const updated = [...reg2]
        updated.splice(1, 1)
        setPriorityLane([customer])
        startServingCustomerInPriority(customer)
        moved = true
        return updated
      }
      return reg2
    })
  }

  const startServingCustomerInRegular1 = (customer) => {
    if (regular1TimerRef.current) clearTimeout(regular1TimerRef.current)
    const newCustomer = { ...customer, startTime: Date.now(), serviceTime: getRandomServiceTime() }

    setRegularLane1(prev => {
      const updated = [...prev]
      updated[0] = newCustomer
      return updated
    })

    regular1TimerRef.current = setTimeout(() => {
      setTotalCustomersServed(c => c + 1)
      setRegularLane1(prev => {
        const remaining = prev.slice(1)
        if (remaining.length > 0) {
          startServingCustomerInRegular1(remaining[0])
          return remaining
        }
        return []
      })
      balanceRegularLanes()
    }, newCustomer.serviceTime)
  }

  const startServingCustomerInRegular2 = (customer) => {
    if (regular2TimerRef.current) clearTimeout(regular2TimerRef.current)
    const newCustomer = { ...customer, startTime: Date.now(), serviceTime: getRandomServiceTime() }

    setRegularLane2(prev => {
      const updated = [...prev]
      updated[0] = newCustomer
      return updated
    })

    regular2TimerRef.current = setTimeout(() => {
      setTotalCustomersServed(c => c + 1)
      setRegularLane2(prev => {
        const remaining = prev.slice(1)
        if (remaining.length > 0) {
          startServingCustomerInRegular2(remaining[0])
          return remaining
        }
        return []
      })
      balanceRegularLanes()
    }, newCustomer.serviceTime)
  }

  const balanceRegularLanes = () => {
    setRegularLane1(reg1 => {
      setRegularLane2(reg2 => {
        const reg1Wait = reg1.slice(1)
        const reg2Wait = reg2.slice(1)
        const diff = reg1Wait.length - reg2Wait.length

        if (Math.abs(diff) >= 2) {
          if (diff > 0 && reg1.length > 1) {
            const moved = reg1[1]
            const updatedReg1 = [...reg1]
            updatedReg1.splice(1, 1)
            setRegularLane1(updatedReg1)
            setRegularLane2([...reg2, moved])
          } else if (diff < 0 && reg2.length > 1) {
            const moved = reg2[1]
            const updatedReg2 = [...reg2]
            updatedReg2.splice(1, 1)
            setRegularLane2(updatedReg2)
            setRegularLane1([...reg1, moved])
          }
        }

        return reg2
      })
      return reg1
    })
  }

  const resetEverything = () => {
    if (priorityTimerRef.current) clearTimeout(priorityTimerRef.current)
    if (regular1TimerRef.current) clearTimeout(regular1TimerRef.current)
    if (regular2TimerRef.current) clearTimeout(regular2TimerRef.current)
    setWaitingQueue([])
    setPriorityLane([])
    setRegularLane1([])
    setRegularLane2([])
    setTotalCustomersServed(0)
    customerIdCounter.current = 1
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff8e1', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
        <h1 style={{ textAlign: 'center', color: '#d84315', marginBottom: '20px', fontSize: '2.5em', fontWeight: '700' }}>
          Cashier Queueing System
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '25px', flexWrap: 'wrap' }}>
          <button onClick={addCustomer} style={buttonStyle('#fbc02d')}>Add Customer</button>
          <button onClick={assignSingleCustomer} style={buttonStyle('#fbc02d')}>Assign Customer</button>
          <button onClick={assignCustomersToLanes} style={buttonStyle('#8d6e63')}>Assign All Customers</button>
          <button onClick={resetEverything} style={buttonStyle('#d84315')}>Reset System</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <Stat label="Total Customers Served" value={totalCustomersServed} color="#8d6e63" />
          <Stat label="Waiting Queue" value={waitingQueue.length} color="#6d4c41" />
        </div>

        <Queue queueList={waitingQueue} title="Waiting Queue" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <PriorityCashier 
            cashierData={priorityLane} 
            currentTime={currentTime} 
            onRemove={handleRemovePriorityCustomer}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <RegularCashier 
              cashierData={regularLane1} 
              cashierName="Regular Cashier 1" 
              currentTime={currentTime}
              onRemove={handleRemoveRegular1Customer}
            />
            <RegularCashier 
              cashierData={regularLane2} 
              cashierName="Regular Cashier 2" 
              currentTime={currentTime}
              onRemove={handleRemoveRegular2Customer}
            />
          </div>
        </div>
      </div>
    </div>
  )

  function buttonStyle(color) {
    return {
      backgroundColor: color,
      color: 'white',
      border: 'none',
      padding: '10px 22px',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
  }

  function Stat({ label, value, color }) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0', color, fontWeight: '600', fontSize: '1em' }}>{label}</h3>
        <p style={{ fontSize: '22px', fontWeight: '700', margin: '4px 0', color }}>{value}</p>
      </div>
    )
  }
}

export default App
