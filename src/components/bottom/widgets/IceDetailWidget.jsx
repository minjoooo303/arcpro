import React from 'react'
import { CloudSnow } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const iceData = [
  { time: '00:00', concentration: 30, thickness: 0.8 },
  { time: '01:00', concentration: 32, thickness: 0.9 },
  { time: '02:00', concentration: 35, thickness: 1.0 },
  { time: '03:00', concentration: 38, thickness: 1.1 },
  { time: '04:00', concentration: 35, thickness: 0.95 },
]

const IceDetailWidget = () => {
  return (
    <div className="widget-container">
        <div className="widget-header">
          <CloudSnow size={20} />
          <h3>환경 / 빙해 상세</h3>
        </div>

        <div className="widget-content">
          <div className="widget-row">
            <div className="widget-card">
              <div className="widget-card-header">해빙 농도</div>
              <div className="widget-card-value">
                35<span className="widget-card-unit">%</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">빙 두께</div>
              <div className="widget-card-value">
                0.95<span className="widget-card-unit">m</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">외기온</div>
              <div className="widget-card-value">
                -12<span className="widget-card-unit">°C</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">경고 수준</div>
              <div className="widget-card-value" style={{ color: '#ffa500' }}>
                주의
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>해빙 농도 추이</h4>
            <ResponsiveContainer width="100%" height={150}>
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  )
}

export default IceDetailWidget

