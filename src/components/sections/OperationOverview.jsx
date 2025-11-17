import React from 'react'
import Frame from '../common/Frame'
import { MapPin, Navigation, AlertTriangle } from 'lucide-react'
import './OperationOverview.css'

const OperationOverview = () => {
  return (
    <div className="operation-overview">
      {/* 목적지 정보 */}
      <Frame className="overview-card">
        <div className="overview-card-content">
          <div className="overview-card-header">
            <MapPin size={18} />
            <h3>목적지</h3>
          </div>
          <div className="overview-card-body">
            <div className="info-row">
              <span className="info-label">항구:</span>
              <span className="info-value">Murmansk</span>
            </div>
            <div className="info-row">
              <span className="info-label">ETA:</span>
              <span className="info-value">2025-11-20 14:30</span>
            </div>
            <div className="info-row">
              <span className="info-label">거리:</span>
              <span className="info-value">1,245 NM</span>
            </div>
            <div className="info-row">
              <span className="info-label">진행률:</span>
              <span className="info-value">61%</span>
            </div>
          </div>
        </div>
      </Frame>

      {/* 항로 옵션 */}
      <Frame className="overview-card">
        <div className="overview-card-content">
          <div className="overview-card-header">
            <Navigation size={18} />
            <h3>항로 옵션</h3>
          </div>
          <div className="overview-card-body">
            <div className="route-option active">
              <div className="route-option-badge">선택됨</div>
              <div className="route-option-name">북동항로 (NSR)</div>
              <div className="route-option-detail">최단거리</div>
            </div>
            <div className="route-option">
              <div className="route-option-badge alt">대안</div>
              <div className="route-option-name">북서항로 (NWP)</div>
              <div className="route-option-detail">+2.5일 소요</div>
            </div>
          </div>
        </div>
      </Frame>

      {/* 경로 경고 */}
      <Frame className="overview-card alert-card">
        <div className="overview-card-content">
          <div className="overview-card-header">
            <AlertTriangle size={18} />
            <h3>경로 경고</h3>
          </div>
          <div className="overview-card-body">
            <div className="alert-item">
              <div className="alert-badge danger">위험</div>
              <div className="alert-text">빙산 감지: 50km 전방</div>
            </div>
            <div className="alert-item">
              <div className="alert-badge warning">주의</div>
              <div className="alert-text">해빙 농도: 35%</div>
            </div>
            <div className="alert-item">
              <div className="alert-badge info">정보</div>
              <div className="alert-text">기상 양호</div>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}

export default OperationOverview

