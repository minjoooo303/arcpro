import React from 'react'
import Frame from '../common/Frame'
import { 
  Compass, 
  Cog, 
  Shield, 
  Circle, 
  Zap, 
  Fuel, 
  CloudSnow 
} from 'lucide-react'
import './ModeSelector.css'

const ICONS = {
  compass: Compass,
  engine: Cog,
  hull: Shield,
  bearing: Circle,
  power: Zap,
  fuel: Fuel,
  ice: CloudSnow
}

const ModeSelector = ({ modes, selectedMode, onModeSelect }) => {
  return (
    <div className="mode-selector">
      {modes.map((mode) => {
        const Icon = ICONS[mode.icon] || Compass
        const isSelected = selectedMode === mode.id

        return (
          <div
            key={mode.id}
            className={`mode-button ${isSelected ? 'selected' : ''}`}
            onClick={() => onModeSelect(mode.id)}
          >
            <Frame>
              <div className="mode-button-content">
                <div className="mode-icon">
                  <Icon size={20} />
                </div>
                <div className="mode-info">
                  <span className="mode-number">{mode.id}</span>
                  <span className="mode-name">{mode.name}</span>
                </div>
              </div>
            </Frame>
          </div>
        )
      })}
    </div>
  )
}

export default ModeSelector

