import { React, useContext, useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/User';
import { APIBaseUrl } from '../config';
import { Input, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { PencilSquare, Trash3Fill, ArrowLeftSquare } from 'react-bootstrap-icons';

export default function AppointmentCardEdit(props) {
    const { addLink, appointments, setAppointments } = props;
    const [editableId, setEditableId] = useState(null);
    const { user, token } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isClick, setClick] = useState(false);
    const format = 'HH:mm';
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        if (user.role === "regular") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, []);

    const handleEdit = (id) => {
        setEditableId(id);
    };

    const handleSave = async (id) => {
        try {
            const updatedAppointments = appointments.map((appointment) => {
                if (appointment.id === id) {
                    return { ...appointment, /* updated fields */ };
                }
                return appointment;
            });

            const res = await fetch(`${APIBaseUrl}/appointments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAppointments.find((appointment) => appointment.id === id)),
            });

            if (res.status === 200) {
                setAppointments(updatedAppointments);
                setEditableId(null);
            } else {
                console.error('Failed to update appointment');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setEditableId(null);
    };

    const addClick = () => {
        setClick(!isClick);
    };

    const handleInputChange = (name, value) => {
        /** @type {string[]} */
        const spreadName = name?.split('.')
        if (spreadName?.length > 1) {
            setFormData(prev => ({ ...prev, [spreadName[0]]: { ...(prev?.[spreadName[0]] || {}), [spreadName[1]]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const addAppointments = async () => {
        console.log(formData);
        try {
            const res = await fetch(`${APIBaseUrl}/appointment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData, user)
            });
            const data = await res.json();
            setAppointments([...appointments, data.data]);
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const deleteAppointment = async (id) => {
        console.log(id);
        try {
            const res = await fetch(`${APIBaseUrl}/appointment/${id}`, {
                method: "DELETE"
            });
            if (res.status === 200) {
                const filtered = appointments.filter((item) => {
                    return item.id !== id;
                });
                setAppointments([...filtered]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id='tableContainer'>
            <button onClick={addClick} type="button" className="btn btn-primary">Add</button>
            <button onClick={addLink} type="button" className="btn btn-warning">Go Back <ArrowLeftSquare /></button>
            {
                appointments ? (

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Appointment</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time </th>
                                {
                                    isAdmin ? (
                                        <th>Client Name</th>
                                    ) : null
                                }
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.title}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.timeSlot.start}</td>
                                    <td>{appointment.timeSlot.end}</td>
                                    {
                                        isAdmin ? (
                                            <td>{appointment.userName}</td>
                                        ) : null
                                    }
                                    <td>
                                        {isAdmin && editableId !== appointment.id ? (
                                            <Button onClick={() => handleEdit(appointment.id)}>Edit <PencilSquare /></Button>
                                        ) : editableId === appointment.id ? (
                                            <>
                                                <Button onClick={() => handleSave(appointment.id)}>Save</Button>
                                                <Button onClick={handleCancel}>Cancel</Button>
                                            </>
                                        ) : null}
                                        <button onClick={() => deleteAppointment(appointment.id)} type="button" className="btn btn-danger">Delete<Trash3Fill /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {isClick ? (
                            <tbody>
                                <tr>
                                    <td><Input placeholder='Title' name="title"
                                        onChange={(e) => handleInputChange("title", e.target.value)} /></td>
                                    <td><Input placeholder='Date' name="date" type="date"
                                        onChange={(e) => handleInputChange("date", e.target.value)} /></td>
                                    <td>
                                        <TimePicker defaultValue={dayjs('00:00', format)} format={format} onChange={(value) => handleInputChange('timeSlot.start', value.format(format))} />
                                    </td>
                                    <td>
                                        <TimePicker defaultValue={dayjs('00:00', format)} format={format} onChange={(value) => handleInputChange('timeSlot.end', value.format(format))} />
                                    </td>
                                    <td><Input placeholder='Client Name' name="userName"
                                        onChange={(e) => handleInputChange("userName", e.target.value)} /></td>
                                    <td>
                                        <Button onClick={addAppointments}>Add</Button>
                                        <Button onClick={addClick}>Cancel</Button>
                                    </td>
                                </tr>
                            </tbody>) : null}
                    </Table>
                ) : null
            }
        </div>
    )
}
