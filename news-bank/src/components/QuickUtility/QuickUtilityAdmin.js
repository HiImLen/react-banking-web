import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import RightArrow from '../../assets/icon/RightArrow.svg'
import InterbankTransfer from '../../assets/img/Quick utility/InterbankTransfer.svg'
import RecentTransaction from '../../assets/img/Quick utility/RecentTransaction.svg'
import TransferWithinBank from '../../assets/img/Quick utility/TransferWithinBank.svg'

export default function QuickUtilityEmployee () {
  return (
        // gồm 2 button chức năng
        <div className="grid grid-rows-5">
            <Paper
                className='row-span-3 p-3 space-y-2'
                elevation={2}
                sx={{ borderRadius: '10px' }}
            >
                <Typography className='text-black text-left' style={{ fontWeight: 600 }}>Quick Utility</Typography>
                <div className="grid grid-rows-2 gap-y-5">
                        <Link to='/signup' style={{ textDecoration: 'none' }}>
                            <Box className="flex border-2 rounded-md">
                                <Button className="flex flex-grow">
                                    <Box className="flex flex-row flex-grow justify-between px-2">
                                        <img src={TransferWithinBank} alt='TransferWithinBank'/>
                                        <Typography className='text-black text-left self-center' style={{ textTransform: 'none' }}>Employee Manager</Typography>
                                        <img src={RightArrow} alt='RightArrow'/>
                                    </Box>
                                </Button>
                            </Box>
                        </Link>
                        <Link to='/deposit' style={{ textDecoration: 'none' }}>
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-grow">
                                <Box className="flex flex-row flex-grow justify-between px-2">
                                    <img src={InterbankTransfer} alt='InterbankTransfer'/>
                                    <Typography className='text-black text-left self-center' style={{ textTransform: 'none' }}>Transactions With Other Banks</Typography>
                                    <img src={RightArrow} alt='RightArrow'/>
                                </Box>
                            </Button>
                        </Box>
                        </Link>
                </div>
            </Paper>
        </div>
  )
}
