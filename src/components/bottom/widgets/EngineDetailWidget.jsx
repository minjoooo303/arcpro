import React from 'react'
import { Cog } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const engineData = [
  { name: 'Cylinder 1', temp: 68, pressure: 85 },
  { name: 'Cylinder 2', temp: 72, pressure: 88 },
  { name: 'Cylinder 3', temp: 70, pressure: 86 },
  { name: 'Cylinder 4', temp: 69, pressure: 87 },
]

const EngineDetailWidget = () => {
  return (
    <div className="widget-container">
        <div className="widget-header">
          <Cog size={20} />
          <h3>엔진 상세 / PdM</h3>
        </div>

        <div className="widget-content">
          {/* 엔진 메트릭 */}
          <div className="widget-row">
            <div className="widget-card">
              <div className="widget-card-header">실린더 평균 온도</div>
              <div className="widget-card-value">
                69.8<span className="widget-card-unit">°C</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">평균 압력</div>
              <div className="widget-card-value">
                86.5<span className="widget-card-unit">bar</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">토크</div>
              <div className="widget-card-value">
                850<span className="widget-card-unit">Nm</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">RUL 예측</div>
              <div className="widget-card-value" style={{ color: '#00ff00' }}>
                2,450<span className="widget-card-unit">h</span>
              </div>
            </div>
          </div>

          {/* 실린더별 온도 차트 */}
          <div className="chart-container">
            <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>실린더별 온도</h4>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={engineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 248, 248, 0.2)" />
                <XAxis dataKey="name" stroke="#00f8f8" />
                <YAxis stroke="#00f8f8" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 20, 40, 0.9)', 
                    border: '1px solid #00f8f8',
                    color: '#00f8f8' 
                  }} 
                />
                <Bar dataKey="temp" fill="#00f8f8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* 실린더별 압력 차트 - 새로 추가 */}
          <div className="chart-container" style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>실린더별 압력</h4>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={engineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 248, 248, 0.2)" />
                <XAxis dataKey="name" stroke="#00f8f8" />
                <YAxis stroke="#00f8f8" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 20, 40, 0.9)', 
                    border: '1px solid #00f8f8',
                    color: '#00f8f8' 
                  }} 
                />
                <Bar dataKey="pressure" fill="#00f8f8" name="압력 (bar)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  )
}

export default EngineDetailWidget

