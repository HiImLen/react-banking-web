import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BankLogo from '../../assets/img/BankLogo.svg'
import LogoSidebar from '../../assets/icon/LogoSidebar.svg'
import DebtReminderManagement from '../../assets/icon/DebtReminderManagement.svg'
import FundTransferSidebar from '../../assets/icon/FundTransferSidebar.svg'
import RecentTransSidebar from '../../assets/icon/RecentTransSidebar.svg'

export default function SideBarEmployee () {
  return (
        <Paper className="flex flex-col" square elevation={2}>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className="flex flex-row justify-center space-x-2 py-3">
                    <img src={BankLogo} alt='logo'></img>
                    <Typography className="flex items-center" color='primary' style={{ fontWeight: 600 }}>Swen Bank</Typography>
                </div>
            </Link>
            <Box className="flex flex-col flex-grow p-3 px-4 space-y-3" style={{ borderRadius: '40px 40px 0px 0px' }} bgcolor='primary.main'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className='flex flex-row justify-start items-start gap-x-2'>
                        <img src={LogoSidebar} alt='LogoSidebar'></img>
                        <Typography className='text-white text-left' style={{ fontWeight: 600 }}>Home</Typography>
                    </div>
                </Link>
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                    <div className='flex flex-row justify-start items-center ml-3 gap-x-2'>
                        <img src={FundTransferSidebar} alt='FundTransferSidebar'></img>
                        <Typography className='text-white text-left' style={{ fontWeight: 600 }}>Create Customer Account</Typography>
                    </div>
                </Link>
                <Link to='/deposit' className='flex flex-row ml-3 gap-x-2' style={{ textDecoration: 'none' }}>
                    <img src={DebtReminderManagement} alt='DebtReminderManagement'></img>
                    <Typography className='text-white text-left' style={{ fontWeight: 600 }}>Deposit Money</Typography>
                </Link>
                <Link to='/close' className='flex flex-row ml-3 gap-x-2' style={{ textDecoration: 'none' }}>
                    <img src={RecentTransSidebar} alt='DebtReminderManagement'></img>
                    <Typography className='text-white text-left' style={{ fontWeight: 600 }}>Lock Client Account</Typography>
                </Link>
            </Box>
        </Paper>
  )
}
