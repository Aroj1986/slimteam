import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import './myCalendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Enter a title for your appointment:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleEdit = ({ id, title }) => {
    const newTitle = window.prompt('Enter a new title for your appointment:', title);
    if (newTitle) {
      const updatedEvents = events.map((event) => {
        if (event.id === id) {
          return { ...event, title: newTitle };
        }
        return event;
      });
      setEvents(updatedEvents);
      setEditingEvent(null);
    }
  };

  const handleDelete = ({ id }) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleEventSelect = (event) => {
    setEditingEvent(event);
  };

  const eventPropGetter = ({ id }) => {
    const editing = editingEvent && id === editingEvent.id;
    return {
      className: editing ? 'editing' : '',
    };
  };

  return (
    <div className="hey">
      <DatePicker

        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      <Calendar
      className="calender-styling"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
        eventPropGetter={eventPropGetter}
      />
      {editingEvent && (
        <div className="event-editor">
          <h3>Edit Event</h3>
          <p>Title: {editingEvent.title}</p>
          <button className="edit-button" onClick={() => handleEdit(editingEvent)}>Edit</button>
          <button className="delete-button" onClick={() => handleDelete(editingEvent)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
