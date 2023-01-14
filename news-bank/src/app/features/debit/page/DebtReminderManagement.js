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
        <Select className='w-min' labelId="form-paid-fee-label" defaultValue={30}>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={15}>Last 15 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
        </Select>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ height: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listDebt
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((debt) => {
                        const m = new Date(debt.created_at)
                        m.setHours(m.getHours() + 7)
                        console.log('sourceAccount.number', sourceAccount?.number)
                        console.log('debt.source_account_number', debt.source_account_number)
                        console.log(debt.source_account_number !== sourceAccount?.number)
                        console.log(debt)
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={`debt-${debt.id}`} onClick={() => handleClickOpen(debt)}>
                           <TableCell>{debt.destination_owner_name}</TableCell>
                           <TableCell>
                              <Typography>{moment(m).format('LL')}</Typography>
                              <Typography>{m.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Typography>
                            </TableCell>
                           <TableCell>{debt.note}</TableCell>
                           <TableCell>{debt.amount}</TableCell>
                           <TableCell>{debt.isPaid ? 'Paid' : 'Unpaid'}</TableCell>
                           <TableCell>
                            <IconButton aria-label="delete" size="large" onClick={(e) => {
                              e.stopPropagation()
                              dispatch(setTargetDebt(debt))
                              dispatch(deleteDebt())
                            }} disabled={debt.source_account_number !== sourceAccount?.number}>
                                <DeleteIcon fontSize="inherit" color={debt.source_account_number !== sourceAccount?.number ? 'disable' : 'primary'}/>
                            </IconButton>
                           </TableCell>
                        </TableRow>
                        )
                      })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={listDebt.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
      {/* Detail debt dialog */}
      
    </Paper>
  )
}
