import React from 'react'
import Frame from '../common/Frame'
import { Navigation, MapPin, AlertTriangle } from 'lucide-react'
import GoogleRouteMap from './GoogleRouteMap'
import './RouteMapPanel.css'

const RouteMapPanel = () => {
  return (
    <div className="route-map-panel">
      {/* 메인 지도 영역 */}
      <div className="map-container">
        <Frame className="map-frame">
          <div className="map-content">
            <div className="map-title">
              <Navigation size={20} />
              <h2>북극 항로 지도</h2>
            </div>
            
            {/* 지도 시각화 영역 (실제로는 지도 라이브러리 사용) */}
            <div className="map-visualization">
                <GoogleRouteMap />   
            </div>
          </div>
        </Frame>
      </div>

      {/* 우측 정보 카드들 */}
      <div className="route-info-cards">
        {/* 현재 목적지 카드 */}
        <Frame className="info-card">
          <div className="info-card-content">
            <div className="info-card-header">
              <MapPin size={16} />
              <span>목적지</span>
            </div>
            <div className="info-card-body">
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
            </div>
          </div>
        </Frame>

        {/* 항로 옵션 카드 */}
        <Frame className="info-card">
          <div className="info-card-content">
            <div className="info-card-header">
              <Navigation size={16} />
              <span>항로 옵션</span>
            </div>
            <div className="info-card-body">
              <div className="route-option active">
                <span className="route-name">북동항로 (NSR)</span>
                <span className="route-status">선택됨</span>
              </div>
              <div className="route-option">
                <span className="route-name">북서항로 (NWP)</span>
                <span className="route-status">+2.5일</span>
              </div>
            </div>
          </div>
        </Frame>

        {/* 경고 카드 */}
        <Frame className="info-card alert-card">
          <div className="info-card-content">
            <div className="info-card-header">
              <AlertTriangle size={16} />
              <span>경로 경고</span>
            </div>
            <div className="info-card-body">
              <div className="alert-item">
                <span className="alert-level danger">위험</span>
                <span>빙산 감지: 50km 전방</span>
              </div>
              <div className="alert-item">
                <span className="alert-level warning">주의</span>
                <span>해빙 농도: 35%</span>
              </div>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  )
}

export default RouteMapPanel

