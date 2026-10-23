# Arctic Ship Dashboard 🚢

**Interactive React dashboard prototype for visualizing vessel operations and icebreaker-specific maintenance information.**

> **Scope:** This interface uses simulated/demo values. It is **not** connected to live ship sensors and does not implement or validate a remaining-useful-life (RUL) prediction model.

## Project motivation

During a K-shipbuilding hackathon, our team explored potential shipbuilding problems and chose predictive maintenance. Following feedback that generic equipment-failure prediction offered limited differentiation, we examined environmental conditions specific to icebreakers: sea-ice thickness/concentration, propulsion load, and their possible relevance to bearing degradation.

The repository presents a dashboard concept around this problem, **not a validated predictive maintenance system**.

## Implemented dashboard features

- Route/environment panel with map and ice-related displays
- Navigation, engine, fuel/power, and environment indicators
- Seven detail views: overview, engine, hull stress, bearings/RUL display, power, fuel, and ice
- Interactive ship diagram with component selection
- Charts and visual gauges using Recharts and Arwes

## Data and limitations

Some values are produced by `setInterval` and JavaScript random-number updates to demonstrate the UI. Any risk or RUL-looking indicators are illustrative, not measured predictions. Actual deployment would require sensor inputs, calibrated models, verification, and a backend.

## Run locally

```bash
git clone https://github.com/minjoooo303/arcpro.git
cd arcpro
npm install
npm run dev
```

Open the URL printed by Vite. Build with `npm run build` and preview with `npm run preview`.

## Stack

React 18 · Vite · Recharts · Arwes · lucide-react · Google Maps React integration

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for the component breakdown.

## Collaboration

The hackathon problem formulation and concept development were team efforts. This repository documents a UI prototype; repository ownership does not imply sole authorship of the team's ideas.
