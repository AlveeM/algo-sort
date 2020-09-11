import React from 'react'
import './VisualizerContainer.css';

export default function VisualizerContainer(props) {
  return (
    <div className="visualizer-container">
      <div className="array-container">
        {props.array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: props.colors.barColor,
              height: `${value / props.scaleFactor}vh`,
            }}></div>
        ))}
      </div>
    </div>
  )
}
