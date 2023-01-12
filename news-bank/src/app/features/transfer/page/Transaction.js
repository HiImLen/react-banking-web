
import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import avt from '../../../../assets/img/avt2.svg'
import TransactionFail from '../../../../assets/img/TransactionFail.svg'
import TransactionSuccess from '../../../../assets/img/TransactionSuccessful.svg'
import { getTransaction } from '../store/transferSlice'

export default function Transaction () {
  const { id, status } = useParams()
  const dispatch = useDispatch()

  const transaction = useSelector((state) => state.transfer.transaction)

  useEffect(() => {
    dispatch(getTransaction({ id }))
  }, [])
  return (
  <div className="flex flex-row">
    {status ? (<img src={TransactionSuccess} alt='WithinBank'/>) : (<img src={TransactionFail} alt='WithinBank'/>)}
    <Box className="bg-white rounded-3xl px-7 py-6 w-3/4">
      <div className="flex flex-row space-x-5">
        <img src={avt} alt='avatar'/>
        <div className="flex flex-col justify-between">
          <p>{transaction?.source_owner_name}</p>
          <p>{transaction?.source_account_number}</p>
        </div>
      </div>
      <Divider sx={{ border: '1px solid #ADAEB5' }} />
      <div className='flex flex-col'>
        <p>{transaction?.destination_owner_name}</p>
        <p>{transaction?.destination_account_number}</p>
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
    </Box>
  </div>
  )
}
