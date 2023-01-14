import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { instance } from '../../../../utils.js'

export default function Deposit() {
  const navigate = useNavigate()
  const location = useLocation()
  const role_id = parseInt(useSelector(state => state.login.role_id))

  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  useEffect(() => {
    Access()
  })

  const Access = () => {
    if (!localStorage.token || role_id === 2) {
      navigate('/')
    }
  }

  const onSubmit = async (data) => {
    console.log('submit')
    if (!data.account_number) {
      setError('account_number', { type: 'manual', message: 'Account Number cannot be empty.' })
    }
    if (!data.balance) {
      setError('balance', { type: 'manual', message: 'Amount cannot be empty.' })
    }
    if (!data.account_number || !data.balance) {
      return
    }
    if (!data.account_number.match(/^32\d{3,7}$/)) {
      setError('account_number', { type: 'manual', message: 'Account Number is invalid.' })
      return
    }
    // amount cannot be negative and must be a integer
    if (data.balance < 0) {
      setError('balance', { type: 'manual', message: 'Amount cannot be negative.' })
      return
    }
    try {
      const res = await instance.post('/Accounts/DepositAccount', data)
      if (res.status === 201) {
        alert('Deposit successfully.')

        // console.log(location.state);
        const retUrl = location.state?.from?.pathname || '/'
        navigate(retUrl)
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        setError('deposit', { type: 'manual', message: error.response.data.message })
        // alert(JSON.stringify(error.response.data.message));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        setError('deposit', { type: 'manual', message: 'Cannot deposit right now.' })
        // alert('Cannot login right now.');
      } else {
        // Something happened in setting up the request that triggered an Error
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
                    <h4 className="text-dark mb-4">Deposit for Client</h4>
                  </div>
                  <form className="user" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <input className="form-control form-control-user" type="number" id="exampleInputAccountNumber" placeholder="Account Number" name="account_number" autoFocus {...register('account_number')} />
                      {errors.account_number && <span className="error-message text-danger">{errors.account_number.message}</span>}
                    </div>
                    <div className="mb-3">
                      <input className="form-control form-control-user" type="number" id="exampleInputBalance" placeholder="Amount" name="balance" autoFocus {...register('balance')} />
                      {errors.balance && <span className="error-message text-danger">{errors.balance.message}</span>}
                    </div>
                    <div className="mb-2 d-flex justify-content-center">
                        {errors.deposit && <span className="error-message mt-2 text-danger">{errors.deposit.message}</span>}
                      </div>
                    <button className="btn btn-primary d-block btn-user w-100" type="submit">
                      Deposit
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
