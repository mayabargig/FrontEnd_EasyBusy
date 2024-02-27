import React, { useEffect, useState, useContext } from 'react'
import AppointmentCard from '../components/AppointmentCard'
import { APIBaseUrl } from '../config';
import { UserContext } from '../context/User';
import AppointmentCardEdit from '../components/AppointmentCardEdit';
import { PlusCircleFill, Backspace } from 'react-bootstrap-icons';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import CalenderComponents from '../components/CalenderComponents';

export default function Appointments() {
    const { user } = useContext(UserContext);
    const [isClick, setClick] = useState(false);
    const [value, onChange] = useState(new Date());
    // const myCalendar = React.useRef();
    const [appointments, setAppointments] = useState([]);
    const [appointmentsDay, setAppointmentsDay] = useState([]);
    const businessStartTime = '09:00';
    const businessEndTime = '17:00'

    useEffect(() => {
        fetchAppointment()
        if (value)
            fetchAppointmentDay(value)
    }, [value]);

    useEffect(() => {
        fetchAppointment();
    }, []);

    const fetchAppointmentDay = (newValue) => {
        console.log({ newValue });
        // newValue.setDate(newValue.getDate() + 1)
        // let date = newValue.toJSON().substring(0, 10).replace(/-/g, "/");
        let date = new Date(newValue),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day

        console.log([year, month, day].join('-'));
        fetch(`${APIBaseUrl}/appointment/?date=${[year, month, day].join('-')}`)
            .then(res => res.json())
            .then(res => {
                setAppointmentsDay(res);
                console.log(res);
            })
            .catch(err => console.log(err))
    };

    console.log(appointmentsDay);

    const fetchAppointment = () => {
        fetch(`${APIBaseUrl}/appointment`)
            .then(res => res.json())
            .then(res => {
                setAppointments(res);
                console.log(res);
            })
            .catch(err => console.log(err))
    };

    const sendEmailToCheck = async (item, newDate, dayOfWeek, startTime, endTime) => {
        // console.log(item,newDate,dayOfWeek);
        try {
            const response = await fetch(`${APIBaseUrl}/appointment/sendEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: `${user.email}`,
                    subject: 'New Appointment',
                    message: `<h2>Hello ${user.firstName}</h2>
                      <h4> Thank u for choose our business</h4>
                      <p>Your ${item.title} appointment scheduled for:</p>
                      <p>${dayOfWeek}, ${newDate}: ${startTime}-${endTime}</p>
                      We will be glad to see you :)` })
            });
            if (response.ok) {
                alert("Message Sent Successfully");
            } else {
                alert("Message Failed to Send");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addLink = () => {
        setClick(!isClick);
    };

    return (
        <div className='AppointmentContainer'>
            {isClick ? (
                <AppointmentCardEdit addLink={addLink}
                    appointments={appointments} setAppointments={setAppointments} />
            ) : (
                <div className='AppointmentContainer'>
                    <div>
                        <h1>Appointment</h1>
                        <h3> Opening Hours: {businessStartTime}-{businessEndTime}</h3>
                        {/* <div id='card'> */}
                        <Calendar onChange={onChange} value={value} />
                        {/* </div> */}
                        {/* <CalenderComponents value={value.toJSON().substring(0,10)} /> */}
                        <button onClick={addLink} type="button" className="btn btn-primary">
                            {isClick ? "Cancel" : "Add Appointment"}</button>
                    </div>
                    <div id='appointmentContainer'>
                        {
                            // appointmentsDay.map((item, i) => {
                            // return 
                            <AppointmentCard items={appointmentsDay}
                                sendEmailToCheck={sendEmailToCheck} />
                            // })
                        }
                    </div>
                </div>
            )
            }
        </div>
    )
}
