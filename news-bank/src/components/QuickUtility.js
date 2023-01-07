import { Box, Button, Paper, Typography } from "@mui/material";
import TransferWithinBank from '../assets/img/Quick utility/TransferWithinBank.svg';
import InterbankTransfer from '../assets/img/Quick utility/InterbankTransfer.svg';
import RecentTransaction from '../assets/img/Quick utility/RecentTransaction.svg';


export default function QuickUtility() {
    return(
        <div className="grid grid-rows-5">
            <Paper 
                className='row-span-3 p-3 space-y-2' 
                elevation={2}
                sx={{borderRadius: '10px'}}
            >
                <Typography className='text-black text-left' style={{fontWeight:600}}>Quick Utility</Typography>
                <div className="grid grid-rows-3 gap-y-5">
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-row flex-grow justify-items-stretch ">
                                <img src={TransferWithinBank} alt='TransferWithinBank'/>
                                <Typography className='text-black text-left' style={{textTransform: 'none'}}>Transfer Within Bank</Typography>
                            </Button>
                        </Box>
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-row flex-grow justify-around ">
                                <img src={InterbankTransfer} alt='InterbankTransfer'/>
                                <Typography className='text-black text-left' style={{textTransform: 'none'}}>Interbank Transfer</Typography>
                            </Button>
                        </Box>
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-row flex-grow justify-around ">
                                <img src={RecentTransaction} alt='RecentTransaction'/>
                                <Typography className='text-black text-left' style={{textTransform: 'none'}}>Recent Transactions</Typography>
                            </Button>
                        </Box>
                </div>
            </Paper>
        </div>
    );
}