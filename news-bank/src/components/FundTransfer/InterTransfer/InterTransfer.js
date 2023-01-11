import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button, Paper, Typography } from '@mui/material';
import avt from '../../../assets/img/avt2.svg'

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <div className='grid grid-cols-5'>
        <div/>
        <div className='col-span-3 flex flex-col gap-y-10'>
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
            <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <select className='border-sky-500 border-2 rounded-md h-10' {...register("Bank", { required: true })}>
                    <option value="Vietinbank">Vietinbank</option>
                    <option value="TPbank">TP Bank</option>
                    <option value="BIDV">BIDV</option>
                </select>
                <TextField className='border-sky-500 border-2' id="outlined-basic" label="The recipient name" variant="outlined" {...register("The recipient name", {required: true, maxLength: 100})} />
                <input className='border-sky-500 border-2 rounded-md h-10' type="text" placeholder="Email" 
                    {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} 
                    aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
                <input className='border-sky-500 border-2 rounded-md h-10' type="tel" placeholder="Amount VND" {...register("Amount VND", {required: true, minLength: 4, maxLength: 9})} />
                <select className='border-sky-500 border-2 rounded-md h-10' placeholder="Select a form of payment fee" {...register("Payment fee", { required: true })}>
                    <option value="Paid receiver">Paid receiver</option>
                    <option value="Paid sender">Paid sender</option>
                </select>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    placeholder='Transaction from ...'
                    {...register("Description", {required: true})}
                />
                <Button className='rounded-md' color='primary' type="submit">Comfirm</Button>
            </form>
        </div>
    </div>
  );
}