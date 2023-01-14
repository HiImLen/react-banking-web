import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getEmployeeList } from '../store/adminSlice';
import { instance } from '../../../../utils'

export default function Admin() {
  const [rows, setRows] = React.useState([]);

  // const { id, status } = useParams()
  // const dispatch = useDispatch()

  
  // useEffect(() => {
  //   dispatch(getEmployeeList())
  // }, [])
  
  // const employeeList = useSelector((state) => state.admin.employeeList)
  const employeeList = []
  try {
    const res = instance.get('/Users/Employees')
    console.log("employee list: " ,res)
    if (res.data.status === 'success') {
      employeeList = res.data.data
    }
  } catch (err) {
    console.log(err)
  }

  console.log("employeeList in Admin.js: ", employeeList);


  return (
    <React.Fragment>
      <Title>All Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeList.map(() => (
            <TableRow key={employeeList.id}>
              <TableCell>{employeeList.id}</TableCell>
              <TableCell>{employeeList.username}</TableCell>
              <TableCell>{employeeList.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}