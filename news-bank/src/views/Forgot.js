import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import imgForgot from '../assets/img/forgot.jpg'
import ResetPassword from '../components/Forgot/ResetPassword'
import VerifyOTP from '../components/Forgot/VerifyOTP'

export default function Forgot () {
  const nagivate = useNavigate()
  // const location = useLocation();

  const [isReset, setIsReset] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    LoggedIn()
  })

  const onSetEmail = (email) => {
    setEmail(email)
  }

  const onResetPassword = () => {
    setIsReset(true)
  }

  const onExpiredOTP = () => {
    setIsReset(false)
  }

  const LoggedIn = () => {
    if (localStorage.token) {
      nagivate('/')
    }
  }

  return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="flex-grow-1 bg-password-image" style={{ backgroundImage: 'url(' + imgForgot + ')' }} />
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        {isReset ? <VerifyOTP onExpiredOTP={onExpiredOTP} email={email} /> : <ResetPassword onResetPassword={onResetPassword} onSetEmail={onSetEmail} />}
                                        <hr />
                                        <div className="text-center small"><Link to ="/login">Already have an account? Login!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
