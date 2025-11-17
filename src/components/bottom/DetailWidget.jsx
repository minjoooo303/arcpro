import React from 'react'
import Frame from '../common/Frame'
import OverviewWidget from './widgets/OverviewWidget'
import EngineDetailWidget from './widgets/EngineDetailWidget'
import HullStressWidget from './widgets/HullStressWidget'
import BearingWidget from './widgets/BearingWidget'
import PowerWidget from './widgets/PowerWidget'
import FuelLogWidget from './widgets/FuelLogWidget'
import './DetailWidget.css'

const DetailWidget = ({ mode, shipComponent }) => {
  const renderWidget = () => {
    switch (mode) {
      case 1:
        return <OverviewWidget />
      case 2:
        return <EngineDetailWidget />
      case 3:
        return <HullStressWidget />
      case 4:
        return <BearingWidget />
      case 5:
        return <PowerWidget />
      case 6:
        return <FuelLogWidget />
      // case 7은 ShipControl에서 WeatherEnvironment로 처리됨
      default:
        return <OverviewWidget />
    }
  }

  return (
    <Frame className="detail-widget-container">
      <div className="detail-widget">
        {renderWidget()}
      </div>
    </Frame>
  )
}

export default DetailWidget

