import Timeline from './components/Timeline';
import './App.css';
import { EventProvider } from './context/EventContext';

function App() {
  return (
    <>
      <div className='App'>
        <h1>Event Timeline</h1>
        <h3>Double Click to Edit</h3>
        <h3>Drag edges to change Start and End Date</h3>
        <EventProvider>
          <Timeline />
        </EventProvider>
      </div>
    </>
  );
}

export default App;
