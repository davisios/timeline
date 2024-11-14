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

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className='timeline-event'
      style={{
        left: `${startOffsetPercentage}%`,
        width: `${eventDurationPercentage}%`,
      }}
    >
      {isEditing ? (
        <input
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
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
    </div>
  );
};

export default TimelineEvent;
