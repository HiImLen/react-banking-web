import { Button, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import avt from '../../../../assets/img/avt2.svg'
import DownArrow from '../../../../assets/icon/DownArrow.svg'
import DownArrowLight from '../../../../assets/icon/DownArrowLight.svg'
import TransactionFail from '../../../../assets/img/TransactionFail.svg'
import TransactionSuccess from '../../../../assets/img/TransactionSuccessful.svg'
import { getTransaction } from '../store/transferSlice'
import { Link } from 'react-router-dom'

export default function Transaction () {
  const { id, status } = useParams()
  const dispatch = useDispatch()

  const transaction = useSelector((state) => state.transfer.transaction)

  useEffect(() => {
    dispatch(getTransaction({ id }))
  }, [])
  return (
  <div className="grid grid-cols-2">
    <div className='flex flex-col items-center space-y-10'>
      <div style={{ maxHeight: '135px', maxWidth: '135px' }}>{status ? (<img src={TransactionSuccess} alt='WithinBank'/>) : (<img src={TransactionFail} alt='WithinBank'/>)}</div>
      <Typography className='text-blue-500' style={{ fontWeight: 600 }}>Transaction {status ? ('successfull') : ('failed')} !!!</Typography>
      <Typography className='text-blue-500' style={{ fontSize: '32px', fontWeight: 600 }}>...... VND</Typography>
    </div>
    <div className='flex flex-col space-y-5'>
      <Paper
        className='flex flex-col gap-y-4 p-4'
        elevation={3}
        sx={{ borderRadius: '10px' }}
      >
        <div className="grid grid-cols-4 space-x-5">
          <div className='grid grid-rows-3 gap-y-5'>
            <img src={avt} alt='avatar'/>
            <div className='grid grid-rows-3 justify-items-center gap-0'>
              <img src={DownArrowLight} alt='DownArrowLight'/>
              <img src={DownArrow} alt='DownArrow'/>
              <img src={DownArrow} alt='DownArrow'/>
            </div>
            <img src={avt} alt='avatar'/>
          </div>
          <div className='col-span-3 grid grid-rows-2 justify-items-start content-center gap-y-5'>
            <div className="grid grid-rows-2 border-b-2 w-full">
              <Typography>{transaction?.source_owner_name}</Typography>
              <Typography>{transaction?.source_account_number}</Typography>
            </div>
            <div className='grid grid-rows-2'>
              <Typography>{transaction?.destination_owner_name}</Typography>
              <Typography>{transaction?.destination_account_number}</Typography>
            </div>
          </div>
        </div>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <div>
          <Typography>ID</Typography>
          <Typography>{transaction?.code}</Typography>
        </div>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <div>
          <Typography>Note</Typography>
          <Typography>{transaction?.note}</Typography>
        </div>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <div>
          <Typography>Date</Typography>
          <Typography>{transaction?.created_at}</Typography>
        </div>
      </Paper>
      <div className='grid grid-cols-2 space-x-2'>
        <Button variant="contained" color='primary' type="submit" component={Link} to="/transfer" sx={{
          borderRadius: '10px',
          background: '#8085FF',
          '&:hover': {
            background: '#2a2e80'
          },
          textTransform: 'none'
        }}>Other transaction</Button>
        <Button variant="contained" color='primary' type="submit" component={Link} to="/" sx={{
          borderRadius: '10px',
          background: '#4D54E4',
          '&:hover': {
            background: '#2a2e80'
          },
          textTransform: 'none'
        }}>Home</Button>
      </div>
    </div>
  </div>
  )
}
