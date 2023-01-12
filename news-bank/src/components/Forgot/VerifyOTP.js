import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { instance } from '../../utils.js'

export default function VerifyOTP () {
  const nagivate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    if (!data.otp) {
      setError('otp', { type: 'manual', message: 'OTP cannot be empty.' })
    }
    if (!data.password) {
      setError('password', { type: 'manual', message: 'Password cannot be empty.' })
    }
    if (!data.password_repeat) {
      setError('password_repeat', { type: 'manual', message: 'Repeat Password cannot be empty.' })
    }
    if (data.password !== data.password_repeat) {
      if (!data.password_repeat && data.password) { setError('password_repeat', { type: 'manual', message: 'Repeat Password cannot be empty.' }) } else {
        setError('password', { type: 'manual', message: 'Passwords do not match.' })
        setError('password_repeat', { type: 'manual', message: 'Passwords do not match.' })
      }
      return
    }
    if (!data.otp || !data.password || !data.password_repeat || data.password !== data.password_repeat) {
      return
    }
    delete data.password_repeat
    try {
      console.log(data)
      const res = await instance.post('/Users/VerifyOTP', data)
      if (res.status === 200) {
        alert('Reset password successfully. You can now login with your new password!')

        const retUrl = location.state?.from?.pathname || '/'
        nagivate(retUrl)
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

  const onReset = () => {
    clearErrors('error')
  }

  return (
        <div className="container">
            <div className="text-center">
                <h4 className="text-dark mb-3">Forgot Your Password?</h4>
                <p className="mb-4">An OTP has been sent to your email!</p>
            </div>
            <form className="user" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input className="form-control form-control-user" type="text" id="exampleOTP" placeholder="Enter OTP..." name="otp" autoFocus {...register('otp')} />
                    {errors.otp && <span className="error-message text-danger">{errors.otp.message}</span>}
                </div>
                <div className="row mb-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="New Password" name="password" autoFocus {...register('password')} />
                        {errors.password && <span className="error-message text-danger">{errors.password.message}</span>}
                    </div>
                    <div className="col-sm-6 mb-3">
                        <input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat New Password" name="password_repeat" autoFocus {...register('password_repeat')} />
                        {errors.password_repeat && <span className="error-message text-danger">{errors.password_repeat.message}</span>}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {errors.error && <span className="error-message mb-3 text-danger">{errors.error.message}</span>}
                </div>
                <button className="btn btn-primary d-block btn-user w-100" type="submit" onClick={onReset}>Reset Password</button>
            </form>
        </div>
  )
}
