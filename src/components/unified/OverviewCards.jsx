import React from 'react'
import NavigationCard from '../middle/NavigationCard'
import EngineCard from '../middle/EngineCard'
import FuelPowerCard from '../middle/FuelPowerCard'
import EnvironmentCard from '../middle/EnvironmentCard'
import './OverviewCards.css'

const OverviewCards = () => {
  return (
    <div className="overview-cards">
      <div className="card-row">
        <NavigationCard />
        <EngineCard />
      </div>
      <div className="card-row">
        <FuelPowerCard />
        <EnvironmentCard />
      </div>
    </div>
  )
}

export default OverviewCards

