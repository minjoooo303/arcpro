import React from 'react'
import Frame from '../common/Frame'
import OverviewCards from './OverviewCards'
import EngineDetailWidget from '../bottom/widgets/EngineDetailWidget'
import HullStressWidget from '../bottom/widgets/HullStressWidget'
import BearingWidget from '../bottom/widgets/BearingWidget'
import PowerWidget from '../bottom/widgets/PowerWidget'
import FuelLogWidget from '../bottom/widgets/FuelLogWidget'
import IceDetailWidget from '../bottom/widgets/IceDetailWidget'
import './UnifiedWidget.css'

const COMPONENT_DISPLAY_NAMES = {
  'fuel': { name: '연료 탱크', icon: '⛽', desc: '연료 소비 패턴' },
  'generator': { name: '발전기', icon: '⚡', desc: '전력 생성/소비' },
  'engine': { name: '엔진 룸', icon: '⚙️', desc: '엔진 PdM 분석' },
  'shaft': { name: '샤프트/베어링', icon: '🔩', desc: '베어링 RUL 예측' },
  'stern': { name: '선미/프로펠러', icon: '🌀', desc: '추진 효율 분석' },
}

const UnifiedWidget = ({ selectedShipComponent }) => {
  const renderContent = () => {
    switch (selectedShipComponent) {
      case null:
        // 아무것도 선택 안됨 → 4개 실시간 카드
        return <OverviewCards />
      
      case 'engine':
        return <EngineDetailWidget />
      
      case 'fuel':
        return <FuelLogWidget />
      
      case 'generator':
        return <PowerWidget />
      
      case 'shaft':
        return <BearingWidget />
      
      case 'stern':
        return <IceDetailWidget />
      
      default:
        return <OverviewCards />
    }
  }

  return (
    <div className="unified-widget">
      {/* 현재 선택된 부위 표시 */}
      {selectedShipComponent && COMPONENT_DISPLAY_NAMES[selectedShipComponent] && (
        <Frame className="widget-header-frame">
          <div className="widget-header-content">
            <div className="widget-title">
              <span className="widget-icon">
                {COMPONENT_DISPLAY_NAMES[selectedShipComponent].icon}
              </span>
              <h3>{COMPONENT_DISPLAY_NAMES[selectedShipComponent].name}</h3>
            </div>
            <div className="widget-subtitle">
              {COMPONENT_DISPLAY_NAMES[selectedShipComponent].desc}
            </div>
          </div>
        </Frame>
      )}

      {!selectedShipComponent && (
        <Frame className="widget-header-frame">
          <div className="widget-header-content">
            <div className="widget-title">
              <span className="widget-icon">📊</span>
              <h3>운항 상태 개요</h3>
            </div>
            <div className="widget-subtitle">
              실시간 항법, 엔진, 연료, 환경 정보
            </div>
          </div>
        </Frame>
      )}
      
      {/* 동적 컨텐츠 */}
      <div className="widget-dynamic-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default UnifiedWidget

