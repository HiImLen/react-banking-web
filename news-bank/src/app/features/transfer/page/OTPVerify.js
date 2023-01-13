import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import OtpInput from 'react18-input-otp'
import { parseJwt } from '../../../../utils.js'
import { setTargetTransactionId, verifyOTP } from '../store/transferSlice.js'

export default function OTPVerify () {
  const [otp, setOtp] = useState('')
  const token = useSelector((state) => state.transfer.token)
  const currentUser = parseJwt(token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(setTargetTransactionId(id))
  }, [])

  const handleChange = (otp) => { setOtp(otp) }

  return (
      <div className='flex flex-col items-center justify-center space-y-5'>
        <Typography className='text-black' style={{ fontWeight: 600, fontSize: '24px' }}>Enter OTP</Typography>
        <Typography className='text-black'>We Will send you a OTP code on this <strong>{currentUser.email}</strong></Typography>

        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          isInputNum={true}
          inputStyle={{ width: '3rem', height: '3rem', borderWidth: '1px', borderColor: 'blue' }}
          containerStyle={'space-x-10'}
          shouldAutoFocus={true}
          focusStyle={'border-2 border-red-500'}
        />
        <div className='flex flex-row space-x-3'>
          <Typography className='text-black'>Do not recieved OTP?</Typography>
          <Link className='text-black font-semibold'>Resend OTP</Link>
        </div>
        <Button className="mx-5 w-48"variant="contained" color='primary' onClick={async () => {
          dispatch(verifyOTP({ otp, navigate }))
        }} sx={{
          borderRadius: '10px',
          background: '#4D54E4',
          '&:hover': {
            background: '#2a2e80'
          }
        }}>Verify</Button>
      </div>
  )
}
