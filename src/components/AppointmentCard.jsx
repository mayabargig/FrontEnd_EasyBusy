import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Clock, Bell, BellSlash } from "react-bootstrap-icons";

function findAvailableTimeSlots(occupiedAppointments, businessStartTime, businessEndTime, appointmentDuration)
// : Array<{ startTime: string, endTime: string }> 
{
  const availableTimeSlots = [];
  let currentTime = new Date(`2000-01-01T${businessStartTime}`);
  const endTimeObj = new Date(`2000-01-01T${businessEndTime}`);

  while (currentTime < endTimeObj) {
    const currentEndTime = new Date(currentTime.getTime() + appointmentDuration * 60000);
    let isOccupied = false;
    for (let i = 0; i < occupiedAppointments.length; i++) {
      const { startTime, endTime } = occupiedAppointments[i];
      if (currentTime >= new Date(`2000-01-01T${startTime}`) && currentEndTime <= new Date(`2000-01-01T${endTime}`)) {
        isOccupied = true;
        break;
      }
    }
    if (!isOccupied) {
      const startTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTimeStr = currentEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      availableTimeSlots.push({ startTime: startTimeStr, endTime: endTimeStr });
    }
    currentTime = new Date(currentTime.getTime() + appointmentDuration * 60000);
  }
  return availableTimeSlots;
}

export default function AppointmentCard(props) {
  const { sendEmailToCheck } = props;
  /** @type {{timeSlot : { start:string,end:string}}[]} */
  const items
    // : { timeSlot: { start: string, end: string } }[]
    = props.items
  // const date = items.date;
  const dateObj = new Date();
  const [isMatch, setIsMatch] = useState(true);
  const businessStartTime = '09:00';
  const businessEndTime = '17:00';
  const appointmentDuration = 120
  const [availableTimeSlots, setAvailableTimeSlots] = useState 
  // < Array < { startTime: string, endTime: string } >>
   ([]);
  const occupiedAppointments = items.map(i => ({
    startTime: i.timeSlot.start,
    endTime: i.timeSlot.end
  }))
  // const boolean = availableTimeSlots.some(appointment => appointment.startTime === item.timeSlot.start && appointment.endTime === item.timeSlot.end)

  console.log(availableTimeSlots);

  // const newDate = dateObj.toLocaleDateString('en-GB', {
  //   day: '2-digit',
  //   month: '2-digit',
  //   year: 'numeric',
  // }
  // );

  const dayOfWeek = dateObj.toLocaleDateString('en-GB', {
    weekday: 'long',
  });


  useEffect(() => {
    const slots = findAvailableTimeSlots(occupiedAppointments, businessStartTime,
      businessEndTime, appointmentDuration);
    setAvailableTimeSlots(slots);
  }, []);


  console.log(isMatch);

  return (
    <div>
      {

        availableTimeSlots.map((hours) => (
          <div className="card text-white bg-success mb-3" key={`${hours.startTime}-${hours.endTime}`}
            style={{ minWidth: 10 + "rem", minHeight: 10 + "rem" }}>
            <div className="card-header">Available Appointment <Bell /></div>
            <div className="card-body">
              <h5 className="card-title">At {dayOfWeek}, </h5>
              <p className="card-text">Hours: {hours.startTime}-{hours.endTime}</p>
              {/* <Button onClick={() => { sendEmailToCheck(item, newDate, dayOfWeek, hours.startTime, hours.endTime) }}>
                Check Appointment <Clock /></Button> */}
            </div>
          </div>
        ))
      }
      {
        true ? (
          <div className="card text-white bg-danger mb-3" style={{ minWidth: 18 + "rem", minHeight: 13 + "rem" }}>
            <div className="card-header">Unavailable Appointment <BellSlash /></div>
            <div className="card-body">
              <h5 className="card-title">At {dayOfWeek}, {'fix new Date'}</h5>
              <p className="card-text">Hours:  </p>
              {/* {item.timeSlot.start}-{item.timeSlot.end}</p> */}
              <p className="card-text">Check Appointment: </p>
              {/* {item.title} <Clock /></p> */}
            </div>
          </div>
        ) : null
      }
    </div>
  );
}
