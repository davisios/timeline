import { useDroppable } from '@dnd-kit/core';
import './DateMarkers.css';
import { useEvents } from '../context/EventContext';




const DateMarkers = ({ scale }) => {
  const { events } = useEvents();
  const startDates = events.map((event) => new Date(event.start));
  const endDates = events.map((event) => new Date(event.end));
  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  const numDays = (maxDate - minDate) / (1000 * 60 * 60 * 24) + 1;

  const dateMarkersArr = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(minDate);
    date.setDate(minDate.getDate() + i);
    return {
      label: `${date.getMonth() + 1}/${date.getDate()}`, // Format MM/DD
      index: i,
    };
  });

  return (
    <div className="date-axis">
      {dateMarkersArr.map(({ label, index }) => {
        const positionPercentage = (index / (numDays - 1)) * 100;
        return (
          <div
            key={index}
            className="date-marker"
            style={{ left: `${positionPercentage}%` }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
  
};

export default DateMarkers;
