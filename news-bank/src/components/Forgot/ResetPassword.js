import React from 'react'
import { useForm } from 'react-hook-form'
import { instance } from '../../utils.js'

export default function ResetPassword (props) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    if (data.username === null || data.username === undefined || data.username === '') {
      setError('username', { type: 'manual', message: 'Username cannot be empty.' })
      return
    }
    try {
      console.log(data)
      const res = await instance.post('/Users/ResetPassword', data)
      if (res.status === 200) {
        // alert('Please check your email for the reset password OTP.')
        props.onSetEmail(res.data.email)
        props.onResetPassword(true)

        // const retUrl = location.state?.from?.pathname || '/';
        // nagivate(retUrl);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        // alert(JSON.stringify(error.response.data.message));
        setError('error', { type: 'manual', message: error.response.data.message })
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        // alert('Cannot reset password right now.');
        setError('error', { type: 'manual', message: 'Cannot reset password right now.' })
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    }
  }

  return (
        <div className="container">
            <div className="text-center">
                <h4 className="text-dark mb-3">Forgot Your Password?</h4>
                <p>We get it, stuff happens!</p>
                <p className="mb-4">Just enter your username and we will send you an OTP to your email to reset your password!</p>
            </div>
            <form className="user" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input className="form-control form-control-user" type="text" id="exampleUserName" placeholder="Enter Username..." name="username" autoFocus {...register('username')} />
                    {errors.username && <span className="error-message text-danger">{errors.username.message}</span>}
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    {errors.error && <span className="error-message text-danger">{errors.error.message}</span>}
                </div>
                <button className="btn btn-primary d-block btn-user w-100" type="submit">Reset Password</button>
            </form>
        </div>
  )
}
