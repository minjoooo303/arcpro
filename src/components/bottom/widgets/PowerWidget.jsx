import React from 'react'
import { Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const generatorData = [
  { name: 'Gen 1', load: 58, power: 850 },
  { name: 'Gen 2', load: 62, power: 920 },
  { name: 'Gen 3', load: 45, power: 680 },
]

const PowerWidget = () => {
  return (
    <div className="widget-container">
        <div className="widget-header">
          <Zap size={20} />
          <h3>전기 / 발전기</h3>
        </div>

        <div className="widget-content">
          <div className="widget-row">
            <div className="widget-card">
              <div className="widget-card-header">총 발전량</div>
              <div className="widget-card-value">
                2,450<span className="widget-card-unit">kW</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">총 소비량</div>
              <div className="widget-card-value">
                1,980<span className="widget-card-unit">kW</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">평균 부하</div>
              <div className="widget-card-value">
                55<span className="widget-card-unit">%</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">전압</div>
              <div className="widget-card-value">
                440<span className="widget-card-unit">V</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h4 style={{ marginBottom: '10px', color: '#00f8f8' }}>발전기별 부하</h4>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={generatorData}>
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
                <Bar dataKey="load" fill="#00f8f8" name="부하 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  )
}

export default PowerWidget

