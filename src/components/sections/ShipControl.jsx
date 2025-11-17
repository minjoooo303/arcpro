import React from 'react'
import Frame from '../common/Frame'
import ModeSelector from '../bottom/ModeSelector'
import DetailWidget from '../bottom/DetailWidget'
import WeatherEnvironment from './WeatherEnvironment'
import './ShipControl.css'

const SHIP_COMPONENTS = [
  { id: 'stern', name: '프로펠러/러더', x: 5, y: 45, width: 18, height: 30 },
  { id: 'engine', name: '엔진 룸', x: 25, y: 55, width: 15, height: 15 },
  { id: 'generator', name: '발전기', x: 42, y: 58, width: 12, height: 12 },
  { id: 'fuel', name: '연료 탱크', x: 56, y: 52, width: 16, height: 20 },
  { id: 'shaft', name: '샤프트/베어링', x: 74, y: 60, width: 12, height: 10 },
]

const DASHBOARD_MODES = [
  { id: 1, name: '전체 운항 개요', icon: 'compass' },
  { id: 2, name: '엔진 상세 / PdM', icon: 'engine' },
  { id: 3, name: '선체 응력 / 피로', icon: 'hull' },
  { id: 4, name: '베어링 상태 / RUL', icon: 'bearing' },
  { id: 5, name: '전기/발전기', icon: 'power' },
  { id: 6, name: '연료 로깅', icon: 'fuel' },
  { id: 7, name: '환경/빙해 상세', icon: 'ice' }
]

const ShipControl = ({ selectedShipComponent, onComponentSelect, selectedMode, onModeSelect }) => {
  const handleComponentClick = (componentId) => {
    onComponentSelect(componentId === selectedShipComponent ? null : componentId)
  }

  return (
    <div className="ship-control">
      {/* 1. 선박 구조도 (왼쪽) */}
      <Frame className="ship-diagram-section">
        <div className="ship-diagram-header">
          <h3>선박 구조도</h3>
        </div>
        
        {/* SVG 다이어그램 - 심플 */}
        <div className="ship-diagram-svg-container">
          <svg className="ship-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* 선체 */}
            <path
              d="M 10 50 L 15 72 L 85 72 L 90 50 Z"
              fill="rgba(0, 248, 248, 0.08)"
              stroke="#00f8f8"
              strokeWidth="1"
            />
            
            {/* 갑판 라인 */}
            <line x1="10" y1="50" x2="90" y2="50" stroke="#00f8f8" strokeWidth="1" />
            
            {/* 브리지 */}
            <rect x="22" y="35" width="18" height="15" 
              fill="rgba(0, 248, 248, 0.1)" 
              stroke="#00f8f8" 
              strokeWidth="0.8" 
            />
            
            {/* 마스트 */}
            <line x1="31" y1="35" x2="31" y2="20" stroke="#00f8f8" strokeWidth="0.6" />
            <rect x="29" y="18" width="4" height="4" fill="#00f8f8" stroke="#00f8f8" strokeWidth="0.5" />
            
            {/* 내부 구획선 */}
            {/* <line x1="25" y1="50" x2="25" y2="68" stroke="rgba(0, 248, 248, 0.3)" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="42" y1="50" x2="42" y2="68" stroke="rgba(0, 248, 248, 0.3)" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="59" y1="50" x2="59" y2="68" stroke="rgba(0, 248, 248, 0.3)" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="76" y1="50" x2="76" y2="68" stroke="rgba(0, 248, 248, 0.3)" strokeWidth="0.5" strokeDasharray="3,3" /> */}

            {/* 클릭 가능한 영역들 - SVG 맨 위에 배치 */}
            <g className="clickable-areas" style={{ pointerEvents: 'all' }}>
              {SHIP_COMPONENTS.map((component) => {
                const isSelected = selectedShipComponent === component.id

                return (
                  <g key={component.id}>
                    <rect
                      x={component.x}
                      y={component.y}
                      width={component.width}
                      height={component.height}
                      fill="transparent"
                      stroke={isSelected ? '#00f8f8' : 'rgba(0, 248, 248, 0.4)'}
                      strokeWidth={isSelected ? '1' : '0.5'}
                      strokeDasharray={isSelected ? 'none' : '2,2'}
                      className="ship-component"
                      onClick={() => handleComponentClick(component.id)}
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                    />
                    
                    <circle
                      cx={component.x + component.width / 2}
                      cy={component.y + component.height / 2}
                      r={isSelected ? "2.5" : "1.5"}
                      fill={isSelected ? '#00f8f8' : 'rgba(0, 248, 248, 0.7)'}
                      className="component-marker"
                      onClick={() => handleComponentClick(component.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    
                    {isSelected && (
                      <text
                        x={component.x + component.width / 2}
                        y={component.y - 2}
                        textAnchor="middle"
                        fill="#00f8f8"
                        fontSize="3.5"
                        fontWeight="bold"
                        style={{ pointerEvents: 'none' }}
                      >
                        {component.name}
                      </text>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>
        </div>

        {/* 컴포넌트 선택 버튼들 */}
        <div className="ship-component-buttons">
          {SHIP_COMPONENTS.map((component) => {
            const isSelected = selectedShipComponent === component.id

            return (
              <button
                key={component.id}
                className={`ship-comp-button ${isSelected ? 'selected' : ''}`}
                onClick={() => handleComponentClick(component.id)}
              >
                <div className="comp-indicator" />
                <span className="comp-name">{component.name}</span>
              </button>
            )
          })}
        </div>

        {/* 선택된 컴포넌트 상세 정보 */}
        {selectedShipComponent && (
  <div className="ship-component-details">
    <div className="comp-detail-header">
      <div className="comp-detail-title">
        {SHIP_COMPONENTS.find(c => c.id === selectedShipComponent)?.name}
      </div>
    </div>
    <div className="comp-detail-content">
      {selectedShipComponent === 'stern' && (
        <>
          <div className="comp-detail-info">
            <span className="comp-detail-label">RPM:</span>
            <span className="comp-detail-value">80</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">각도:</span>
            <span className="comp-detail-value">-2°</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">이물질:</span>
            <span className="comp-detail-value">양호</span>
          </div>
        </>
      )}

      {selectedShipComponent === 'generator' && (
        <>
          <div className="comp-detail-info">
            <span className="comp-detail-label">발전량:</span>
            <span className="comp-detail-value">180kWh</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">온도:</span>
            <span className="comp-detail-value">39도</span>
          </div>
        </>
      )}

      {selectedShipComponent === 'engine' && (
        <>
          <div className="comp-detail-info">
            <span className="comp-detail-label">RPM:</span>
            <span className="comp-detail-value">89</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">온도:</span>
            <span className="comp-detail-value">45도</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">냉각 시스템:</span>
            <span className="comp-detail-value">정상</span>
          </div>
        </>
      )}

      {selectedShipComponent === 'fuel' && (
        <>
          <div className="comp-detail-info">
            <span className="comp-detail-label">온도:</span>
            <span className="comp-detail-value">-163도</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">압력:</span>
            <span className="comp-detail-value">11kPa</span>
          </div>
          <div className="comp-detail-info">
            <span className="comp-detail-label">효율:</span>
            <span className="comp-detail-value">58%</span>
          </div>
        </>
      )}

      {/* 선수부는 SHIP_COMPONENTS에 아직 없으니까,
          나중에 bow 같은 id를 추가하면 여기서 비슷하게 블록 추가하면 됨 */}
    </div>
  </div>
)}
      </Frame>

      {/* 2. 모드 선택 버튼들 (오른쪽 위) */}
      <div className="mode-selector-section">
        <ModeSelector 
          modes={DASHBOARD_MODES}
          selectedMode={selectedMode}
          onModeSelect={onModeSelect}
        />
      </div>

      {/* 3. 상세 내용 (오른쪽 아래) */}
      <div className="detail-content-section">
        {selectedMode === 7 ? (
          <WeatherEnvironment />
        ) : (
          <DetailWidget 
            mode={selectedMode} 
            shipComponent={selectedShipComponent}
          />
        )}
      </div>
    </div>
  )
}

export default ShipControl
