import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import avt from '../../assets/img/avt2.svg'
import { instance } from '../../utils.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function InternalTransfer() {
  const { register, handleSubmit, setValue, setError,clearErrors, formState: { errors } } = useForm();
  const [destinationOwnerName, setDestinationOwnerName] = useState("");
  const nagivate = useNavigate();
  const onSubmit = async (data) => {
    try {
        console.log(data);
        const accountOfUser = await instance.get('/Users/Accounts');
        console.log(accountOfUser);
        const transactionData = {
            ...data,
            source_account_number: accountOfUser.data.data.number,
            destination_bank_id: 1,
        }
        console.log(transactionData);
        const res = await instance.post('/Transactions', transactionData);
        console.log(res);
        if (res.data.status === "success"){
            nagivate('/otpVerify')
        }
    } catch (error) {
      console.log(error);   
    }
  } 
  const valueOfMoney= [100000,200000,500000,1000000,2000000,5000000]
  console.log(errors);
  
  return (
    <div className='grid grid-cols-5 mb-10'>
        <div/>
        <div className='col-span-3 flex flex-col'>
            <Paper 
                className='flex flex-row justify-center gap-x-4 py-3' 
                elevation={3}
                sx={{borderRadius: '10px'}}
            >
                <img src={avt} alt='avatar'/>
                <div className='flex flex-col justify-center'>
                    <Typography className='text-black text-left'>1309 05452 55215</Typography>
                    <Typography className='text-black text-left' style={{fontWeight:600}}>1,600,000 VND</Typography>

                </div>
            </Paper>
            <div className='pt-6'>
                <Typography className="font-semibold text-lg leading-6">Transfer to</Typography>
                <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField className='border-sky-500 border-2 w-full' id="outlined-basic" placeholder="Account number" variant="outlined" {...register("destination_account_number", {required: true})} onBlur={async (data) => {
                            console.log(data.target.value)
                            const account = await instance.get(`/Accounts/${data.target.value}/Internal`)
                            if (account.status === 200 && account.data.status === "success"){
                                setDestinationOwnerName(account.data.data.username)
                                clearErrors('destination_account_number');
                            }else {
                                console.log(account);
                                setError('destination_account_number', { type: 'custom', message: "Invalid account number" });
                                setDestinationOwnerName("")
                            }
                        }} />
                        {errors.destination_account_number && <p className='text-red-500'>{errors.destination_account_number.message}</p>}
                    </div>
                    {destinationOwnerName !== "" ?
                        (
                            <TextField className='border-sky-500 border-2' id="outlined-basic" placeholder="The recipient name"variant="outlined" value={destinationOwnerName} disabled/>
                        ):(<></>)}
                    <FormControl>
                        <InputLabel id="form-paid-fee-label">Select a form of fee payment</InputLabel>
                        <Select labelId="form-paid-fee-label" label="Select a form of fee payment" defaultValue={true} {...register("fee_is_paid_by_receiver")}>
                            <MenuItem value={true}>Paid receiver</MenuItem>
                            <MenuItem value={false}>Paid sender</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className='border-sky-500 border-2' id="outlined-basic" placeholder="Amount VND" variant="outlined" {...register("amount", {required: true})} type="number" />
                    <Box className="grid grid-cols-3 grid-rows-2 gap-y-5 gap-x-3">
                        {valueOfMoney.map((data,index) => (<Button key={`${index}-button-money`} style={{background: "#E0E0E0", borderRadius: "15px", color:"black"}} className="py-2" value={data} onClick={() => {
                            setValue("amount", data);
                        }}>{data.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Button>))}
                    </Box>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        placeholder='Transaction from ...'
                        {...register("note")}
                    />
                    <Button className="mx-5"variant="contained" color='primary' type="submit" sx={{borderRadius: "10px", background:"#4D54E4", 
                        '&:hover': {
                            background:"#2a2e80"
                        }
                    }}>Comfirm</Button>
                </form>
            </div>
        </div>
    </div>
  );
}