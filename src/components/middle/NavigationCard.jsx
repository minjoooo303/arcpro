import React, { useState, useEffect } from 'react'
import Frame from '../common/Frame'
import { Compass } from 'lucide-react'
import './Card.css'

const NavigationCard = () => {
  const [heading, setHeading] = useState(342)
  const [speed, setSpeed] = useState(15.8)
  const [rudderAngle, setRudderAngle] = useState(-2)

  // 실시간 시뮬레이션 (실제로는 WebSocket이나 API에서 받음)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prev => (prev + Math.random() * 2 - 1 + 360) % 360)
      setSpeed(prev => Math.max(0, Math.min(20, prev + Math.random() * 0.4 - 0.2)))
      setRudderAngle(prev => Math.max(-35, Math.min(35, prev + Math.random() * 2 - 1)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Frame className="operation-card">
      <div className="card-content">
        <div className="card-header">
          <Compass size={20} />
          <h3>항법 / 조타</h3>
        </div>

        <div className="card-body">
          {/* Heading Gauge */}
          <div className="gauge-container">
            <div className="gauge-label">선수방위 (Heading)</div>
            <div className="circular-gauge">
              <svg viewBox="0 0 120 120" className="gauge-svg">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(0, 248, 248, 0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#00f8f8"
                  strokeWidth="8"
                  strokeDasharray={`${(heading / 360) * 314} 314`}
                  transform="rotate(-90 60 60)"
                  strokeLinecap="round"
                />
                <text
                  x="60"
                  y="60"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#00f8f8"
                  fontSize="24"
                  fontWeight="bold"
                >
                  {Math.round(heading)}°
                </text>
              </svg>
            </div>
          </div>

          {/* Speed Bar */}
          <div className="metric-item">
            <div className="metric-header">
              <span className="metric-label">속력 (Speed)</span>
              <span className="metric-value">{speed.toFixed(1)} kn</span>
            </div>
            <div className="bar-gauge">
              <div 
                className="bar-fill" 
                style={{ width: `${(speed / 20) * 100}%` }}
              />
            </div>
          </div>

          {/* Rudder Angle */}
          <div className="metric-item">
            <div className="metric-header">
              <span className="metric-label">타 각도 (Rudder)</span>
              <span className="metric-value">{rudderAngle.toFixed(1)}°</span>
            </div>
            <div className="bar-gauge centered">
              <div className="bar-center-mark" />
              <div 
                className="bar-fill rudder" 
                style={{ 
                  width: `${Math.abs(rudderAngle / 35) * 50}%`,
                  left: rudderAngle > 0 ? '50%' : `${50 - Math.abs(rudderAngle / 35) * 50}%`
                }}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Course</span>
              <span className="info-value">345°</span>
            </div>
            <div className="info-item">
              <span className="info-label">Drift</span>
              <span className="info-value">0.2°</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export default NavigationCard

