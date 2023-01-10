import { Box, Button, Paper, Typography } from "@mui/material";
import ATMPic from '../../assets/img/ATM_pic.svg';
import FundTransfer from '../../assets/icon/FundTransfer.svg';
import DebtReminder from '../../assets/icon/DebtReminder.svg';
import RecentTrans from '../../assets/icon/RecentTrans.svg';

export default function HomepageCP() {
    return(
        // Những phần ở giữa hompage và ko bao gồm QuickUtility
        <div className="grid grid-rows-5 gap-y-14">
            {/* Chi tiết thông tin card */}
            <Paper 
                className='row-span-3 grid grid-rows-6 py-3 px-5' 
                elevation={2}
                sx={{borderRadius: '10px'}}
                >
                <div className="grid grid-cols-2">
                    <Typography className='text-black' style={{fontWeight:600}}>My Card</Typography>
                    <Typography className='text-black text-left' style={{fontWeight:600}}>Details</Typography>
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
                        <div className="grid grid-rows-3">
                            <Typography className='text-white' style={{fontWeight:600}}>1309 05452 55215</Typography>
                            <Typography className='text-white'>01/01/2023</Typography>
                            <Typography className='text-white' style={{textTransform:'uppercase'}}>Do Tien Trung</Typography>
                        </div>
                    </Box>
                    {/* Thông tin chi tiết */}
                    <div className="grid grid-rows-3 content-center">
                        <div className="grid grid-cols-2 content-center py-3">
                            <div className="flex flex-col">
                                <Typography>Balance</Typography>
                                <Typography className='text-black' style={{fontWeight:600}}>1,600,000 VND</Typography>   
                            </div>
                            <div className="flex flex-col">
                                <Typography>Interest rate</Typography>
                                <Typography className='text-black' style={{fontWeight:600}}>0.5% / year</Typography>   
                            </div>
                        </div>
                        <div className="grid grid-cols-2 content-center border-t-2 py-3">
                            <div className="flex flex-col">
                                <Typography>Account number</Typography>
                                <Typography className='text-black' style={{fontWeight:600}}>0308 2417 001</Typography>   
                            </div>
                            <div className="flex flex-col">
                                <Typography>Account open date</Typography>
                                <Typography className='text-black' style={{fontWeight:600}}>01/01/2023</Typography>   
                            </div>
                        </div>
                        <div className="grow flex flex-col border-t-2 py-3">
                            <Typography>Branch opened the account</Typography>
                            <Typography className='text-black' style={{fontWeight:600}}>SWENBANK SAIGON</Typography>   
                        </div>
                    </div>
                </div>
            </Paper> 
            {/* Các chức năng ở dưới */}
            <Paper 
                className='row-span-2 grid grid-cols-3 justify-items-center content-center py-3 px-5' 
                elevation={2}
                sx={{borderRadius: '10px'}}
            >
                <div className="flex rounded-lg" style={{backgroundColor:'#DAEEFF', height:'10vw', width:'10vw'}}>
                    <Button className="flex flex-grow">
                        <div className="flex flex-grow flex-col items-center gap-y-2">
                            <div style={{height:'59px', width:'59px'}}><img src={FundTransfer} alt='FundTransfer'/></div>
                            <Typography className='text-black' style={{textTransform:'none'}}>Fund Transfer</Typography>   
                        </div>
                    </Button>
                </div>
                <div className="flex rounded-lg" style={{backgroundColor:'#DAEEFF', height:'10vw', width:'10vw'}}>
                    <Button className="flex flex-grow">
                        <div className="flex flex-grow flex-col items-center gap-y-2">
                            <div style={{height:'59px', width:'59px'}}><img src={DebtReminder} alt='DebtReminder'/></div>
                            <Typography className='text-black' style={{textTransform:'none'}}>Debt Reminder Management</Typography>   
                        </div>
                    </Button>
                </div>
                <div className="flex rounded-lg" style={{backgroundColor:'#DAEEFF', height:'10vw', width:'10vw'}}>
                    <Button className="flex flex-grow">
                        <div className="flex flex-grow flex-col items-center gap-y-2">
                            <div style={{height:'59px', width:'59px'}}><img src={RecentTrans} alt='RecentTrans'/></div>
                            <Typography className='text-black' style={{textTransform:'none'}}>Recent Transactions</Typography>   
                        </div>
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
