import React from 'react'
import NavigationCard from './NavigationCard'
import EngineCard from './EngineCard'
import FuelPowerCard from './FuelPowerCard'
import EnvironmentCard from './EnvironmentCard'
import './OperationCluster.css'

const OperationCluster = ({ selectedComponent }) => {
  return (
    <div className="operation-cluster">
      {/* 왼쪽: Navigation 카드 */}
      <div className="cluster-column">
        <NavigationCard />
      </div>

      {/* 중간: Engine/Propulsion 카드 */}
      <div className="cluster-column">
        <EngineCard highlighted={selectedComponent === 'engine'} />
      </div>

      {/* 오른쪽 위: Fuel & Power 카드 */}
      {/* 오른쪽 아래: Environment / Ice 카드 */}
      <div className="cluster-column">
        <FuelPowerCard />
        <EnvironmentCard />
      </div>
    </div>
  )
}

export default OperationCluster

