# Timeline Event Management

This project provides a timeline-based UI for displaying and managing events. It allows users to interactively resize and edit events directly on a visual timeline, with scalable date markers and a responsive layout.

I tried to make it look like a event timeline calendar, however that approach would take more time. The main idea was to have a horizontal line to display the dates where the events where schedule and the multiple lines below, to show all the events. I got block in the design due the way I get size for the date markers and the bars. If I had more time I would have added a minWidth for the elements so we could resize them better and make it take 100% of the view.

# Time Spent 

5 to 6 hours

## Features

- **Interactive Resizing**: Users can resize events by dragging the left or right edges this will update the start or end date accordingly.
- **Editable Event Names**: Double-click on any event to edit its name.
- **Date Markers**: Date markers are generated dynamically based on the events' start and end dates.
- **State Management**: Event data is managed using React Context and updates are reflected across the application in real-time.

## Technologies Used

- **React**: For the user interface and component-based structure.
- **Context API**: To manage global state (event data) and pass down props.
- **CSS**: Custom styles for the timeline layout and event handling.
- **JavaScript**: ES6+ for all functionality, including event management and resizing logic.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/davisios/timeline.git

2. cd timeline

3. npm install

4. npm run dev

5. open http://localhost:5173/ 

## Nice to have (next steps)
- right typescrypt support as I did not add it
- Adding new events
- Deletion of events
- Add custom colors to event bar
- TimeLine component full width
- Adding extra fields to the events like description
- Have a hover effect, to show the event information when you hover it
- zoom functionality to be more user friendly

