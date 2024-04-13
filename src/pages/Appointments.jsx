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
    const [appointments, setAppointments] = useState([]);
    const [appointmentsDay, setAppointmentsDay] = useState([]);
    const businessStartTime = '09:00';
    const businessEndTime = '17:00';
    const [date, setDate] = useState({});

    //TODO:
    // add addition appointment after check 
    //css to the page

    useEffect(() => {
        if (value)
            fetchAppointmentDay(value)
    }, [value]);

    useEffect(() => {
        fetchAppointment();
    }, []);

    const fetchAppointmentDay = (newValue) => {
        console.log({ newValue });
        let date = new Date(newValue),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day

        setDate([year, month, day].join('-'));
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

    const sendEmailToCheck = async ( newDate, dayOfWeek, startTime, endTime) => {
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
                      <p>Your appointment scheduled for:</p>
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
                <AppointmentCardEdit addLink={addLink} fetchAppointment={fetchAppointment}
                    appointments={appointments} setAppointments={setAppointments} />
            ) : (
                <div className='AppointmentContainer'>
                    <div id='calenderDiv'>
                        <h1>Appointment</h1>
                        <h3> Opening Hours: {businessStartTime}-{businessEndTime}</h3>
                        <div id='card'>
                        <Calendar className="dark:text-white dark:bg-black" style={{ border:"1.5px solid white", boxShadow:"1px 2px 3px 2px white"}}
                        onChange={onChange} value={value} />
                        </div>
                        {/* <CalenderComponents value={value.toJSON().substring(0,10)} /> */}
                        <button onClick={addLink} type="button" className="btn btn-primary">
                            {isClick ? "Cancel" : "Add Appointment"}</button>
                    </div>
                    <div id='appointmentContainer'>
                        {
                            <AppointmentCard items={appointmentsDay}
                                sendEmailToCheck={sendEmailToCheck} date={date} />
                        }
                    </div>
                </div>
            )
            }
        </div>
    )
}
