import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DebtReminder from '../../assets/icon/DebtReminder.svg'
import FundTransfer from '../../assets/icon/FundTransfer.svg'
import RecentTrans from '../../assets/icon/RecentTrans.svg'
import ATMPic from '../../assets/img/ATM_pic.svg'
import { instance } from '../../utils'

export default function HomepageCP() {
    const role_id = useSelector((state) => state.login.role_id)
    const name = useSelector((state) => state.login.name)
    const [accountInfo, setAccountInfo] = useState({})
    const [balance, setBalance] = useState('')

    useEffect(() => {
        if (role_id === 2) {
            console.log('role_id', role_id)
            getAccountInformation()
        }
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
                // Những phần ở giữa hompage và ko bao gồm QuickUtility
                <div className="grid grid-rows-5 gap-y-14">
                    {/* Chi tiết thông tin card */}
                    <Paper
                        className='row-span-4 grid grid-rows-6 py-3 px-5'
                        elevation={2}
                        sx={{ borderRadius: '10px' }}
                    >
                        <div className="grid grid-cols-2">
                            <Typography className='text-black' style={{ fontWeight: 600 }}>My Card</Typography>
                            <Typography className='text-black text-left' style={{ fontWeight: 600 }}>Details</Typography>
                        </div>
                        <div className="row-span-5 grid grid-cols-2">
                            {/* Thông tin thẻ trên hình */}
                            <Box
                                className="grid grid-rows-2 p-4 mr-8"
                                sx={{
                                    backgroundImage: `url(${ATMPic})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    aspectRatio: '2/1'
                                }}
                            >
                                <div className="invisible"></div>
                                <div className="grid grid-rows-2">
                                    <Typography className='text-white' style={{ fontWeight: 600 }}>{accountInfo.number}</Typography>
                                    <Typography className='text-white' style={{ textTransform: 'uppercase' }}>{name}</Typography>
                                </div>
                            </Box>
                            {/* Thông tin chi tiết */}
                            <div className="grid grid-rows-2 content-center">
                                <div className="grid grid-cols-2 content-center py-3">
                                    <div className="flex flex-col">
                                        <Typography>Balance</Typography>
                                        <Typography className='text-black' style={{ fontWeight: 600 }}>{balance} VND</Typography>
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography>Account number</Typography>
                                        <Typography className='text-black' style={{ fontWeight: 600 }}>{accountInfo.number}</Typography>
                                    </div>
                                </div>
                                <div className="grow flex flex-col border-t-2 py-3">
                                    <Typography>Branch opened the account</Typography>
                                    <Typography className='text-black' style={{ fontWeight: 600 }}>SWENBANK SAIGON</Typography>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            ) : <></>}

            {/* Các chức năng ở dưới */}
            <Paper
                className='row-span-2 grid grid-cols-3 justify-items-center content-center py-3 px-5'
                elevation={2}
                sx={{ borderRadius: '10px' }}
            >
                <Link to={role_id === 1? "admin/employees": role_id === 2? "transfer" : role_id === 3? "signup" : ""} style={{ textDecoration: 'none' }}>
                    <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                        <Button className="flex flex-grow">
                            <div className="flex flex-grow flex-col items-center gap-y-2">
                                <div style={{ height: '59px', width: '59px' }}><img src={FundTransfer} alt='FundTransfer' /></div>
                                <Typography className='text-black' style={{ textTransform: 'none' }}>{role_id === 1 ? "Employee Manager" : role_id === 2 ? "Fund Transfer" : role_id === 3 ? "Create Customer Account" : ""}</Typography>
                            </div>
                        </Button>
                    </div>
                </Link>
                <Link to={role_id === 1? "admin/transactions": role_id === 2? "debt" : role_id === 3? "deposit" : ""} style={{ textDecoration: 'none' }}>
                    <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                        <Button className="flex flex-grow">
                            <div className="flex flex-grow flex-col items-center gap-y-2">
                                <div style={{ height: '59px', width: '59px' }}><img src={DebtReminder} alt='DebtReminder' /></div>
                                <Typography className='text-black' style={{ textTransform: 'none' }}>{role_id === 1 ? "Transactions With Other Banks" : role_id === 2 ? "Debt Reminder Management" : role_id === 3 ? "Deposit Money" : ""}</Typography>
                            </div>
                        </Button>
                    </div>
                </Link>
                <Link to={role_id === 1 ? "recentTransaction" : role_id === 2 ? "" : role_id === 3 ? "lock" : ""} style={{ textDecoration: 'none' }}>
                    {role_id === 1 ? <></> : role_id === 3 ? (
                        <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                            <Button className="flex flex-grow">
                                <div className="flex flex-grow flex-col items-center gap-y-2">
                                    <div style={{ height: '59px', width: '59px' }}><img src={RecentTrans} alt='RecentTrans' /></div>
                                    <Typography className='text-black' style={{ textTransform: 'none' }}>Lock Client Account</Typography>
                                </div>
                            </Button>
                        </div>) : (
                        <div className="flex rounded-lg" style={{ backgroundColor: '#DAEEFF', height: '10vw', width: '10vw' }}>
                            <Button className="flex flex-grow">
                                <div className="flex flex-grow flex-col items-center gap-y-2">
                                    <div style={{ height: '59px', width: '59px' }}><img src={RecentTrans} alt='RecentTrans' /></div>
                                    <Typography className='text-black' style={{ textTransform: 'none' }}>Recent Transactions</Typography>
                                </div>
                            </Button>
                        </div>)}
                </Link>
            </Paper>
        </>
    )
}
