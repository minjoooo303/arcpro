import React, { useState, useEffect } from 'react'
import Frame from '../common/Frame'
import { CloudSnow, Wind, Thermometer, Droplets } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './WeatherEnvironment.css'

const iceData = [
  { time: '00:00', concentration: 30, temp: -12 },
  { time: '04:00', concentration: 32, temp: -13 },
  { time: '08:00', concentration: 35, temp: -11 },
  { time: '12:00', concentration: 38, temp: -10 },
  { time: '16:00', concentration: 35, temp: -12 },
  { time: '20:00', concentration: 33, temp: -14 },
]

const WeatherEnvironment = () => {
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
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getIceAlertLevel = () => {
    if (iceConcentration < 20) return { level: 'Normal', color: '#00ff00' }
    if (iceConcentration < 50) return { level: 'Caution', color: '#ffa500' }
    return { level: 'Danger', color: '#ff0000' }
  }

  const iceAlert = getIceAlertLevel()

  return (
    <div className="weather-environment">
      {/* 실시간 기상 정보 */}
      <Frame className="weather-card">
        <div className="weather-card-content">
          <div className="weather-header">
            <CloudSnow size={20} />
            <h3>환경 / 빙해 상태</h3>
          </div>

          <div className="weather-metrics">
            <div className="weather-metric">
              <div className="metric-icon">
                <Thermometer size={18} />
              </div>
              <div className="metric-info">
                <div className="metric-label">외기온</div>
                <div className="metric-value">{airTemp.toFixed(1)}°C</div>
              </div>
            </div>

            <div className="weather-metric">
              <div className="metric-icon">
                <Droplets size={18} />
              </div>
              <div className="metric-info">
                <div className="metric-label">수온</div>
                <div className="metric-value">{waterTemp.toFixed(1)}°C</div>
              </div>
            </div>

            <div className="weather-metric">
              <div className="metric-icon">
                <Wind size={18} />
              </div>
              <div className="metric-info">
                <div className="metric-label">풍속</div>
                <div className="metric-value">{windSpeed.toFixed(0)} m/s</div>
              </div>
            </div>

            <div className="weather-metric highlight">
              <div className="metric-icon">
                <CloudSnow size={18} />
              </div>
              <div className="metric-info">
                <div className="metric-label">해빙 농도</div>
                <div className="metric-value">{iceConcentration.toFixed(0)}%</div>
              </div>
            </div>
          </div>

          {/* 해빙 상태 바 */}
          <div className="ice-status-bar">
            <div className="ice-bar-track">
              <div 
                className="ice-bar-fill" 
                style={{ 
                  width: `${iceConcentration}%`,
                  background: iceAlert.color
                }}
              />
            </div>
            <div className="ice-status-label" style={{ color: iceAlert.color }}>
              상태: {iceAlert.level}
            </div>
          </div>
        </div>
      </Frame>

      {/* 해빙 추이 차트 */}
      <Frame className="weather-chart">
        <div className="chart-section">
          <h4>해빙 농도 / 온도 추이</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={iceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 248, 248, 0.2)" />
                <XAxis dataKey="time" stroke="#00f8f8" />
                <YAxis stroke="#00f8f8" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 20, 40, 0.9)', 
                    border: '1px solid #00f8f8',
                    color: '#00f8f8' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="concentration" 
                  stroke="#00f8f8" 
                  strokeWidth={2}
                  name="해빙 농도 (%)"
                  dot={{ fill: '#00f8f8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#ff6b6b" 
                  strokeWidth={2}
                  name="기온 (°C)"
                  dot={{ fill: '#ff6b6b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Frame>
    </div>
  )
}

export default WeatherEnvironment

