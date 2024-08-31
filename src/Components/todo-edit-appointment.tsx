import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AppointmentContract } from "../contracts/AppointmentContract";


export function ToDoEditAppointment() {

    let params = useParams();
    const [appointments, setAppointments] = useState<AppointmentContract[]>([{ Appointment_Id: 0, Title: '', Description: '', Date: new Date(), UserId: '' }])
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    let navigate=useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3200/get-appointment/${params.id}`)
            .then(response => {
                setAppointments(response.data)
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            Appointment_Id: appointments[0].Appointment_Id,
            Title: appointments[0].Title,
            Description: appointments[0].Description,
            Date: appointments[0].Date,
            UserId: cookies['userid']
        },
        onSubmit: (appointment) => {
            axios.put(`http://localhost:3200/edit-appointment/${params.id}`,appointment)
            .then(()=>{
                alert("Appointment Edited Successfully")
                navigate('/dashboard')
            })
        },
        enableReinitialize: true
    })

    console.log(formik.values.Date.toString().slice(0,formik.values.Date.toString().indexOf('T')));
    return (
        <div className="text-start d-flex justify-content-center align-items-center container-fluid" style={{ height: '100vh' }}>
            <form className="bg-light p-4 mt-4 rounded-3" onSubmit={formik.handleSubmit}>
                <h3>Edit Appointment</h3>
                <dl>
                    <dt className="mb-2">Appointment Id</dt>
                    <dd><input type="number" name="Appointment_Id" value={formik.values.Appointment_Id} className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Title</dt>
                    <dd><input type="text" name="Title" className="form-control" value={formik.values.Title} onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Description</dt>
                    <dd><textarea name="Description" rows={3} cols={20} value={formik.values.Description} className="form-control" onChange={formik.handleChange}></textarea></dd>
                    <dt className="mb-2">Date</dt>
                    <dd><input type="date" name="Date" value={formik.values.Date.toLocaleString().split('T')[0]} className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-warning w-100">Save</button>
                <Link to='/dashboard' className="btn btn-danger mt-2">Cancel</Link>
            </form>
        </div>
    )
}