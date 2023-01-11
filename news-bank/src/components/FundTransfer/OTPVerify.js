import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button, Paper, Typography } from '@mui/material';

export default function OTPVerify() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <div>abc</div>
  );
}