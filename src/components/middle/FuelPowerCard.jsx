import React, { useState, useEffect } from 'react'
import Frame from '../common/Frame'
import { Fuel, Battery } from 'lucide-react'
import './Card.css'

const FuelPowerCard = () => {
  const [fuelRate, setFuelRate] = useState(2.8)
  const [fuelRemaining, setFuelRemaining] = useState(65)
  const [generatorLoad, setGeneratorLoad] = useState(58)

  useEffect(() => {
    const interval = setInterval(() => {
      setFuelRate(prev => Math.max(1, Math.min(5, prev + Math.random() * 0.2 - 0.1)))
      setGeneratorLoad(prev => Math.max(20, Math.min(100, prev + Math.random() * 4 - 2)))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Frame className="operation-card compact">
      <div className="card-content">
        <div className="card-header">
          <Fuel size={18} />
          <h3>연료 / 전력</h3>
        </div>

        <div className="card-body compact">
          {/* Fuel Consumption */}
          <div className="metric-item compact">
            <div className="metric-header">
              <span className="metric-label">연료 소모율</span>
              <span className="metric-value">{fuelRate.toFixed(1)} ton/day</span>
            </div>
          </div>

          {/* Fuel Remaining */}
          <div className="metric-item compact">
            <div className="metric-header">
              <span className="metric-label">남은 연료</span>
              <span className="metric-value">{fuelRemaining}%</span>
            </div>
            <div className="bar-gauge small">
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${fuelRemaining}%`,
                  background: fuelRemaining < 30 ? '#ff0000' : '#00f8f8'
                }}
              />
            </div>
          </div>

          {/* Generator Load */}
          <div className="metric-item compact">
            <div className="metric-header">
              <Battery size={14} />
              <span className="metric-label">발전기 로드</span>
              <span className="metric-value">{generatorLoad}%</span>
            </div>
            <div className="bar-gauge small">
              <div 
                className="bar-fill" 
                style={{ width: `${generatorLoad}%` }}
              />
            </div>
          </div>

          {/* Range */}
          <div className="info-grid compact">
            <div className="info-item">
              <span className="info-label">Range</span>
              <span className="info-value">3,200 NM</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export default FuelPowerCard

