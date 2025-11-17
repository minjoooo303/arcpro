import React from 'react'
import { Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const speedData = [
  { time: '00:00', speed: 14.2 },
  { time: '01:00', speed: 15.1 },
  { time: '02:00', speed: 15.8 },
  { time: '03:00', speed: 16.2 },
  { time: '04:00', speed: 15.5 },
  { time: '05:00', speed: 15.8 },
]

const OverviewWidget = () => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <Activity size={20} />
        <h3>전체 운항 개요</h3>
      </div>

      <div className="widget-content">
        {/* 상태 요약 카드 */}
        <div className="widget-row">
          <div className="widget-card">
            <div className="widget-card-header">운항 시간</div>
            <div className="widget-card-value">
              127<span className="widget-card-unit">시간</span>
            </div>
          </div>
          <div className="widget-card">
            <div className="widget-card-header">평균 속력</div>
            <div className="widget-card-value">
              15.4<span className="widget-card-unit">kn</span>
            </div>
          </div>
          <div className="widget-card">
            <div className="widget-card-header">누적 거리</div>
            <div className="widget-card-value">
              1,958<span className="widget-card-unit">NM</span>
            </div>
          </div>
          <div className="widget-card">
            <div className="widget-card-header">시스템 상태</div>
            <div className="widget-card-value" style={{ color: '#00ff00' }}>
              정상
            </div>
          </div>
        </div>

        {/* 속력 그래프 */}
        <div className="chart-container">
          <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>속력 추이</h4>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={speedData}>
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
                dataKey="speed" 
                stroke="#00f8f8" 
                strokeWidth={2}
                dot={{ fill: '#00f8f8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default OverviewWidget

