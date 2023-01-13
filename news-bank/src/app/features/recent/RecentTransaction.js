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

export default function RecentTransaction () {
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
                <h1>hehe</h1>
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={12}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
      {/* Detail debt dialog */}
      <Dialog fullWidth={true} maxWidth={'xs'} sx={{ borderRadius: '30px' }} open={open} onClose={handleClose}>
        <DialogTitle className='grid grid-cols-6 text-center text-white' bgcolor='primary.main' >
          <div/>
          <Typography className='text-center col-span-4' color='white'>Debt Details</Typography>
          <Button onClick={handleClose}><img src={Close} alt='Close'/></Button>
        </DialogTitle>
        <DialogContent className='mt-3'>
          <Typography className='text-center' color='primary'>Amount</Typography>
          <Typography className='text-center mb-3' sx={{ fontSize: '24px' }} color='black'>{}</Typography>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <Box className='flex flex-col justify-center space-y-3 py-4'>
          <Typography sx={{ fontSize: '14px' }} color='grey'> From</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase' }} color='black'>{}</Typography>
          <Typography sx={{ fontSize: '14px' }} color='black'>{}</Typography>
        </Box>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <Box className='flex flex-col justify-center space-y-3 py-4'>
          <Typography sx={{ fontSize: '14px' }} color='grey'> To</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase' }} color='black'>{}</Typography>
          <Typography sx={{ fontSize: '14px' }} color='black'>{}</Typography>
        </Box>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <Box className='flex flex-col justify-center space-y-3 py-4'>
          <Typography sx={{ fontSize: '14px' }} color='grey'> Description</Typography>
          <Typography sx={{ fontSize: '14px' }} color='black'>{}</Typography>
        </Box>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <Box className='grid grid-rows-3 gap-y-3 py-4'>
          <div className='flex flex-row justify-between'>
            <Typography sx={{ fontSize: '14px' }} color='grey'>Date</Typography>
            <Typography sx={{ fontSize: '14px' }} color='black'>{}</Typography>
          </div>
          <div className='flex flex-row justify-between'>
            <Typography sx={{ fontSize: '14px' }} color='grey'>Status</Typography>
            <Typography sx={{ fontSize: '14px' }} color='black'>{}</Typography>
          </div>
        </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
        
          <Button className='w-4/5 h-12' color='primary' sx={{
            borderRadius: '10px',
            background: '#4D54E4',
            '&:hover': {
              background: '#2a2e80'
            },
            textTransform: 'none'
          }}
         
          >
            <Typography sx={{ fontSize: '18px' }} color='white'>Payment</Typography>
          </Button>
        
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
