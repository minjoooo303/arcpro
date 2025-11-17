

import React, { useState, useCallback } from 'react'
import { GoogleMap, Polyline, Marker, Circle, useJsApiLoader } from '@react-google-maps/api'
import Frame from '../common/Frame'
import { Navigation } from 'lucide-react'
import './RouteMap.css'

const RouteMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // --- 데이터 (동일) ---
  const center = { lat: 72.0, lng: -40.0 }
  const routePath = [
    { lat: 60.0, lng: -45.0 },
    { lat: 65.0, lng: -50.0 },
    { lat: 70.0, lng: -52.0 },
    { lat: 75.0, lng: -45.0 },
    { lat: 78.0, lng: -30.0 },
    { lat: 80.0, lng: 0.0 },
    { lat: 77.0, lng: 30.0 },
    { lat: 75.0, lng: 60.0 },
    { lat: 72.0, lng: 100.0 },
  ]
  const currentPosition = { lat: 70.0, lng: -52.0 }
  const destination = { lat: 69.0, lng: 33.0 }
  const icebergZone = { lat: 69.0, lng: -51.0 }
  const iceZones = [
    { lat: 68.0, lng: -53.0 },
    { lat: 72.0, lng: -48.0 },
    { lat: 76.0, lng: -40.0 },
  ]

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  }

  return (
    <Frame className="route-map-frame">
      <div className="route-map-container">
        <div className="route-map-header">
          <Navigation size={20} />
          <h2>북극 항로 지도</h2>
        </div>

        <div className="route-map-visualization">
          {loadError && <div>구글 지도 로드 오류 발생</div>}

          {!isLoaded ? (
            <div style={{ color: '#00f8f8' }}>지도를 불러오는 중...</div>
          ) : (
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: '4px',
              }}
              center={center}
              zoom={4}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={mapOptions}
            >
              {/* 항로 경로 */}
              <Polyline
                path={routePath}
                options={{
                  strokeColor: '#00f8f8',
                  strokeOpacity: 0.9,
                  strokeWeight: 3,
                }}
              />

              {/* 현재 위치 */}
              <Marker
                position={currentPosition}
                icon={{
                  url:
                    'data:image/svg+xml;base64,' +
                    btoa(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                         <circle cx="10" cy="10" r="8" fill="#00ff00" stroke="#ffffff" stroke-width="2"/>
                       </svg>`
                    ),
                  scaledSize: new window.google.maps.Size(20, 20),
                }}
                label={{
                  text: '현재 위치',
                  color: '#00ff00',
                  fontSize: '12px',
                }}
              />

              {/* 목적지 */}
              <Marker
                position={destination}
                icon={{
                  url:
                    'data:image/svg+xml;base64,' +
                    btoa(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                         <circle cx="10" cy="10" r="8" fill="#ffff00" stroke="#ffffff" stroke-width="2"/>
                       </svg>`
                    ),
                  scaledSize: new window.google.maps.Size(20, 20),
                }}
                label={{
                  text: 'Nuuk',
                  color: '#ffff00',
                  fontSize: '12px',
                }}
              />

              {/* 빙산 위험 구역 */}
              <Circle
                center={icebergZone}
                radius={50000}
                options={{
                  fillColor: '#ff0000',
                  fillOpacity: 0.3,
                  strokeColor: '#ff0000',
                }}
              />

              {/* 해빙 구역 */}
              {iceZones.map((zone, index) => (
                <Circle
                  key={index}
                  center={zone}
                  radius={75000}
                  options={{
                    fillColor: '#0096ff',
                    fillOpacity: 0.2,
                    strokeColor: '#0096ff',
                  }}
                />
              ))}
            </GoogleMap>
          )}
        </div>
      </div>
    </Frame>
  )
}

export default RouteMap
// src/components/sections/RouteMap.jsx
// import React, { useState, useCallback } from 'react'
// import { GoogleMap, LoadScript, Polyline, Marker, Circle } from '@react-google-maps/api'
// import Frame from '../common/Frame'
// import { Navigation } from 'lucide-react'
// import './RouteMap.css'

// const RouteMap = () => {
//   const [loadError, setLoadError] = useState(false)
//   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

//   // 북극해 중심 좌표
//   const center = {
//     lat: 72.0,
//     lng: -40.0, // 그린란드 동부 해안
//   }

//   // 북극 항로 경로 좌표들 (북동항로 예시)
//   const routePath = [
//     { lat: 60.0, lng: -45.0 }, // 출발 (대서양)
//     { lat: 65.0, lng: -50.0 }, // 그린란드 남부
//     { lat: 70.0, lng: -52.0 }, // 그린란드 서부 (Disko Bay)
//     { lat: 75.0, lng: -45.0 }, // 그린란드 북서부
//     { lat: 78.0, lng: -30.0 }, // 북극해 진입
//     { lat: 80.0, lng: 0.0 },   // 스발바르 근처
//     { lat: 77.0, lng: 30.0 },  // 러시아 북극해
//     { lat: 75.0, lng: 60.0 },  // 카라 해
//     { lat: 72.0, lng: 100.0 }, // 시베리아 방향
//   ]

//   // 현재 선박 위치
//   const currentPosition = { lat: 70.0, lng: -52.0 }

//   // 빙산 위험 구역
//   const icebergZone = { lat: 69.0, lng: -51.0 }

//   // 해빙 구역들
//   const iceZones = [
//     { lat: 68.0, lng: -53.0 }, // Disko Bay
//     { lat: 72.0, lng: -48.0 }, // Melville Bay
//     { lat: 76.0, lng: -40.0 }, // 그린란드 북부
//   ]

//   // 목적지
//   const destination = { lat: 69.0, lng: 33.0 }

//   const onLoad = useCallback((mapInstance) => {
//     // 디버깅용 콘솔
//     console.log('Google Map loaded', mapInstance)
//   }, [])

//   const onUnmount = useCallback(() => {
//     console.log('Google Map unmounted')
//   }, [])

//   const onLoadError = useCallback(() => {
//     setLoadError(true)
//     console.error('Google Maps API 로드 실패! VITE_GOOGLE_MAPS_API_KEY를 확인하세요.')
//   }, [])

//   // 지도 스타일 (어두운 테마)
//   const mapStyles = [
//     {
//       elementType: 'geometry',
//       stylers: [{ color: '#0a1428' }],
//     },
//     {
//       elementType: 'labels.text.fill',
//       stylers: [{ color: '#00f8f8' }],
//     },
//     {
//       elementType: 'labels.text.stroke',
//       stylers: [{ color: '#0a1428' }],
//     },
//     {
//       featureType: 'water',
//       elementType: 'geometry',
//       stylers: [{ color: '#0d1f3d' }],
//     },
//     {
//       featureType: 'water',
//       elementType: 'labels.text.fill',
//       stylers: [{ color: '#0096ff' }],
//     },
//   ]

//   const mapOptions = {
//     styles: mapStyles,
//     disableDefaultUI: false,
//     zoomControl: true,
//     mapTypeControl: true,
//     scaleControl: true,
//     streetViewControl: false,
//     rotateControl: false,
//     fullscreenControl: true,
//   }

//   return (
//     <Frame className="route-map-frame">
//       <div className="route-map-container">
//         <div className="route-map-header">
//           <Navigation size={20} />
//           <h2>북극 항로 지도</h2>
//         </div>

//         {/* 지도 시각화 영역 */}
//         <div className="route-map-visualization">
//           {apiKey && !loadError ? (
//             <LoadScript googleMapsApiKey={apiKey} onError={onLoadError}>
//               <GoogleMap
//                 mapContainerStyle={{
//                   width: '100%',
//                   height: '100%',
//                   borderRadius: '4px',
//                 }}
//                 center={center}
//                 zoom={4}
//                 onLoad={onLoad}
//                 onUnmount={onUnmount}
//                 options={mapOptions}
//               >
//                 {/* 항로 경로 */}
//                 <Polyline
//                   path={routePath}
//                   options={{
//                     strokeColor: '#00f8f8',
//                     strokeOpacity: 0.9,
//                     strokeWeight: 3,
//                     geodesic: true,
//                   }}
//                 />

//                 {/* 현재 위치 마커 (기본 마커 + 라벨만 사용) */}
//                 <Marker
//                   position={currentPosition}
//                   label={{
//                     text: '현재 위치',
//                     color: '#00ff00',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                   }}
//                 />

//                 {/* 목적지 마커 */}
//                 <Marker
//                   position={destination}
//                   label={{
//                     text: 'Nuuk',
//                     color: '#ffff00',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                   }}
//                 />

//                 {/* 빙산 위험 구역 */}
//                 <Circle
//                   center={icebergZone}
//                   radius={50000} // 50km
//                   options={{
//                     fillColor: '#ff0000',
//                     fillOpacity: 0.3,
//                     strokeColor: '#ff0000',
//                     strokeOpacity: 0.8,
//                     strokeWeight: 2,
//                   }}
//                 />

//                 {/* 해빙 구역들 */}
//                 {iceZones.map((zone, index) => (
//                   <Circle
//                     key={index}
//                     center={zone}
//                     radius={75000} // 75km
//                     options={{
//                       fillColor: '#0096ff',
//                       fillOpacity: 0.2,
//                       strokeColor: '#0096ff',
//                       strokeOpacity: 0.6,
//                       strokeWeight: 2,
//                     }}
//                   />
//                 ))}
//               </GoogleMap>
//             </LoadScript>
//           ) : (
//             // Fallback SVG (API 키 없거나 오류일 때)
//             <svg
//               className="route-svg"
//               viewBox="0 0 800 400"
//               style={{ width: '100%', height: '100%' }}
//             >
//               <defs>
//                 <pattern
//                   id="grid"
//                   width="40"
//                   height="40"
//                   patternUnits="userSpaceOnUse"
//                 >
//                   <path
//                     d="M 40 0 L 0 0 0 40"
//                     fill="none"
//                     stroke="rgba(0, 248, 248, 0.1)"
//                     strokeWidth="0.5"
//                   />
//                 </pattern>
//               </defs>
//               <rect width="800" height="400" fill="url(#grid)" />

//               <text
//                 x="400"
//                 y="50"
//                 fill="rgba(0, 248, 248, 0.6)"
//                 fontSize="20"
//                 textAnchor="middle"
//                 fontStyle="italic"
//               >
//                 Arctic Ocean - 북극해
//               </text>

//               <path
//                 d="M 50 200 Q 200 160, 350 200 T 650 180"
//                 stroke="#00f8f8"
//                 strokeWidth="3"
//                 fill="none"
//                 strokeDasharray="5,5"
//               />

//               <circle cx="350" cy="200" r="8" fill="#00ff00" />
//               <text
//                 x="350"
//                 y="230"
//                 fill="#00ff00"
//                 fontSize="14"
//                 textAnchor="middle"
//                 fontWeight="bold"
//               >
//                 현재 위치
//               </text>

//               <circle
//                 cx="500"
//                 cy="160"
//                 r="20"
//                 fill="rgba(255, 0, 0, 0.3)"
//                 stroke="#ff0000"
//                 strokeWidth="2"
//               />
//               <text
//                 x="500"
//                 y="130"
//                 fill="#ff0000"
//                 fontSize="12"
//                 textAnchor="middle"
//                 fontWeight="bold"
//               >
//                 빙산 주의
//               </text>

//               <rect
//                 x="200"
//                 y="140"
//                 width="100"
//                 height="60"
//                 fill="rgba(0, 150, 255, 0.2)"
//                 stroke="#0096ff"
//                 strokeWidth="2"
//               />
//               <text
//                 x="250"
//                 y="130"
//                 fill="#0096ff"
//                 fontSize="12"
//                 textAnchor="middle"
//                 fontWeight="bold"
//               >
//                 해빙 구역
//               </text>

//               <circle cx="750" cy="180" r="8" fill="#ffff00" />
//               <text
//                 x="750"
//                 y="210"
//                 fill="#ffff00"
//                 fontSize="14"
//                 textAnchor="middle"
//                 fontWeight="bold"
//               >
//                 Murmansk
//               </text>

//               {!apiKey && (
//                 <text
//                   x="400"
//                   y="380"
//                   fill="rgba(255, 165, 0, 0.8)"
//                   fontSize="12"
//                   textAnchor="middle"
//                 >
//                   .env에 VITE_GOOGLE_MAPS_API_KEY를 설정하면 실제 지도가 표시됩니다
//                 </text>
//               )}
//             </svg>
//           )}
//         </div>
//       </div>
//     </Frame>
//   )
// }

// export default RouteMap
