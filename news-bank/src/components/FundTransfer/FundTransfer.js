import React  from 'react';
import { Button, Paper, Typography } from "@mui/material";
import WithinBank from '../../assets/icon/FundTransfer/WithinBank.svg';
import InterTransfer from '../../assets/icon/FundTransfer/InterTransfer.svg';


export default function FundTransfer() {
    return(
        <Paper 
            className='grid grid-cols-3 justify-items-center content-center py-3 px-5' 
            elevation={2}
            sx={{borderRadius: '10px'}}
        >
            <div className="flex rounded-lg" style={{backgroundColor:'#DAEEFF', height:'10vw', width:'10vw'}}>
                <Button className="flex flex-grow">
                    <div className="flex flex-grow flex-col items-center gap-y-2">
                        <div style={{height:'59px', width:'59px'}}><img src={WithinBank} alt='WithinBank'/></div>
                        <Typography className='text-black' style={{textTransform:'none'}}>Transfer Within Bank</Typography>   
                    </div>
                </Button>
            </div>
            <div className="flex rounded-lg" style={{backgroundColor:'#DAEEFF', height:'10vw', width:'10vw'}}>
                <Button className="flex flex-grow">
                    <div className="flex flex-grow flex-col items-center gap-y-2">
                        <div style={{height:'59px', width:'59px'}}><img src={InterTransfer} alt='InterTransfer'/></div>
                        <Typography className='text-black' style={{textTransform:'none'}}>Interbank Transfer</Typography>   
                    </div>
                </Button>
            </div>
        </Paper>
    )
}