// // src/components/top/GoogleRouteMap.jsx
// import React, { useCallback, useState } from 'react'
// import {
//   GoogleMap,
//   LoadScript,
//   DirectionsService,
//   DirectionsRenderer,
// } from '@react-google-maps/api'

// const containerStyle = {
//   width: '100%',
//   height: '100%',
// }

// // 예시: A = 부산항, B = 도쿄항 (실제는 lat/lng 바꿔도 됨)
// const origin = { lat: 35.0953, lng: 129.0410 }
// const destination = { lat: 35.6579, lng: 139.7966 }

// const GoogleRouteMap = () => {
//   const [directions, setDirections] = useState(null)

//   const directionsCallback = useCallback((result, status) => {
//     if (!result) return

//     // @react-google-maps/api에서는 result.status 말고 status 인자로도 오기도 함
//     const s = status || result.status
//     if (s === 'OK') {
//       setDirections(result)
//     } else {
//       console.warn('Directions request failed:', s, result)
//     }
//   }, [])

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={origin}
//         zoom={5}
//         options={{
//           disableDefaultUI: true,
//           zoomControl: true,
//         }}
//       >
//         {/* 아직 경로 없으면 DirectionsService 호출해서 A→B 계산 */}
//         {!directions && (
//           <DirectionsService
//             options={{
//               origin,
//               destination,
//               travelMode: window.google.maps.TravelMode.DRIVING, // DRIVING / WALKING / BICYCLING / TRANSIT
//             }}
//             callback={directionsCallback}
//           />
//         )}

//         {/* 계산된 경로를 지도 위에 그림 */}
//         {directions && (
//           <DirectionsRenderer
//             options={{
//               directions,
//               polylineOptions: {
//                 strokeColor: '#00f8f8',
//                 strokeOpacity: 1,
//                 strokeWeight: 4,
//               },
//               suppressMarkers: false, // true로 하면 기본 마커 숨기고 너가 따로 Marker 쓸 수 있음
//             }}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   )
// }

// export default GoogleRouteMap
const directionsCallback = useCallback((result, status) => {
    console.log('Directions callback:', { status, result })
  
    if (!result) return
  
    const s = status || result.status
    if (s === 'OK') {
      setDirections(result)
    } else {
      console.warn('Directions request failed:', s, result)
    }
  }, [])
  