import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BankLogo from '../assets/img/BankLogo.svg'
import DebtReminderManagement from '../assets/icon/DebtReminderManagement.svg'

export default function SideBar () {
  return (
        <Paper className="flex flex-col" square elevation={2}>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className="flex flex-row justify-center space-x-2 py-3">
                    <img src={BankLogo} alt='logo'></img>
                    <Typography className="flex items-center" color='primary' style={{ fontWeight: 600 }}>Swen Bank</Typography>
                </div>
            </Link>
            <Box className="flex flex-col flex-grow p-3" style={{ borderRadius: '40px 40px 0px 0px' }} bgcolor='primary.main'>
                <Typography className='text-white' style={{ fontWeight: 600 }}>Home</Typography>
                <Link to='debt/debtReminderManagement' style={{ textDecoration: 'none' }}>
                    <div className='flex flex-row justify-center items-center mx-3 gap-x-2'>
                        <img src={DebtReminderManagement} alt='DebtReminderManagement'></img>
                        <Typography className='text-white text-left' style={{ fontWeight: 600 }}>Debt Reminder Management</Typography>
                    </div>
                </Link>
            </Box>
        </Paper>
  )
}
