import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoIndex } from './Components/todo-index';
import { ToDoRegister } from './Components/todo-user-register';
import { ToDoLogin } from './Components/todo-user-login';
import { ToDoUserDashBoard } from './Components/todo-user-dashboard';
import { ToDoAddAppointment } from './Components/todo-add-appointment';
import { ToDoEditAppointment } from './Components/todo-edit-appointment';
import { ToDoRemoveAppointment } from './Components/todo-remove-appointment';

function App() {
  return (
    <div className="App bg-image">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ToDoIndex/>}/>
          <Route path='register' element={<ToDoRegister/>}/>
          <Route path='login' element={<ToDoLogin/>}/>
          <Route path='dashboard' element={<ToDoUserDashBoard/>}/>
          <Route path='add-appointment' element={<ToDoAddAppointment/>}/>
          <Route path='edit-appointment/:id' element={<ToDoEditAppointment/>} />
          <Route path='remove-appointment/:id' element={<ToDoRemoveAppointment/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
