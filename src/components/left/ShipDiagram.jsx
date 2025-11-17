import React, { useState } from 'react'
import Frame from '../common/Frame'
import './ShipDiagram.css'

const SHIP_COMPONENTS = [
  { id: 'fuel', name: '연료 탱크', x: 25, y: 55, width: 15, height: 15 },
  { id: 'generator', name: '발전기', x: 42, y: 58, width: 12, height: 12 },
  { id: 'engine', name: '엔진 룸', x: 56, y: 52, width: 16, height: 20 },
  { id: 'shaft', name: '샤프트/베어링', x: 74, y: 60, width: 12, height: 10 },
  { id: 'stern', name: '선미/프로펠러', x: 88, y: 48, width: 10, height: 28 },
]

const ShipDiagram = ({ onComponentSelect, selectedComponent }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  const handleComponentClick = (componentId) => {
    onComponentSelect(componentId === selectedComponent ? null : componentId)
  }

  return (
    <Frame className="ship-diagram-frame">
      <div className="ship-diagram-container">
        <div className="diagram-header">
          <h3>선박 구조도</h3>
        </div>

        <div className="diagram-content">
          {/* SVG 선박 단면도 (상단) */}
          <svg className="ship-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* 선체 하부 (Hull) */}
            <path
              d="M 5 45 L 3 60 Q 2 70, 8 75 L 92 75 Q 98 70, 97 60 L 98 48 Q 98 45, 95 45 L 5 45 Z"
              fill="rgba(0, 248, 248, 0.08)"
              stroke="#00f8f8"
              strokeWidth="0.6"
            />
            
            {/* 선미 (Stern) - 뒤쪽 프로펠러 부분 */}
            <path
              d="M 95 45 L 98 48 L 98 65 Q 98 70, 95 72 L 95 45 Z"
              fill="rgba(0, 248, 248, 0.15)"
              stroke="#00f8f8"
              strokeWidth="0.5"
            />
            
            {/* 프로펠러 */}
            <circle cx="99" cy="60" r="3" fill="none" stroke="#00f8f8" strokeWidth="0.4" />
            <line x1="99" y1="57" x2="99" y2="63" stroke="#00f8f8" strokeWidth="0.3" />
            <line x1="96" y1="60" x2="102" y2="60" stroke="#00f8f8" strokeWidth="0.3" />
            
            {/* 상부 구조 (Superstructure) */}
            <rect x="25" y="38" width="45" height="7" fill="rgba(0, 248, 248, 0.12)" stroke="#00f8f8" strokeWidth="0.4" />
            
            {/* 브리지/조타실 */}
            <rect x="35" y="30" width="20" height="8" fill="rgba(0, 248, 248, 0.15)" stroke="#00f8f8" strokeWidth="0.4" />
            
            {/* 안테나/마스트 */}
            <line x1="45" y1="30" x2="45" y2="22" stroke="#00f8f8" strokeWidth="0.3" />
            <circle cx="45" cy="22" r="1" fill="#00f8f8" />
            
            {/* 갑판 라인 */}
            <line x1="5" y1="45" x2="95" y2="45" stroke="rgba(0, 248, 248, 0.4)" strokeWidth="0.4" />
            
            {/* 내부 구획선 */}
            <line x1="23" y1="45" x2="23" y2="73" stroke="rgba(0, 248, 248, 0.25)" strokeWidth="0.3" strokeDasharray="2,2" />
            <line x1="40" y1="45" x2="40" y2="70" stroke="rgba(0, 248, 248, 0.25)" strokeWidth="0.3" strokeDasharray="2,2" />
            <line x1="54" y1="45" x2="54" y2="70" stroke="rgba(0, 248, 248, 0.25)" strokeWidth="0.3" strokeDasharray="2,2" />
            <line x1="72" y1="45" x2="72" y2="70" stroke="rgba(0, 248, 248, 0.25)" strokeWidth="0.3" strokeDasharray="2,2" />
            <line x1="86" y1="45" x2="86" y2="70" stroke="rgba(0, 248, 248, 0.25)" strokeWidth="0.3" strokeDasharray="2,2" />

            {/* 클릭 가능한 영역들 (hotspots) */}
            {SHIP_COMPONENTS.map((component) => {
              const isSelected = selectedComponent === component.id
              const isHovered = hoveredComponent === component.id

              return (
                <g key={component.id}>
                  {/* 클릭 영역 */}
                  <rect
                    x={component.x}
                    y={component.y}
                    width={component.width}
                    height={component.height}
                    fill={isSelected ? 'rgba(0, 248, 248, 0.5)' : isHovered ? 'rgba(0, 248, 248, 0.25)' : 'rgba(0, 248, 248, 0.12)'}
                    stroke={isSelected ? '#00f8f8' : 'rgba(0, 248, 248, 0.6)'}
                    strokeWidth={isSelected ? '0.8' : '0.4'}
                    className="ship-component"
                    onClick={() => handleComponentClick(component.id)}
                    onMouseEnter={() => setHoveredComponent(component.id)}
                    onMouseLeave={() => setHoveredComponent(null)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  
                  {/* 컴포넌트 중심 마커 */}
                  <circle
                    cx={component.x + component.width / 2}
                    cy={component.y + component.height / 2}
                    r={isSelected ? "2" : "1.5"}
                    fill={isSelected ? '#00f8f8' : 'rgba(0, 248, 248, 0.6)'}
                    className="component-marker"
                    onClick={() => handleComponentClick(component.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  
                  {/* 선택/호버 시 글로우 효과 */}
                  {(isSelected || isHovered) && (
                    <rect
                      x={component.x - 1}
                      y={component.y - 1}
                      width={component.width + 2}
                      height={component.height + 2}
                      fill="none"
                      stroke="#00f8f8"
                      strokeWidth="0.5"
                      opacity={isSelected ? "0.8" : "0.5"}
                      style={{ 
                        filter: 'blur(1px)',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                  
                  {/* 라벨 (선택 시만 표시) */}
                  {isSelected && (
                    <text
                      x={component.x + component.width / 2}
                      y={component.y - 2}
                      textAnchor="middle"
                      fill="#00f8f8"
                      fontSize="3"
                      fontWeight="bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {component.name}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* 컴포넌트 선택 버튼들 (중간) */}
          <div className="component-buttons">
            {SHIP_COMPONENTS.map((component) => {
              const isSelected = selectedComponent === component.id
              const isHovered = hoveredComponent === component.id

              return (
                <button
                  key={component.id}
                  className={`component-button ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                  onClick={() => handleComponentClick(component.id)}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                >
                  <div className="component-indicator" />
                  <span className="component-name">{component.name}</span>
                </button>
              )
            })}
          </div>

          {/* 선택된 컴포넌트 상세 정보 (하단) */}
          {selectedComponent && (
            <div className="selected-details">
              <div className="detail-header">
                <div className="detail-title">
                  {SHIP_COMPONENTS.find(c => c.id === selectedComponent)?.name}
                </div>
              </div>
              <div className="detail-content">
                <div className="detail-info">
                  <span className="detail-label">상태:</span>
                  <span className="detail-value status-normal">정상</span>
                </div>
                <div className="detail-info">
                  <span className="detail-label">온도:</span>
                  <span className="detail-value">45°C</span>
                </div>
                <div className="detail-info">
                  <span className="detail-label">압력:</span>
                  <span className="detail-value">2.5 bar</span>
                </div>
                <div className="detail-info">
                  <span className="detail-label">가동 시간:</span>
                  <span className="detail-value">1,234 hrs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Frame>
  )
}

export default ShipDiagram

