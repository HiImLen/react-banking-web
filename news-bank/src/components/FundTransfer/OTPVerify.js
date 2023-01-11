import { Button, Typography } from '@mui/material';
import React, { Component } from 'react';
import OtpInput from 'react-otp-input';

export default class App extends Component {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);
  //console.log(errors);
  state = { otp: '' };

  handleChange = (otp) => this.setState({ otp });

  render() {
    return (
      <div className='flex flex-col items-center justify-center space-y-5'>
        <Typography className='text-black' style={{fontWeight:600, fontSize:'24px'}}>Enter OTP</Typography>
        <Typography className='text-black'>We Will send you a OTP code on this Mail Address</Typography>

        <OtpInput
          value={this.state.otp}
          onChange={this.handleChange}
          numInputs={6}
          isInputNum={true}
          inputStyle={'border-2 border-blue-500'}
          containerStyle={'space-x-10'}
          shouldAutoFocus={true}
          isInputSecure={true}
          focusStyle={'border-2 border-red-500'}
          placeholder={'hehe'}
        />
        <div className='flex flex-row space-x-3'>
          <Typography className='text-black'>Do not recieved OTP ?</Typography>
          <Typography className='text-black'>Resend OTP</Typography>
        </div>
        <Button className="mx-5 w-48"variant="contained" color='primary' type="submit" sx={{borderRadius: "10px", background:"#4D54E4", 
            '&:hover': {
                background:"#2a2e80"
            }
        }}>Verify</Button>
      </div>
    );
  }
}