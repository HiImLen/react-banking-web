import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import avt from '../../../../assets/img/avt2.svg'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getSourceAccount, payDebt } from '../store/debtSlice'
import { getDebtReminder } from '../store/debtTranscriptSlice'
import OTPVerify from './OTPVerify'
// import { createTransaction, getDestinationAccount, getSourceAccount } from '../store/transferSlice'

export default function InternalTransfer () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOTPVerify, setIsOTPVerify] = useState(false)
  const { id } = useParams()

  const debtReminder = useSelector((state) => state.debtTranscript.debtReminder)
  const sourceAccount = useSelector((state) => state.debt.sourceAccount)

  useEffect(() => {
    dispatch(getDebtReminder({ id }))
    dispatch(getSourceAccount())
  }, [])

  const onSubmit = async (data) => {
    dispatch(payDebt({ data }))
    setIsOTPVerify(true)
  }
  console.log(errors)

  return (!isOTPVerify && debtReminder)
    ? (<div className='grid grid-cols-5 mb-10'>
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
                        <TextField className='border-sky-500 border-2 w-full' id="outlined-basic" placeholder="Account number" variant="outlined" value={debtReminder.source_account_number} disabled/>
                    </div>
                    <TextField className='border-sky-500 border-2' id="outlined-basic" placeholder="The recipient name"variant="outlined" defaultValue={debtReminder.source_owner_name} disabled/>
                    <FormControl>
                        <InputLabel id="form-paid-fee-label">Select a form of fee payment</InputLabel>
                        <Select labelId="form-paid-fee-label" label="Select a form of fee payment" defaultValue={true} {...register('fee_is_paid_by_receiver')}>
                            <MenuItem value={true}>Paid receiver</MenuItem>
                            <MenuItem value={false}>Paid sender</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className='border-sky-500 border-2' id="outlined-basic" placeholder="Amount VND" variant="outlined" type="number" value={debtReminder.amount} disabled/>
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
      )
    : (isOTPVerify)
        ? (<OTPVerify />)
        : (<CircularProgress/>)
}
