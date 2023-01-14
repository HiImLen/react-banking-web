import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DebtReminder from '../../assets/icon/DebtReminder.svg'
import FundTransfer from '../../assets/icon/FundTransfer.svg'
import RecentTrans from '../../assets/icon/RecentTrans.svg'
import ATMPic from '../../assets/img/ATM_pic.svg'
import { useSelector } from 'react-redux'
import { instance, parseJwt } from '../../utils'

export default function HomepageCP() {
    const role_id = useSelector((state) => state.login.role_id)
    const name = useSelector((state) => state.login.name)
    const [accountInfo, setAccountInfo] = useState({})
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        getAccountInformation();
    }, []);

    const getAccountInformation = async (data) => {
        const res = await instance.get('/Users/Accounts')
        if (res.status === 200) {
            setAccountInfo(res.data.data)
            setBalance(formatMoney(res.data.data.balance))
        }
    }

    // function to format money as VND
    const formatMoney = (money) => {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <>
            {role_id === 2 ? (
                
            ) : <></>}

            {/* Các chức năng ở dưới */}
            <Paper
                className='row-span-2 grid grid-cols-3 justify-items-center content-center py-3 px-5'
                elevation={2}
                sx={{ borderRadius: '10px' }}
            >
                
                {role_id === 1 ? (
                    <Link to='/admin' style={{ textDecoration: 'none' }}>
                        <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                            <Button className="flex flex-grow">
                                <div className="flex flex-grow flex-col items-center gap-y-2">
                                    <div style={{ height: '59px', width: '59px' }}><img src={DebtReminder} alt='DebtReminder' /></div>
                                    <Typography className='text-black' style={{ textTransform: 'none' }}>Admin Management</Typography>
                                </div>
                            </Button>
                        </div>
                    </Link>
                ) : <></>}
                {role_id !== 1 ? (
                    <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                        <Button className="flex flex-grow">
                            <div className="flex flex-grow flex-col items-center gap-y-2">
                                <div style={{ height: '59px', width: '59px' }}><img src={RecentTrans} alt='RecentTrans' /></div>
                                <Typography className='text-black' style={{ textTransform: 'none' }}>Recent Transactions</Typography>
                            </div>
                        </Button>
                    </div>
                ) : <></>}
            </Paper>
        </>
    )
}
