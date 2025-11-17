import React from 'react'
import { Shield } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const stressData = [
  { time: '00:00', stern: 95, midship: 80 },
  { time: '01:00', stern: 98, midship: 82 },
  { time: '02:00', stern: 100, midship: 85 },
  { time: '03:00', stern: 97, midship: 83 },
  { time: '04:00', stern: 102, midship: 86 },
]

const HullStressWidget = () => {
  return (
    <div className="widget-container">
        <div className="widget-header">
          <Shield size={20} />
          <h3>선체 응력 / 피로</h3>
        </div>

        <div className="widget-content">
          <div className="widget-row">
            <div className="widget-card">
              <div className="widget-card-header">선미 응력</div>
              <div className="widget-card-value">
                97<span className="widget-card-unit">MPa</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">중앙부 응력</div>
              <div className="widget-card-value">
                83<span className="widget-card-unit">MPa</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">피로 상태</div>
              <div className="widget-card-value" style={{ color: '#00ff00' }}>
                양호
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>부위별 응력 추이</h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={stressData}>
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
                <Line type="monotone" dataKey="stern" stroke="#00ff00" name="선미" />
                <Line type="monotone" dataKey="midship" stroke="#00f8f8" name="중앙" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  )
}

export default HullStressWidget

