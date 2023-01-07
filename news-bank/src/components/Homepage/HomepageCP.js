import { Box, Paper, Typography } from "@mui/material";
import ATMPic from '../../assets/img/ATM_pic.svg'

export default function HomepageCP() {
    return(
        <div className="grid grid-rows-5">
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
                    <Box 
                        className="p"
                        style={{
                            backgroundImage: `url(${ATMPic})`, 
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain', 
                            }}
                    >
                    </Box>
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
        </div>
    )
}
