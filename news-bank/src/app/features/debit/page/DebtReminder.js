import { Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CreateDebt from '../../../../assets/icon/DebtReminder/CreateDebt.svg'
import ViewDebt from '../../../../assets/icon/DebtReminder/ViewDebt.svg'

export default function DebtReminder () {
  return (
        <Paper
            className='grid grid-cols-3 justify-items-center content-center py-3 px-5'
            elevation={2}
            sx={{ borderRadius: '10px' }}
        >
            <Link to='createDebtReminder' style={{ textDecoration: 'none' }}>
                <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                    <Button className="flex flex-grow">
                        <div className="flex flex-grow flex-col items-center gap-y-2">
                            <div style={{ height: '59px', width: '59px' }}><img src={CreateDebt} alt='CreateDebt'/></div>
                            <Typography className='text-black' style={{ textTransform: 'none' }}>Transfer Within Bank</Typography>
                        </div>
                    </Button>
                </div>
            </Link>
            <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                <Button className="flex flex-grow">
                    <div className="flex flex-grow flex-col items-center gap-y-2">
                        <div style={{ height: '59px', width: '59px' }}><img src={ViewDebt} alt='ViewDebt'/></div>
                        <Typography className='text-black' style={{ textTransform: 'none' }}>Interbank Transfer</Typography>
                    </div>
                </Button>
            </div>
        </Paper>
  )
}
