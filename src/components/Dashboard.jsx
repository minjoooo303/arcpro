import React, { useState } from 'react'
import RouteMap from './sections/RouteMap'
import OperationOverview from './sections/OperationOverview'
import ShipControl from './sections/ShipControl'
import './Dashboard.css'

const Dashboard = () => {
  const [selectedShipComponent, setSelectedShipComponent] = useState(null)
  const [selectedMode, setSelectedMode] = useState(1)

  return (
    <div className="dashboard-container">
      {/* 왼쪽 위: 경로/지도 (크게) */}
      <div className="dashboard-route">
        <RouteMap />
      </div>

      {/* 오른쪽 위: 전체 운항 개요 (얇게) */}
      <div className="dashboard-overview">
        <OperationOverview />
      </div>

      {/* 하단: 선박 구조도 + 버튼 + 상세 내용 */}
      <div className="dashboard-bottom">
        <ShipControl 
          selectedShipComponent={selectedShipComponent}
          onComponentSelect={setSelectedShipComponent}
          selectedMode={selectedMode}
          onModeSelect={setSelectedMode}
        />
      </div>
    </div>
  )
}

export default Dashboard

