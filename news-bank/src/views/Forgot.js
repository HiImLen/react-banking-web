import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import img_forgot from '../assets/img/forgot.jpg';

import { instance, parseJwt } from '../utils.js';
export default function Login(props) {
    const nagivate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        LoggedIn();
    });

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const res = await instance.post('/Users/ResetPassword', data);
            if (res.status === 200) {
                alert('Please check your email for the reset password link.');

                // const retUrl = location.state?.from?.pathname || '/';
                // nagivate(retUrl);
            } else {
                alert('Cannot reset password right now.');
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert(error.response.status + ' ' + JSON.stringify(error.response.data));
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    const LoggedIn = () => {
        if (localStorage.token) {
            nagivate('/');
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
                                    <div className="flex-grow-1 bg-password-image" style={{ backgroundImage: "url(" + img_forgot + ")" }} />
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h4 className="text-dark mb-2">Forgot Your Password?</h4>
                                            <p className="mb-4">We get it, stuff happens. Just enter your email address and we'll send you an OTP to reset your password!</p>
                                        </div>
                                        <form className="user">
                                            <div className="mb-3">
                                                <input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" />
                                            </div>
                                            <button className="btn btn-primary d-block btn-user w-100" type="submit">Reset Password</button>
                                        </form>
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
    );
}