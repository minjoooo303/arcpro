import React from 'react'
import { Circle } from 'lucide-react'

const bearings = [
  { id: 1, name: 'Bearing #1', temp: 65, vibration: 2.3, rul: 3500, status: 'good' },
  { id: 2, name: 'Bearing #2', temp: 68, vibration: 2.5, rul: 3200, status: 'good' },
  { id: 3, name: 'Bearing #3', temp: 72, vibration: 3.1, rul: 2800, status: 'warning' },
  { id: 4, name: 'Bearing #4', temp: 64, vibration: 2.2, rul: 3800, status: 'good' },
]

const BearingWidget = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#00ff00'
      case 'warning': return '#ffa500'
      case 'danger': return '#ff0000'
      default: return '#00f8f8'
    }
  }

  return (
    <div className="widget-container">
        <div className="widget-header">
          <Circle size={20} />
          <h3>베어링 상태 / RUL</h3>
        </div>

        <div className="widget-content">
          <div className="widget-row">
            <div className="widget-card">
              <div className="widget-card-header">평균 온도</div>
              <div className="widget-card-value">
                67.3<span className="widget-card-unit">°C</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">평균 진동</div>
              <div className="widget-card-value">
                2.5<span className="widget-card-unit">mm/s</span>
              </div>
            </div>
            <div className="widget-card">
              <div className="widget-card-header">최소 RUL</div>
              <div className="widget-card-value" style={{ color: '#ffa500' }}>
                2,800<span className="widget-card-unit">h</span>
              </div>
            </div>
          </div>

          {/* 베어링 리스트 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {bearings.map((bearing) => (
              <div 
                key={bearing.id}
                style={{
                  background: 'rgba(0, 248, 248, 0.05)',
                  border: `1px solid ${getStatusColor(bearing.status)}`,
                  borderRadius: '4px',
                  padding: '12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: '10px',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(0, 248, 248, 0.7)' }}>
                    {bearing.name}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(0, 248, 248, 0.6)' }}>온도</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#00f8f8' }}>
                    {bearing.temp}°C
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(0, 248, 248, 0.6)' }}>진동</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#00f8f8' }}>
                    {bearing.vibration} mm/s
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(0, 248, 248, 0.6)' }}>RUL</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: getStatusColor(bearing.status) }}>
                    {bearing.rul}h
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default BearingWidget

