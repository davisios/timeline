import './TimelineEvent.css';

const TimelineEvent = ({ event, minDate, maxDate }) => {
  const { name, start, end } = event;
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calculate total timeline duration in days
  const totalTimelineDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
  // Calculate event start position and duration as percentages of the total timeline
  const startOffsetPercentage =
    ((startDate - minDate) / (1000 * 60 * 60 * 24) / totalTimelineDays) * 100;
  const eventDurationPercentage =
    ((endDate - startDate) / (1000 * 60 * 60 * 24) / totalTimelineDays) * 100;

  return (
    <div
      className='timeline-event'
      style={{
        left: `${startOffsetPercentage}%`,
        width: `${eventDurationPercentage}%`,
      }}
    >
      <span style={{ overflow: 'hidden' }}>{name}</span>
    </div>
  );
};

export default TimelineEvent;
