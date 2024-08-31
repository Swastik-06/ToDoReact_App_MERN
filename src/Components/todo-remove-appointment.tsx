import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";

export function ToDoRemoveAppointment() {

    let params = useParams()
    const [appointments, setAppointments] = useState<AppointmentContract[]>([{ Appointment_Id: 0, Title: '', Description: '', Date: new Date(), UserId: '' }])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3200/get-appointment/${params.id}`)
            .then(response => {
                setAppointments(response.data)
            })
    }, [])

    function handleDeleteClick() {
        axios.delete(`http://localhost:3200/delete-appointment/${params.id}`)
            .then(() => {
                alert("Delete Appointment")
                navigate('/dashboard')
            })
    }

    return (
        <div className="text-start d-flex justify-content-center align-items-center container-fluid">
            <div className="bg-light p-4 mt-4 rounded-3">
                <h3>Remove Appointment</h3>
                <dl>
                    <dt>Title</dt>
                    <dd>{appointments[0].Title}</dd>
                    <dt>Description</dt>
                    <dd>{appointments[0].Description}</dd>
                    <dt>Date</dt>
                    <dd>{appointments[0].Date.toLocaleString().split('T')[0]}</dd>
                </dl>
                <button className="btn btn-success me-2 w-25" onClick={handleDeleteClick}>Yes</button>
                <Link to='/dashboard' className="btn btn-danger w-25">No</Link>
            </div>

        </div>
    )
}