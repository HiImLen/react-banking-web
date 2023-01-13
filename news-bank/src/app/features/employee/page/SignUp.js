/* eslint-disable*/
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { instance } from '../../../../utils.js'

export default function SignUp () {
  const nagivate = useNavigate()
  const location = useLocation()

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()

  useEffect(() => {
    IsEmployee()
  })

  const IsEmployee = () => {
    const roleID = parseInt(localStorage.role_id)
    if (roleID === 2 || !localStorage.token) {
      nagivate('/')
    }
  }

  const onSubmit = async (data) => {
    // setError for all fields name, username, email, phone, password, password_repeat
    if (!data.name) {
      setError('name', { type: 'manual', message: 'Name cannot be empty.' })
    }
    if (!data.username) {
      setError('username', { type: 'manual', message: 'Username cannot be empty.' })
    }
    if (!data.email) {
      setError('email', { type: 'manual', message: 'Email cannot be empty.' })
    }
    if (!data.phone) {
      setError('phone', { type: 'manual', message: 'Phone cannot be empty.' })
    }
    if (!data.password) {
      setError('password', { type: 'manual', message: 'Password cannot be empty.' })
    }
    if (!data.password_repeat) {
      setError('password_repeat', { type: 'manual', message: 'Password repeat cannot be empty.' })
    }
    if (data.email && !data.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      setError('email', { type: 'manual', message: 'Email is not valid.' })
    }
    if (data.phone && !data.phone.match(/^\+?[0-9]{7,13}$/)) {
      setError('phone', { type: 'manual', message: 'Phone number is not valid.' })
    }
    if (data.password !== data.password_repeat) {
      if (!data.password_repeat && data.password) { setError('password_repeat', { type: 'manual', message: 'Repeat Password cannot be empty.' }) } else {
        setError('password', { type: 'manual', message: 'Passwords do not match.' })
        setError('password_repeat', { type: 'manual', message: 'Passwords do not match.' })
      }
      return
    }
    if (!data.name || !data.username || !data.email || !data.phone || !data.password || !data.password_repeat) {
      return
    }
    delete data.password_repeat
    try {
      const res = await instance.post('/Users', data)
      if (res.status === 201) {
        alert('Account created successfully.')
        // console.log(location.state);
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
        // alert('Cannot create account right now.');
        setError('error', { type: 'manual', message: 'Cannot create account right now.' })
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
            <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                    <div className="row">
                            <div className="p-5">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">Create an Account!</h4>
                                </div>
                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="exampleName" placeholder="Full Name" name="name" autoFocus {...register('name')} />
                                        {errors.name && <span className="error-message text-danger">{errors.name.message}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" autoFocus {...register('email')} />
                                        {errors.email && <span className="error-message text-danger">{errors.email.message}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="examplePhone" placeholder="Phone Number" name="phone" autoFocus {...register('phone')} />
                                        {errors.phone && <span className="error-message text-danger">{errors.phone.message}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="exampleUserName" placeholder="Username" name="username" autoFocus {...register('username')} />
                                        {errors.username && <span className="error-message text-danger">{errors.username.message}</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" autoFocus {...register('password')} />
                                            {errors.password && <span className="error-message text-danger">{errors.password.message}</span>}
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" autoFocus {...register('password_repeat')} />
                                            {errors.password_repeat && <span className="error-message text-danger">{errors.password_repeat.message}</span>}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {errors.error && <span className="error-message mb-3 text-danger">{errors.error.message}</span>}
                                    </div>
                                    <button className="btn btn-primary d-block btn-user w-100" type="submit" onClick={onReset}>Register Account</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
