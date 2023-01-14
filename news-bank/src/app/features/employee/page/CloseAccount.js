import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { instance, parseJwt } from '../../../../utils.js'

export default function CloseAccount() {
  const nagivate = useNavigate()
  const location = useLocation()
  const role_id = parseInt(useSelector(state => state.login.role_id))
  const user_id = parseInt(useSelector(state => state.login.user_id))

  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  useEffect(() => {
    Access()
  })

  const Access = () => {
    if (!localStorage.token || role_id === 1) {
      nagivate('/')
    }
  }

  const onClick = async () => {
    if (role_id === 3) return;
    try {
      const url = '/Users/Account/' + user_id;
      const res = await instance.delete(url)
      if (res.status === 201) {
        alert('Account closed successfully.')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        dispatch(clearLoginInfo())
        
        nagivate('/login')
      }
    } catch (error) {
      if (error.response) {
        setError('close', { type: 'manual', message: error.response.data.message })
      } else if (error.request) {
        setError('close', { type: 'manual', message: 'Cannot close account right now.' })
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
    }
  }

  const onSubmit = async (data) => {
    if (role_id === 2) return;
    if (!data.account_number) {
      setError('account_number', { type: 'manual', message: 'Account Number cannot be empty.' })
    }
    if (!data.account_number) {
      return
    }
    if (!data.account_number.match(/^32\d{3,7}$/)) {
      setError('account_number', { type: 'manual', message: 'Account Number is invalid.' })
      return
    }
    try {
      const url = '/Accounts/' + data.account_number + '/Internal';
      const res = await instance.get(url, data);
      if (res.status === 200) {
        try {
          const url = '/Users/Account/' + res.data.data.user_id;
          const res1 = await instance.delete(url)
          if (res1.status === 201) {
            alert('Account closed successfully.')

            const retUrl = location.state?.from?.pathname || '/'
            nagivate(retUrl)
          }
        } catch (error) {
          if (error.response) {
            setError('close', { type: 'manual', message: error.response.data.message })
          } else if (error.request) {
            setError('close', { type: 'manual', message: 'Cannot close account right now.' })
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        }
      }
    } catch (error) {
      if (error.response) {
        setError('close', { type: 'manual', message: error.response.data.message })
      } else if (error.request) {
        setError('close', { type: 'manual', message: 'Cannot close account right now.' })
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-12 col-xl-10">
          <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-2">Close {role_id === 3 ? "Client" : ""} Account</h4>
                  </div>
                  <div className="text-center">
                    <h5 className="text-danger mb-4">Caution! This action is irreversible!</h5>
                  </div>
                  <form className="user" onSubmit={handleSubmit(onSubmit)}>
                    {role_id === 3 ?
                      <div className="mb-3">
                        <input className="form-control form-control-user" type="number" id="exampleInputAccountNumber" placeholder="Account Number" name="account_number" autoFocus {...register('account_number')} />
                        {errors.account_number && <span className="error-message text-danger">{errors.account_number.message}</span>}
                      </div>
                      : null}
                    <div className="mb-2 d-flex justify-content-center">
                      {errors.close && <span className="error-message mt-2 text-danger">{errors.close.message}</span>}
                    </div>
                    <button className="btn btn-primary d-block btn-user w-100" type="submit " onClick={onClick}>
                      Close Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
