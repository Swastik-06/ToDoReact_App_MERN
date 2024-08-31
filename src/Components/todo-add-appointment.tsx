import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function ToDoAddAppointment()
{

    const navigate=useNavigate()
    const[cookies,setCookie,removeCookie]=useCookies(['userid'])

    const formik=useFormik({
        initialValues:{
            Appointment_Id:0,
            Title:'',
            Description:'',
            Date:'',
            UserId:cookies['userid']
        },
        onSubmit:(appointment)=>{
            axios.post(`http://localhost:3200/add-appointment`,appointment)
            .then(()=>{
                alert("Appointment Added Successfully")
                navigate("/dashboard")
            })
        }
    })

    return(
        <div className="text-start d-flex justify-content-center align-items-center container-fluid" style={{ height: '100vh' }}>
            <form action="" className="bg-light p-3 mt-4 rounded-3" onSubmit={formik.handleSubmit}>
                <h3>Add New Appointment</h3>
                <dl>
                    <dt className="mb-2">Appointment Id</dt>
                    <dd><input type="number" name="Appointment_Id" id="" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Title</dt>
                    <dd><input type="text" name="Title" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Description</dt>
                    <dd><textarea name="Description" id="" rows={3} cols={20} className="form-control" onChange={formik.handleChange}></textarea></dd>
                    <dt className="mb-2">Date</dt>
                    <dd><input type="date" name="Date" id="" className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100 mb-4">Add Appointment</button>
                <Link to='/dashboard' className="mt-4">Go To Dashboard</Link>
            </form>
            
        </div>
    )
} 