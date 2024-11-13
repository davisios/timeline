import { createContext, useState, useContext } from 'react';
import  timelineItems  from '../timelineItems';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(timelineItems);

  // Function to update event 
  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
