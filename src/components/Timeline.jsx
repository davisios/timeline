import { useMemo, useState } from 'react';
import { useEvents } from '../context/EventContext';
import './Timeline.css';
import DateMarkers from './DateMarkers';
const Timeline = () => {
  const { events } = useEvents();
  const [scale, setScale] = useState(1);

  const adjustScale = (delta) => {
    setScale((prevScale) => Math.max(0.5, Math.min(prevScale + delta, 3)));
  };

  const lanes = useMemo(() => {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    return sortedEvents.reduce((acc, event) => {
      let placed = false;
      for (const lane of acc) {
        if (new Date(event.start) >= new Date(lane[lane.length - 1].end)) {
          lane.push(event);
          placed = true;
          break;
        }
      }
      if (!placed) {
        acc.push([event]);
      }
      return acc;
    }, []);
  }, [events]);
  return (
    <div className="timeline-container">
      <div className="zoom-controls">
        <button onClick={() => adjustScale(-0.5)}>-</button>
        <button onClick={() => adjustScale(0.5)}>+</button>
      </div>

      <DateMarkers scale={scale} />


      <div className="timeline">
        {lanes.map((lane, laneIndex) => (
          <div key={laneIndex} className="timeline-lane">
            {lane.map((event, eventIndex) => (
              <span>{event.name}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;