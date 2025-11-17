import React from 'react'
import './Frame.css'

const Frame = ({ children, className = '' }) => {
  return (
    <div className={`cyber-frame ${className}`}>
      <div className="cyber-frame-content">
        {children}
      </div>
    </div>
  )
}

export default Frame

