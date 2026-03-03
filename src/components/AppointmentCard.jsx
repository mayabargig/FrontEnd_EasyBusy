import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Clock, Bell, BellSlash, Shield } from "react-bootstrap-icons";

function findAvailableTimeSlots(businessStartTime, businessEndTime, appointmentDuration)
{
  const availableTimeSlots = [];
  let currentTime = new Date(`2000-01-01T${businessStartTime}`);
  const endTimeObj = new Date(`2000-01-01T${businessEndTime}`);

  while (currentTime < endTimeObj) {
    const currentEndTime = new Date(currentTime.getTime() + appointmentDuration * 60000);
    const startTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTimeStr = currentEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    availableTimeSlots.push({ startTime: startTimeStr, endTime: endTimeStr });
    // }
    currentTime = new Date(currentTime.getTime() + appointmentDuration * 60000);
  }
  return availableTimeSlots;
}

export default function AppointmentCard(props) {
  const { sendEmailToCheck } = props;
  /** @type {{timeSlot : { start:string,end:string}}[]} */
  const items
    = props.items
  const { date }= props
  const dateObj = new Date();
  const [isMatch, setIsMatch] = useState(true);
  const businessStartTime = '09:00';
  const businessEndTime = '17:00';
  const appointmentDuration = 120
  const [availableTimeSlots, setAvailableTimeSlots] = useState
    ([]);
  const occupiedAppointments = items.map(i => ({
    startTime: new Date(`2000-01-01T${i?.timeSlot?.start}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date(`2000-01-01T${i?.timeSlot?.end}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }))

  const dayOfWeek = dateObj.toLocaleDateString('en-GB', {
    weekday: 'long',
  });

  useEffect(() => {
    const slots = findAvailableTimeSlots(businessStartTime,
      businessEndTime, appointmentDuration);
    setAvailableTimeSlots(slots);
  }, []);

  return (
    <div>
      {
        availableTimeSlots.map((hours) => (
          <div key={`${hours.startTime}-${hours.endTime}`}>
            {occupiedAppointments?.some(i => i?.startTime == hours?.startTime) ?
              <div className="card text-white bg-danger mb-3" style={{ minWidth: 10 + "rem", minHeight: 8 + "rem" }}>
                <div className="card-header" style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                  Unavailable Appointment <BellSlash /></div>
                <div className="card-body">
                  <h6 className="card-title">At {dayOfWeek}</h6>
                  <p className="card-text">Hours: {hours.startTime}-{hours.endTime}</p>
                </div>
              </div>
              :
              <div id='available' className="card text-white bg-success mb-3"
                style={{ minWidth: 10 + "rem", minHeight: 8 + "rem" }}>
                <div className="card-header" style={{display:'flex', flexDirection:'row', alignItems:'center'}} >Available <Bell /> 
                <Button onClick={() => { sendEmailToCheck( date, dayOfWeek, hours.startTime, hours.endTime) }}
                style={{display:'flex', flexDirection:'row'}} >
                Check <Clock /></Button>
                </div>
                <div className="card-body">
                  <h6 className="card-title">At {dayOfWeek}, {date}</h6>
                  <p className="card-text">Hours: {hours.startTime}-{hours.endTime}</p>
                </div>
              </div>


            }
          </div>
        ))
      }
    </div>
  );
}
