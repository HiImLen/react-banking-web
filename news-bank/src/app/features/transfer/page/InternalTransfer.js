import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import avt from '../../../../assets/img/avt2.svg'

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Close from '../../../../assets/icon/Close.svg'
import { createReceiver, createTransaction, getDestinationAccount, getReceiver, getSourceAccount } from '../store/transferSlice'

export default function InternalTransfer () {
  const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [acceptCreate, setAcceptCreate] = useState(false)
  const [receiverName, setReceiverName] = useState('')

  const sourceAccount = useSelector((state) => state.transfer.sourceAccount)
  const destinationAccount = useSelector((state) => state.transfer.destinationAccount)
  const receiver = useSelector((state) => state.transfer.receiver)

  useEffect(() => {
    dispatch(getSourceAccount())
  }, [])
  useEffect(() => {
    console.log(destinationAccount)
    if (destinationAccount) {
      clearErrors('destination_account_number')
    } else {
      setError('destination_account_number', { type: 'manual', message: 'Invalid account number' })
    }
  // eslint-disable-next-line no-use-before-define
  }, [destinationAccount])

  useEffect(() => {
    console.log('fetch receiver', receiver)
    if (!receiver) setOpen(true)
  }, [receiver])

  const onSubmit = async (data) => {
    dispatch(createTransaction({ data, navigate }))
  }
  const valueOfMoney = [100000, 200000, 500000, 1000000, 2000000, 5000000]
  console.log(errors)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
    <div className='grid grid-cols-5 mb-10'>
        <div/>
        <div className='col-span-3 flex flex-col'>
            <Paper
                className='flex flex-row justify-center gap-x-4 py-3'
                elevation={3}
                sx={{ borderRadius: '10px' }}
            >
                <img src={avt} alt='avatar'/>
                <div className='flex flex-col justify-center'>
                    <Typography className='text-black text-left'>{sourceAccount?.number}</Typography>
                    <Typography className='text-black text-left' style={{ fontWeight: 600 }}>{sourceAccount?.balance?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Typography>

                </div>
            </Paper>
            <div className='pt-6'>
                <Typography className="font-semibold text-lg leading-6">Transfer to</Typography>
                <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField className='border-sky-500 border-2 w-full' id="outlined-basic" placeholder="Account number" variant="outlined" {...register('destination_account_number', { required: true })} onBlur={async (data) => {
                          dispatch(getDestinationAccount({ accountNumber: data.target.value }))
                          dispatch(getReceiver({ accountNumber: data.target.value }))
                        }}
                        InputProps={{
                          endAdornment:
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="receiver toggle"
                              edge="end"
                            >
                              <PermContactCalendarIcon/>
                            </IconButton>
                          </InputAdornment>
                        }}
                        />
                        {errors.destination_account_number && <p className='text-red-500'>{errors.destination_account_number.message}</p>}
                    </div>
                    {destinationAccount
                      ? (
                            <TextField className='border-sky-500 border-2' id="outlined-basic" placeholder="The recipient name"variant="outlined" value={destinationAccount?.name} disabled/>
                        )
                      : (<></>)}
                    <FormControl>
                        <InputLabel id="form-paid-fee-label">Select a form of fee payment</InputLabel>
                        <Select labelId="form-paid-fee-label" label="Select a form of fee payment" defaultValue={true} {...register('fee_is_paid_by_receiver')}>
                            <MenuItem value={true}>Paid receiver</MenuItem>
                            <MenuItem value={false}>Paid sender</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className='border-sky-500 border-2' id="outlined-basic" placeholder="Amount VND" variant="outlined" {...register('amount', { required: true })} type="number" />
                    <Box className="grid grid-cols-3 grid-rows-2 gap-y-5 gap-x-3">
                        {valueOfMoney.map((data, index) => (<Button key={`${index}-button-money`} style={{ background: '#E0E0E0', borderRadius: '15px', color: 'black' }} className="py-2" value={data} onClick={() => {
                          setValue('amount', data)
                        }}>{data.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Button>))}
                    </Box>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        placeholder='Transaction from ...'
                        {...register('note')}
                    />
                    <Button className="mx-5"variant="contained" color='primary' type="submit" sx={{
                      borderRadius: '10px',
                      background: '#4D54E4',
                      '&:hover': {
                        background: '#2a2e80'
                      }
                    }}>Comfirm</Button>
                </form>
            </div>
        </div>
    </div>
    <Dialog fullWidth={true} maxWidth={'xs'} sx={{ borderRadius: '30px' }} open={open} onClose={handleClose}>
    <DialogTitle className='grid grid-cols-6 text-center text-white' bgcolor='primary.main' >
      <div/>
      <Typography className='text-center col-span-4' color='white'>Add Receiver</Typography>
      <Button onClick={handleClose}><img src={Close} alt='Close'/></Button>
    </DialogTitle>
    {acceptCreate
      ? <>
        <DialogContent className='mt-3' sx={{ paddingTop: '15px !important' }}>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <TextField className='border-sky-500 border-2 w-full' id="outlined-basic" label="Account number" autoFocus variant="outlined" value={destinationAccount?.number} disabled/>
            <TextField className='border-sky-500 border-2' id="outlined-basic" label="Name" autoFocus variant="outlined" value={receiverName} onChange={(e) => setReceiverName(e.target.value)}/>
          </form>
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
          onClick={() => {
            dispatch(createReceiver({ name: receiverName }))
            handleClose()
          }}>
            <Typography sx={{ fontSize: '18px' }} color='white'>Save</Typography>
          </Button>
        </DialogActions>
      </>
      : <>
        <DialogContent className='mt-3'>
          <Typography>Do you want to save this receiver?</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setAcceptCreate(true)}>
            Agree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </>}
  </Dialog>
  </>
  )
}
