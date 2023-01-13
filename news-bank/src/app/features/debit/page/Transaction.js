import { Button, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import DownArrow from '../../../../assets/icon/DownArrow.svg'
import DownArrowLight from '../../../../assets/icon/DownArrowLight.svg'
import avt from '../../../../assets/img/avt2.svg'
import TransactionFail from '../../../../assets/img/TransactionFail.svg'
import TransactionSuccess from '../../../../assets/img/TransactionSuccessful.svg'
import { getTransaction } from '../../transfer/store/transferSlice'
// import { getTransaction } from '../store/transferSlice'

const convertViToEn = (str, toUpperCase = false) => {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

export default function Transaction () {
  const { id } = useParams()
  const dispatch = useDispatch()

  const transaction = useSelector((state) => state.transfer.transaction)
  const [dateString, setDateString] = useState('')
  useEffect(() => {
    if (transaction) {
      const m = new Date(transaction.created_at)
      m.setHours(m.getHours() + 7)
      const dateString = m.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ', ' + moment(m).format('DD/MM/YYYY')
      setDateString(dateString)
    }
  }, [transaction])

  useEffect(() => {
    dispatch(getTransaction({ id }))
  }, [])
  return transaction
    ? (<div className="grid grid-cols-2">
    <div className='flex flex-col items-center space-y-10'>
      <div style={{ maxHeight: '135px', maxWidth: '135px' }}>{transaction.status_id === 2 ? (<img src={TransactionSuccess} alt='WithinBank'/>) : (<img src={TransactionFail} alt='WithinBank'/>)}</div>
      <Typography className='text-blue-500' style={{ fontWeight: 600 }}>Transaction {transaction.status_id === 2 ? ('successful') : ('failed')} !!!</Typography>
      <Typography className='text-blue-500' style={{ fontSize: '32px', fontWeight: 600 }}>{transaction.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </Typography>
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
          <div className='col-span-3 grid grid-rows-2 justify-items-start content-center gap-y-2'>
            <div className="grid grid-rows-2 border-b-2 w-full items-center">
              <Typography sx={{ fontWeight: '600', lineHeight: '19px', fontSize: '16px' }}>{convertViToEn(transaction.source_owner_name, true)}</Typography>
              <Typography sx={{ fontWeight: '600', lineHeight: '17px', fontSize: '14px', color: '#ADAEB5' }}>{transaction.source_account_number}</Typography>
            </div>
            <div className='grid grid-rows-2 items-center'>
              <Typography sx={{ fontWeight: '600', lineHeight: '19px', fontSize: '16px' }}>{convertViToEn(transaction.destination_owner_name, true)}</Typography>
              <Typography sx={{ fontWeight: '500', lineHeight: '17px', fontSize: '14px' }}>{transaction.destination_account_number}</Typography>
            </div>
          </div>
        </div>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <div className="space-y-4">
          <Typography sx={{ fontWeight: '600', lineHeight: '17px', fontSize: '14px', color: '#ADAEB5' }}>ID</Typography>
          <Typography>{transaction.code}</Typography>
        </div>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <div className="space-y-4">
          <Typography sx={{ fontWeight: '600', lineHeight: '17px', fontSize: '14px', color: '#ADAEB5' }}>Note</Typography>
          <Typography>{transaction.note}</Typography>
        </div>
        <Divider sx={{ border: '1px solid #ADAEB5' }} />
        <div className="space-y-4">
          <Typography sx={{ fontWeight: '600', lineHeight: '17px', fontSize: '14px', color: '#ADAEB5' }}>Date</Typography>
          <Typography>{dateString}</Typography>
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
  </div>)
    : (<CircularProgress />)
}
