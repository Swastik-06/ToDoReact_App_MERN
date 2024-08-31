import { Link } from 'react-router-dom'
import './Todo.css'

export function ToDoIndex()
{
    return(
        <div className="container-fluid bg-image">
            <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
                <Link to='/register' className='btn btn-dark me-2 '>New User Register</Link>
                <Link to='/login' className='btn btn-warning'>Existing User Login</Link>
            </div>
        </div>
    )
}