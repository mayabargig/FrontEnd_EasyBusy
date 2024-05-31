import { React, useContext, useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/User';
import { APIBaseUrl } from '../config';
import { Input, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { PencilSquare, Trash3Fill, ArrowLeftSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AppointmentCardEdit(props) {
    const { addLink, appointments, setAppointments, fetchAppointment } = props;
    const [editableId, setEditableId] = useState(null);
    const { user, token } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isClick, setClick] = useState(false);
    const format = 'HH:mm';
    const [formData, setFormData] = useState([]);
    const navigate = useNavigate();
    const [updateAppointment, setUpdateAppointment] = useState({});
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        if (user.role === "admin") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, []);

    // useEffect(() => {
    //     console.log(appointments);
    // }, [appointments]);

    const handleEdit = (id) => {
        setEditableId(id);
    };

    const handleSave = async (id) => {
        console.log(updateAppointment);
        try {
            const data = await axios.patch(`${APIBaseUrl}/appointment/${id}`,
                updateAppointment
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

            if (res.status === 200) {
                setAppointment(data);
                setEditableId(null);
                fetchAppointment();
                console.log(appointments);
                // navigate('/appointment')
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
        console.log(name, value);
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
            const res = await axios.post(`${APIBaseUrl}/appointment`, JSON.parse(JSON.stringify(formData, user)),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = res.data;
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
            const res = await axios.delete(`${APIBaseUrl}/appointment/${id}`);
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

    const handleBlur = (field, value) => {
        const spreadName = field?.split('.')
        if (spreadName?.length > 1) {
            setUpdateAppointment(prev => ({ ...prev, [spreadName[0]]: { ...(prev?.[spreadName[0]] || {}), [spreadName[1]]: value } }));
        } else {
            setUpdateAppointment(prev => ({ ...prev, [field]: value }))
        }
    };


    return (
        <div id='tableContainer' className=' dark:text-white dark:bg-black'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={addClick} type="button" className="btn btn-primary">Add</button>
                <button style={{ display: 'flex', flexDirection: 'row' }} onClick={addLink} type="button" className="btn btn-warning">Back <ArrowLeftSquare /></button>
            </div>
            {
                (appointments) ? (

                    <Table striped bordered hover className=' dark:text-white dark:bg-black'>
                        <thead className=' dark:text-white dark:bg-black'>
                            <tr className=' dark:text-white dark:bg-black'>
                                <th className=' dark:text-white dark:bg-black'>Appointment</th>
                                <th className=' dark:text-white dark:bg-black'>Date</th>
                                <th className=' dark:text-white dark:bg-black'>Start Time</th>
                                <th className=' dark:text-white dark:bg-black'>End Time </th>
                                {
                                    isAdmin ? (
                                        <th className=' dark:text-white dark:bg-black'>Client Name</th>
                                    ) : null
                                }
                                <th className=' dark:text-white dark:bg-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => {
                                return <tr key={appointment._id} className=' dark:text-white dark:bg-black'>
                                    <td className=' dark:text-white dark:bg-black'
                                        contentEditable={editableId === appointment.id}
                                        onBlur={(e) => handleBlur("title", e.target.innerText)}
                                    >
                                        {appointment.title}</td>
                                    <td className=' dark:text-white dark:bg-black'
                                        contentEditable={editableId === appointment.id}
                                        onBlur={(e) => handleBlur("date", e.target.innerText)}
                                    >
                                        {appointment.date}</td>
                                    <td className=' dark:text-white dark:bg-black'
                                        contentEditable={editableId === appointment.id}
                                        onBlur={(e) => handleBlur("timeSlot.start", e.target.innerText)}
                                    >
                                        {appointment.timeSlot.start}</td>
                                    <td className=' dark:text-white dark:bg-black'
                                        contentEditable={editableId === appointment.id}
                                        onBlur={(e) => handleBlur("timeSlot.end", e.target.innerText)}
                                    >
                                        {appointment.timeSlot.end}</td>
                                    {
                                        isAdmin ? (
                                            <td className=' dark:text-white dark:bg-black'
                                                contentEditable={editableId === appointment.id}
                                                onBlur={(e) => handleBlur("userName", e.target.innerText)}
                                            >
                                                {appointment.userName}</td>
                                        ) : null
                                    }
                                    <td className=' dark:text-white dark:bg-black'>
                                        {isAdmin && editableId !== appointment.id ? (
                                            <>
                                                <Button onClick={() => handleEdit(appointment.id)}>Edit <PencilSquare /></Button>
                                                <button onClick={() => deleteAppointment(appointment.id)} type="button" className="btn btn-danger">Delete<Trash3Fill /></button>
                                            </>
                                        ) : editableId === appointment.id ? (
                                            <>
                                                <Button onClick={() => handleSave(appointment.id)}>Save</Button>
                                                <Button onClick={handleCancel}>Cancel</Button>
                                            </>
                                        ) : null}
                                    </td>
                                </tr>
                            }
                            )}
                        </tbody>
                        {isClick ? (
                            <tbody className=' dark:text-white dark:bg-black'>
                                <tr className=' dark:text-white dark:bg-black'>
                                    <td className=' dark:text-white dark:bg-black'><Input placeholder='Title' name="title"
                                        onChange={(e) => handleInputChange("title", e.target.value)} /></td>
                                    <td className=' dark:text-white dark:bg-black'><Input placeholder='Date' name="date" type="date"
                                        onChange={(e) => handleInputChange("date", e.target.value)} /></td>
                                    <td className=' dark:text-white dark:bg-black'>
                                        <TimePicker defaultValue={dayjs('00:00', format)} format={format} onChange={(value) => handleInputChange('timeSlot.start', value.format(format))} />
                                    </td>
                                    <td className=' dark:text-white dark:bg-black'>
                                        <TimePicker defaultValue={dayjs('00:00', format)} format={format} onChange={(value) => handleInputChange('timeSlot.end', value.format(format))} />
                                    </td>
                                    <td className=' dark:text-white dark:bg-black'><Input placeholder='Client Name' name="userName"
                                        onChange={(e) => handleInputChange("userName", e.target.value)} /></td>
                                    <td className=' dark:text-white dark:bg-black'>
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
