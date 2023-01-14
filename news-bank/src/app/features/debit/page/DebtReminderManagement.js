import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Close from '../../../../assets/icon/Close.svg'
import { deleteDebt, fetchDebt, getSourceAccount, setTargetDebt } from '../store/debtSlice'

const columns = [
  { id: 'name', label: 'Name/Business' },
  { id: 'date', label: 'Date' },
  {
    id: 'description',
    label: 'Description'
  },
  {
    id: 'amount',
    label: 'Amount'
  },
  {
    id: 'status',
    label: 'Status'
  }
]

export default function DebtReminderManagement () {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickOpen = (row) => {
    dispatch(setTargetDebt(row))
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const listDebt = useSelector((state) => state.debt.listDebt)
  const targetDebt = useSelector((state) => state.debt.targetDebt)
  const [dateString, setDateString] = useState('')
  const sourceAccount = useSelector((state) => state.debt.sourceAccount)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  useEffect(() => {
    dispatch(fetchDebt())
    dispatch(getSourceAccount())
  }, [])

  useEffect(() => {
    if (targetDebt) {
      const m = new Date(targetDebt.created_at)
      m.setHours(m.getHours() + 7)
      const dateString = m.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ', ' + moment(m).format('DD/MM/YYYY')
      setDateString(dateString)
    } else setDateString('')
  }, [targetDebt])
  console.log('targetDebt', targetDebt)
  return (
    <Paper
        className='flex flex-col gap-y-4 py-4 px-5'
        elevation={3}
        sx={{ borderRadius: '10px' }}
    >
        <Typography className='text-black text-left'>Date</Typography>
    </Paper>
  )
}
