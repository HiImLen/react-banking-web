import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import BankLogo from '../assets/img/BankLogo.svg'

export default function SideBar () {
  return (
        <Paper className="flex flex-col" square elevation={2}>
            <div className="flex flex-row justify-center space-x-2 py-3">
                <img src={BankLogo} alt='logo'></img>
                <Typography className="flex items-center" color='primary' style={{ fontWeight: 600 }}>Swen Bank</Typography>
            </div>
            <Box className="flex flex-col flex-grow p-3" style={{ borderRadius: '40px 40px 0px 0px' }} bgcolor='primary.main'>
                <Typography className='text-black' style={{ fontWeight: 600 }}>Home</Typography>

            </Box>
        </Paper>
  )
}
