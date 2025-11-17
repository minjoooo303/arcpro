import React from 'react'
import { Fuel } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fuelData = [
  { time: '00:00', consumption: 2.8, remaining: 68 },
  { time: '02:00', consumption: 2.9, remaining: 67 },
  { time: '04:00', consumption: 2.7, remaining: 66 },
  { time: '06:00', consumption: 3.0, remaining: 65 },
  { time: '08:00', consumption: 2.8, remaining: 64 },
]

const FuelLogWidget = () => {
  return (
    <div className="widget-container">
        <div className="widget-header">
          <Fuel size={20} />
          <h3>연료 로깅</h3>
        </div>

        <div className="widget-content">
          <div className="widget-row">
            <div className="widget-card">
              <div className="widget-card-header">현재 소모율</div>
              <div className="widget-card-value">
                2.8<span className="widget-card-unit">ton/day</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">총 소모량</div>
              <div className="widget-card-value">
                356<span className="widget-card-unit">ton</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">남은 연료</div>
              <div className="widget-card-value">
                65<span className="widget-card-unit">%</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">항속거리</div>
              <div className="widget-card-value">
                3,200<span className="widget-card-unit">NM</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>연료 소모 추이</h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={fuelData}>
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
                  dataKey="consumption" 
                  stroke="#00f8f8" 
                  strokeWidth={2}
                  name="소모율 (ton/day)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  )
}

export default FuelLogWidget

