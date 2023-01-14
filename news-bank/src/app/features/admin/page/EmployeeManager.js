/* eslint-disable*/

import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeList, deleteEmployee, createEmployee } from '../store/adminSlice';
import { useForm } from 'react-hook-form'


export default function EmployeeManager() {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmployeeList())
  }, [])

  const employeeList = useSelector((state) => state.admin.employeeList)

  const onDeleteBtn = (e) => {
    console.log(e.target.value);
    dispatch(deleteEmployee(e.target.value))
  }

  const onAddEmployee = (data) => {
    console.log(data);
    dispatch(createEmployee(data))
  }


  return (
    <React.Fragment>
      <Title>All Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Tool</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeList.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell><Button onClick={onDeleteBtn} value={employee.id} color="error">Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="container">
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="p-5">
                <div className="text-center">
                  <h4 className="text-dark mb-4">Create new employee</h4>
                </div>
                <form className="user" onSubmit={handleSubmit(onAddEmployee)}>
                  <div className="mb-3">
                    <input className="form-control form-control-user" type="text" id="exampleUserName" placeholder="Username" name="username" {...register('username')} />
                    {errors.username && <span className="error-message text-danger">{errors.username.message}</span>}
                  </div>
                  <div className="mb-3">
                    <div className="mb-3">
                      <input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" {...register('password')} />
                      {errors.password && <span className="error-message text-danger">{errors.password.message}</span>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <input className="form-control form-control-user" type="text" id="exampleName" placeholder="Full Name" name="name" {...register('name')} />
                    {errors.name && <span className="error-message text-danger">{errors.name.message}</span>}
                  </div>
                  <div className="mb-3">
                    <input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" {...register('email')} />
                    {errors.email && <span className="error-message text-danger">{errors.email.message}</span>}
                  </div>
                  <div className="mb-3">
                    <input className="form-control form-control-user" type="text" id="examplePhone" placeholder="Phone Number" name="phone" {...register('phone')} />
                    {errors.phone && <span className="error-message text-danger">{errors.phone.message}</span>}
                  </div>
                  <div className="d-flex justify-content-center">
                    {errors.error && <span className="error-message mb-3 text-danger">{errors.error.message}</span>}
                  </div>
                  <button className="btn btn-primary d-block btn-user w-100" type="submit">Add Employee</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}