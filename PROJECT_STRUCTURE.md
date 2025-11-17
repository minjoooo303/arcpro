# 프로젝트 구조

## 디렉토리 트리

```
ship/
├── package.json
├── vite.config.js
├── index.html
├── README.md
├── PROJECT_STRUCTURE.md
└── src/
    ├── main.jsx                 # 엔트리 포인트
    ├── App.jsx                  # 루트 컴포넌트 (Arwes 테마 적용)
    ├── index.css                # 전역 스타일
    └── components/
        ├── Dashboard.jsx        # 메인 대시보드 레이아웃
        ├── Dashboard.css
        │
        ├── top/                 # 상단: 경로/지도 패널
        │   ├── RouteMapPanel.jsx
        │   └── RouteMapPanel.css
        │
        ├── middle/              # 중단: 운항 계기판 클러스터
        │   ├── OperationCluster.jsx
        │   ├── OperationCluster.css
        │   ├── NavigationCard.jsx      # 항법/조타 카드
        │   ├── EngineCard.jsx          # 엔진/추진 카드
        │   ├── FuelPowerCard.jsx       # 연료/전력 카드
        │   ├── EnvironmentCard.jsx     # 환경/빙해 카드
        │   └── Card.css                # 공통 카드 스타일
        │
        ├── bottom/              # 하단: 모드 전환 + 상세 위젯
        │   ├── ModeSelector.jsx
        │   ├── ModeSelector.css
        │   ├── DetailWidget.jsx
        │   ├── DetailWidget.css
        │   └── widgets/         # 7가지 모드별 위젯
        │       ├── OverviewWidget.jsx
        │       ├── EngineDetailWidget.jsx
        │       ├── HullStressWidget.jsx
        │       ├── BearingWidget.jsx
        │       ├── PowerWidget.jsx
        │       ├── FuelLogWidget.jsx
        │       └── IceDetailWidget.jsx
        │
        └── left/                # 좌측: 선박 단면도
            ├── ShipDiagram.jsx
            └── ShipDiagram.css
```

## 컴포넌트 설명

### 1. 상단 - RouteMapPanel
**위치**: `src/components/top/RouteMapPanel.jsx`

**기능**:
- 북극 항로 지도 표시
- 빙산, 해빙 구역 등 장애물 오버레이
- 현재 목적지 및 ETA 정보
- 항로 옵션 (북동항로, 북서항로)
- 경로 경고 표시

**주요 props**: 없음 (내부 상태로 관리)

---

### 2. 중단 - OperationCluster
**위치**: `src/components/middle/OperationCluster.jsx`

**기능**: 4개의 운항 계기판 카드를 그리드로 배치

**하위 컴포넌트**:

#### 2.1 NavigationCard
- Heading (선수방위) - 원형 게이지
- Speed (속력) - 바 게이지
- Rudder Angle (타 각도) - 중앙 정렬 바 게이지
- Course, Drift 정보

#### 2.2 EngineCard
- RPM - 원형 게이지
- 엔진 부하 - 바 게이지
- 온도 - 바 게이지
- Torque, Pressure 정보

#### 2.3 FuelPowerCard (compact)
- 연료 소모율
- 남은 연료 퍼센테이지
- 발전기 로드
- Range (항속거리)

#### 2.4 EnvironmentCard (compact)
- 외기/수온
- 풍속
- 해빙 농도
- Ice Alert 상태 (Normal/Caution/Danger)

---

### 3. 하단 - ModeSelector + DetailWidget
**위치**: `src/components/bottom/`

#### 3.1 ModeSelector
**기능**: 7가지 대시보드 모드 선택 버튼

**모드 목록**:
1. 전체 운항 개요
2. 엔진 상세 / PdM
3. 선체 응력 / 피로
4. 베어링 상태 / RUL
5. 전기/발전기
6. 연료 로깅
7. 환경/빙해 상세

#### 3.2 DetailWidget
**기능**: 선택된 모드에 따라 다른 위젯 렌더링

**위젯 목록** (`src/components/bottom/widgets/`):
- `OverviewWidget.jsx` - 전체 운항 개요, 속력 그래프
- `EngineDetailWidget.jsx` - 실린더별 온도/압력, RUL 예측
- `HullStressWidget.jsx` - 선수/선미/중앙부 응력 추이
- `BearingWidget.jsx` - 베어링별 온도/진동/RUL 리스트
- `PowerWidget.jsx` - 발전기별 부하 차트
- `FuelLogWidget.jsx` - 연료 소모 추이
- `IceDetailWidget.jsx` - 해빙 농도/두께 추이

모든 위젯은 **Recharts** 라이브러리를 사용하여 데이터 시각화

---

### 4. 좌측 - ShipDiagram
**위치**: `src/components/left/ShipDiagram.jsx`

**기능**:
- SVG 선박 단면도 표시
- 클릭 가능한 6개 핫스팟:
  - 엔진 룸
  - 샤프트/베어링
  - 발전기
  - 선수 구조
  - 선미 구조
  - 연료 탱크
- 선택된 컴포넌트 하이라이트
- 컴포넌트 리스트 표시

**주요 props**:
- `onComponentSelect(componentId)` - 컴포넌트 선택 콜백
- `selectedComponent` - 현재 선택된 컴포넌트 ID

---

## 상태 관리

### Dashboard.jsx (메인)
```javascript
const [selectedMode, setSelectedMode] = useState(1)           // 현재 선택된 모드 (1-7)
const [selectedShipComponent, setSelectedShipComponent] = useState(null)  // 선택된 선박 부위
```

**데이터 흐름**:
1. 사용자가 `ShipDiagram`에서 부위 클릭
2. `onComponentSelect` 콜백으로 `selectedShipComponent` 업데이트
3. `OperationCluster`에 전달하여 해당 카드 하이라이트
4. `DetailWidget`에 전달하여 관련 정보 표시

---

## 스타일링

### Arwes 프레임워크
- `FrameSVGKranox` - 사이버펑크 스타일 프레임/보더
- 기본 색상: `#00f8f8` (청록색)
- 배경색: `#000915` (다크 블루)

### 공통 스타일 패턴
- **게이지**: 원형(circular) 및 바(bar) 게이지
- **카드**: 반투명 배경 + 글로우 보더
- **애니메이션**: pulse, blink, fadeIn
- **호버 효과**: 변환(transform), 그림자(shadow)

### 반응형
- 데스크탑: Grid 레이아웃 (4열)
- 모바일: Stack 레이아웃 (1열)
- 브레이크포인트: `1200px`

---

## 실시간 데이터 시뮬레이션

현재는 `useEffect` + `setInterval`로 랜덤 데이터 생성:

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setRpm(prev => Math.max(0, Math.min(100, prev + Math.random() * 4 - 2)))
    // ...
  }, 1500)
  return () => clearInterval(interval)
}, [])
```

**프로덕션 연동 시**:
- WebSocket 연결
- REST API 폴링
- MQTT 구독
- 등으로 교체 가능

---

## 확장 가능성

### 새로운 모드 추가
1. `widgets/` 폴더에 새 위젯 컴포넌트 생성
2. `DetailWidget.jsx`의 `switch` 문에 case 추가
3. `Dashboard.jsx`의 `DASHBOARD_MODES` 배열에 항목 추가

### 새로운 계기판 카드 추가
1. `middle/` 폴더에 새 카드 컴포넌트 생성
2. `OperationCluster.jsx`에 임포트 및 배치
3. `Card.css` 재사용

### 새로운 선박 부위 추가
1. `ShipDiagram.jsx`의 `SHIP_COMPONENTS` 배열에 항목 추가
2. SVG 경로에 새로운 `<rect>` 또는 `<path>` 추가

---

## 개발 워크플로우

### 1. 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저가 자동으로 열리고 `http://localhost:3000`에서 실행됩니다.

### 3. 빌드
```bash
npm run build
```

빌드 결과는 `dist/` 폴더에 생성됩니다.

### 4. 프리뷰
```bash
npm run preview
```

---

## 주요 라이브러리

- **React 18** - UI 프레임워크
- **Arwes** - Sci-Fi UI 컴포넌트 프레임워크
- **Recharts** - 데이터 시각화 (차트)
- **Lucide React** - 아이콘
- **Vite** - 빌드 도구

---

## 다음 단계

### 백엔드 연동
- [ ] WebSocket 서버 연결
- [ ] 실시간 센서 데이터 스트림
- [ ] 히스토리 데이터 API

### 기능 추가
- [ ] 알림/경고 시스템
- [ ] 사용자 설정 (테마, 단위 등)
- [ ] 데이터 내보내기 (CSV, PDF)
- [ ] 다국어 지원

### 성능 최적화
- [ ] 메모이제이션 (useMemo, useCallback)
- [ ] 가상 스크롤링
- [ ] 차트 데이터 샘플링

### 테스트
- [ ] 유닛 테스트 (Vitest)
- [ ] E2E 테스트 (Playwright)

---

## 문제 해결

### Arwes 타입 에러
Arwes는 아직 알파 버전이므로 일부 타입 에러가 발생할 수 있습니다. 
JSX 파일 사용을 권장합니다.

### 차트가 표시되지 않음
`ResponsiveContainer`의 부모 요소가 명시적인 높이를 가져야 합니다.

### 스타일이 적용되지 않음
CSS 파일이 올바르게 임포트되었는지 확인하세요.

---

## 라이선스

MIT

