import axios from "axios";
import { response } from "express";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function ToDoLogin() {

    const navigate = useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(['userid']);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (user) => {
            axios.get(`http://localhost:3200/users`)
                .then(response => {
                    var client = response.data.find((item: any) => item.UserId === user.UserId)
                    if (client) {
                        if (client.Password === user.Password) {
                            setCookie('userid',user.UserId);
                            navigate("/dashboard")
                        }
                        else
                        {
                            alert("Invalid Password");
                        }
                    }else{
                        alert("User Not Found")
                    }

                })
        }
    })

    return (
        <div className="text-start d-flex justify-content-center align-items-center container-fluid" style={{ height: '100vh' }}>
            <form className="bg-light p-3 rounded-3" onSubmit={formik.handleSubmit}>
                <h4 className="text-center">USER LOGIN</h4>
                <hr />
                <dl>
                    <dt className="mb-2">UserId</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="w-100 btn btn-primary">Login</button>
                <div className="mt-3">
                    <Link to='/register'>New User Register</Link>
                </div>
            </form>

        </div>
    )
}