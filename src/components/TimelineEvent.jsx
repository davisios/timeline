import { useState } from 'react';
import './TimelineEvent.css';
import { useEvents } from '../context/EventContext';

const TimelineEvent = ({ event, minDate, maxDate }) => {
  const { name, start, end } = event;
  const [isEditing, setIsEditing] = useState(false);
  const { updateEvent } = useEvents();
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calculate total timeline duration in days
  const totalTimelineDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
  // Calculate event start position and duration as percentages of the total timeline
  const startOffsetPercentage =
    ((startDate - minDate) / (1000 * 60 * 60 * 24) / totalTimelineDays) * 100;
  const eventDurationPercentage =
    ((endDate - startDate) / (1000 * 60 * 60 * 24) / totalTimelineDays) * 100;

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
        left: `${startOffsetPercentage}%`,
        width: `${eventDurationPercentage}%`,
      }}
    >
      <button
        className='resize-button'
        onMouseDown={handleResizeLeft}
      >
        <span>||</span>
      </button>

      {isEditing ? (
        <input
          className='timeline-event-input'
          type='text'
          value={name}
          onChange={handleNameChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span style={{ overflow: 'hidden' }}>{name}</span>
      )}
      <button
        className='resize-button'
        onMouseDown={handleResizeRight}
      >
        <span>||</span>
      </button>
    </div>
  );
};

export default TimelineEvent;
