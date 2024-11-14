import { useState } from 'react';
import './TimelineEvent.css';
import { useEvents } from '../context/EventContext';

const TimelineEvent = ({ event, scale, minDate }) => {
  const { name, start, end } = event;
  const [isEditing, setIsEditing] = useState(false);
  const { updateEvent } = useEvents();
  const startDate = new Date(start);
  const endDate = new Date(end);

  const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const startOffset = (startDate - minDate) / (1000 * 60 * 60 * 24) + 0.3;

  const handleNameChange = (e) => {
    updateEvent({
      ...event,
      name: e.target.value,
    });
  };

  const handleBlur = () => setIsEditing(false);

  // Helper function to calculate days from width based on scale
  const calculateDaysFromWidth = (width) => Math.round(width / (scale * 16));

  // Helper function to update event dates
  const updateEventDate = (updatedStartDate, updatedEndDate) => {
    const format = (date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;

    updateEvent({
      ...event,
      start: format(updatedStartDate),
      end: format(updatedEndDate),
    });
  };

  const handleResizeLeft = (e) => {
    const initialWidth = e.clientX;
    const initialStartDate = new Date(startDate);

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialWidth;
      const daysMoved = calculateDaysFromWidth(deltaX);

      const newStartDate = new Date(initialStartDate);
      newStartDate.setDate(newStartDate.getDate() + daysMoved);

      updateEventDate(newStartDate, endDate);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Handle resizing from the right side
  const handleResizeRight = (e) => {
    const initialWidth = e.clientX;
    const initialEndDate = new Date(endDate);

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialWidth;
      const daysMoved = calculateDaysFromWidth(deltaX);

      const newEndDate = new Date(initialEndDate);
      newEndDate.setDate(newEndDate.getDate() + daysMoved);

      updateEventDate(startDate, newEndDate);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className='timeline-event'
      style={{
        left: `${startOffset * scale + 0.1}rem`,
        width: `${duration * scale * 16}px`,
      }}
    >
      <button className='resize-button' onMouseDown={handleResizeLeft}>
        <span>||</span>
      </button>

      {isEditing ? (
        <input
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          type='text'
          value={name}
          onChange={handleNameChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span style={{ overflow: 'hidden' }}>{name}</span>
      )}
      <button className='resize-button' onMouseDown={handleResizeRight}>
        <span>||</span>
      </button>
    </div>
  );
};

export default TimelineEvent;
