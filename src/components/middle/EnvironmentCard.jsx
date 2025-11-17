import React, { useState, useEffect } from 'react'
import Frame from '../common/Frame'
import { CloudSnow, Wind, Thermometer } from 'lucide-react'
import './Card.css'

const EnvironmentCard = () => {
  const [airTemp, setAirTemp] = useState(-12)
  const [waterTemp, setWaterTemp] = useState(-1.5)
  const [windSpeed, setWindSpeed] = useState(18)
  const [iceConcentration, setIceConcentration] = useState(35)

  useEffect(() => {
    const interval = setInterval(() => {
      setAirTemp(prev => prev + Math.random() * 2 - 1)
      setWaterTemp(prev => prev + Math.random() * 0.4 - 0.2)
      setWindSpeed(prev => Math.max(0, prev + Math.random() * 4 - 2))
      setIceConcentration(prev => Math.max(0, Math.min(100, prev + Math.random() * 2 - 1)))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const getIceAlertLevel = () => {
    if (iceConcentration < 20) return { level: 'Normal', color: '#00ff00' }
    if (iceConcentration < 50) return { level: 'Caution', color: '#ffa500' }
    return { level: 'Danger', color: '#ff0000' }
  }

  const iceAlert = getIceAlertLevel()

  return (
    <Frame className="operation-card compact">
      <div className="card-content">
        <div className="card-header">
          <CloudSnow size={18} />
          <h3>환경 / 빙해</h3>
        </div>

        <div className="card-body compact">
          {/* Temperature Grid */}
          <div className="info-grid compact">
            <div className="info-item">
              <Thermometer size={12} />
              <span className="info-label">외기</span>
              <span className="info-value">{airTemp.toFixed(1)}°C</span>
            </div>
            <div className="info-item">
              <Thermometer size={12} />
              <span className="info-label">수온</span>
              <span className="info-value">{waterTemp.toFixed(1)}°C</span>
            </div>
          </div>

          {/* Wind */}
          <div className="metric-item compact">
            <div className="metric-header">
              <Wind size={14} />
              <span className="metric-label">풍속</span>
              <span className="metric-value">{windSpeed.toFixed(0)} m/s</span>
            </div>
            <div className="bar-gauge small">
              <div 
                className="bar-fill" 
                style={{ width: `${(windSpeed / 30) * 100}%` }}
              />
            </div>
          </div>

          {/* Ice Concentration */}
          <div className="metric-item compact">
            <div className="metric-header">
              <CloudSnow size={14} />
              <span className="metric-label">해빙 농도</span>
              <span className="metric-value">{iceConcentration.toFixed(0)}%</span>
            </div>
            <div className="bar-gauge small">
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${iceConcentration}%`,
                  background: iceAlert.color
                }}
              />
            </div>
          </div>

          {/* Ice Alert Status */}
          <div className="alert-status" style={{ borderColor: iceAlert.color }}>
            <span style={{ color: iceAlert.color }}>{iceAlert.level}</span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export default EnvironmentCard

