import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";


export function ToDoUserDashBoard() {

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [appointments, setAppointments] = useState<AppointmentContract[]>()
    const navigate = useNavigate()

    function handleSignOut() {
        removeCookie("userid");
        navigate("/login")
    }

    useEffect(() => {
        axios.get(`http://localhost:3200/appointments/${cookies['userid']}`)
            .then(response => {
                setAppointments(response.data)
            })
    }, [])
    return (
        <div className="p-2">
            <nav className="d-flex justify-content-around mt-4 ">
                <div className="h3 text-dark bg bg-light rounded-3">{cookies['userid']} User Dashboard</div>
                <div className="ms-4"><button className="btn btn-danger" onClick={handleSignOut}>Logout</button></div>
            </nav>
            <section className="text-start d-flex justify-content-center align-items-center" style={{ height: '15vh' }}>
                <div>
                    <Link to='/add-appointment' className="bi bi-calendar-date btn btn-warning fw-bold"> Add Appointment</Link>
                </div>
            </section>
            <section>
                <div>{appointments?.map(appointment =>
                    <div key={appointment.Appointment_Id} className="alert alert-success w-50 text-start d-flex justify-content-between m-2">
                        <div>
                            <h3>{appointment.Title}</h3>
                            <p>{appointment.Description}</p>
                            <div className="bi bi-calendar-date"> { appointment.Date.toLocaleString().split('T')[0]}</div>
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                            <Link to={`/edit-appointment/${appointment.Appointment_Id}`} className="bi bi-pen-fill btn btn-warning">Edit</Link>
                            <Link to={`/remove-appointment/${appointment.Appointment_Id}`} className="bi bi-trash btn btn-danger w-100 ">Remove</Link>
                        </div>
                    </div>
                )}</div>
            </section>

        </div>
    )
}