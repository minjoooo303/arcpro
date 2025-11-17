import React, { useState, useEffect } from 'react'
import Frame from '../common/Frame'
import { Cog } from 'lucide-react'
import './Card.css'

const EngineCard = ({ highlighted }) => {
  const [rpm, setRpm] = useState(85)
  const [load, setLoad] = useState(72)
  const [temperature, setTemperature] = useState(68)

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(prev => Math.max(0, Math.min(100, prev + Math.random() * 4 - 2)))
      setLoad(prev => Math.max(0, Math.min(100, prev + Math.random() * 3 - 1.5)))
      setTemperature(prev => Math.max(50, Math.min(90, prev + Math.random() * 2 - 1)))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Frame className={`operation-card ${highlighted ? 'highlighted' : ''}`}>
      <div className="card-content">
        <div className="card-header">
          <Cog size={20} />
          <h3>엔진 / 추진</h3>
        </div>

        <div className="card-body">
          {/* RPM Gauge */}
          <div className="gauge-container">
            <div className="gauge-label">메인 엔진 RPM</div>
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
                  stroke="#00ff00"
                  strokeWidth="8"
                  strokeDasharray={`${(rpm / 100) * 314} 314`}
                  transform="rotate(-90 60 60)"
                  strokeLinecap="round"
                />
                <text
                  x="60"
                  y="55"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#00ff00"
                  fontSize="22"
                  fontWeight="bold"
                >
                  {Math.round(rpm)}
                </text>
                <text
                  x="60"
                  y="75"
                  textAnchor="middle"
                  fill="#00ff00"
                  fontSize="12"
                >
                  RPM
                </text>
              </svg>
            </div>
          </div>

          {/* Load Bar */}
          <div className="metric-item">
            <div className="metric-header">
              <span className="metric-label">엔진 부하</span>
              <span className="metric-value">{load.toFixed(1)}%</span>
            </div>
            <div className="bar-gauge">
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${load}%`,
                  background: load > 85 ? '#ff0000' : load > 70 ? '#ffa500' : '#00ff00'
                }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="metric-item">
            <div className="metric-header">
              <span className="metric-label">온도</span>
              <span className="metric-value">{temperature.toFixed(0)}°C</span>
            </div>
            <div className="bar-gauge">
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${(temperature / 100) * 100}%`,
                  background: temperature > 80 ? '#ff0000' : '#00f8f8'
                }}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Torque</span>
              <span className="info-value">850 Nm</span>
            </div>
            <div className="info-item">
              <span className="info-label">Pressure</span>
              <span className="info-value">4.2 bar</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export default EngineCard

