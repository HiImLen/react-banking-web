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
import { getTransactionsList } from '../store/adminSlice';
import { useForm } from 'react-hook-form'


export default function TransactionsManager() {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTransactionsList())
  }, [])

  let totalAmount= 0, totalFee = 0

  const transactionList = useSelector((state) => state.admin.transactionList)

  transactionList.map((transaction) => {
    totalAmount += transaction.amount
    totalFee += transaction.fee
  })

  return (
    <React.Fragment>
      <Title>All Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Source Account</TableCell>
            <TableCell>Source Bank</TableCell>
            <TableCell>Destination Account</TableCell>
            <TableCell>Destination Bank</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionList.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.source_account_number}</TableCell>
              <TableCell>{transaction.source_bank_name}</TableCell>
              <TableCell>{transaction.destination_account_number}</TableCell>
              <TableCell>{transaction.destination_bank_name}</TableCell>
              <TableCell>{transaction.created_at}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.fee}</TableCell>
            </TableRow>
          ))}
          {/* <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell> */}
          <TableCell colSpan="6" align='right'>
            <h5 color='blue'>Total</h5>
          </TableCell>
          <TableCell>{totalAmount}</TableCell>
          <TableCell>{totalFee}</TableCell>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}