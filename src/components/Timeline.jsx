import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import './Timeline.css';
import DateMarkers from './DateMarkers';
const Timeline = () => {
  const { events } = useEvents();
  const [scale, setScale] = useState(1);

  const adjustScale = (delta) => {
    setScale((prevScale) => Math.max(0.5, Math.min(prevScale + delta, 3)));
  };
  return (
    <div className="timeline-container">
      <div className="zoom-controls">
        <button onClick={() => adjustScale(-0.5)}>-</button>
        <button onClick={() => adjustScale(0.5)}>+</button>
      </div>

      <DateMarkers scale={scale} />


      <div className="timeline">
        {events.map((event, index) => (
          <span key={index}  >{event.name}</span>
        ))}
      </div>
    </div>
  );
};

export default Timeline;