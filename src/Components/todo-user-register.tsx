import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as yup from 'yup';


export function ToDoRegister() {


    const navigate=useNavigate()

    const formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        validationSchema:yup.object({
            UserId:yup.string().required("UserId Required").min(4,"UserId too short"),
            UserName:yup.string().required("UserName Required").min(4,"UserName too short"),
            Password:yup.string().required("Password Required").min(6,"Password too Short minimum 6 digits").max(8),
            Email:yup.string().email().required("Email Required"),
            Mobile:yup.string().required("Mobile Required").matches(/\+91\d{10}/,"Invalid Mobile")
        }),
        onSubmit:(user)=>{
            axios.post('http://localhost:3200/register-user',user)
            .then(()=>{
                alert('Register Successfully')
                navigate('/login')
            })
        }
    })

    return (
        <div className="text-start d-flex justify-content-center align-items-center">
            <form className="bg-light p-3 mt-4 rounded-3" onSubmit={formik.handleSubmit}>
                <h3 className="text-center mb-4 text-danger">USER REGISTER</h3>
                <hr />
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.UserId}</dd>
                    <dt>UserName</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.UserName}</dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Password}</dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Email}</dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Mobile}</dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Register</button>
                <Link to='/' className="me-4">Home</Link>
                <Link to='/login' className="mt-2">Already Have An Account</Link>
            </form>
        </div>
    )
}