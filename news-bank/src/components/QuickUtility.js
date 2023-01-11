import React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import TransferWithinBank from '../assets/img/Quick utility/TransferWithinBank.svg';
import InterbankTransfer from '../assets/img/Quick utility/InterbankTransfer.svg';
import RecentTransaction from '../assets/img/Quick utility/RecentTransaction.svg';
import RightArrow from '../assets/icon/RightArrow.svg';
import { useNavigate } from "react-router";

export default function QuickUtility() {
    const nagivate = useNavigate();
    return(
        // gồm 3 button chức năng
        <div className="grid grid-rows-5">
            <Paper 
                className='row-span-3 p-3 space-y-2' 
                elevation={2}
                sx={{borderRadius: '10px'}}
            >
                <Typography className='text-black text-left' style={{fontWeight:600}}>Quick Utility</Typography>
                <div className="grid grid-rows-3 gap-y-5">
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-grow">
                                <Box className="flex flex-row flex-grow justify-between px-2">
                                    <img src={TransferWithinBank} alt='TransferWithinBank'/>
                                    <button onClick={() => {nagivate('/transfer/internal')}}>
                                        <Typography className='text-black text-left self-center' style={{textTransform: 'none'}}>Transfer Within Bank</Typography>
                                    </button>
                                    <img src={RightArrow} alt='RightArrow'/>
                                </Box>
                            </Button>
                        </Box>
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-grow">
                                <Box className="flex flex-row flex-grow justify-between px-2">
                                    <img src={InterbankTransfer} alt='InterbankTransfer'/>
                                    <Typography className='text-black text-left self-center' style={{textTransform: 'none'}}>Interbank Transfer</Typography>
                                    <img src={RightArrow} alt='RightArrow'/>
                                </Box>
                            </Button>
                        </Box>
                        <Box className="flex border-2 rounded-md">
                            <Button className="flex flex-grow">
                                <Box className="flex flex-row flex-grow justify-between px-2">
                                    <img src={RecentTransaction} alt='RecentTransaction'/>
                                    <Typography className='text-black text-left self-center' style={{textTransform: 'none'}}>Recent Transactions</Typography>
                                    <img src={RightArrow} alt='RightArrow'/>
                                </Box>
                            </Button>
                        </Box>
                </div>
            </Paper>
        </div>
    );
}