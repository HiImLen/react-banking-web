import ReCAPTCHA from "react-google-recaptcha";
import { set, useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import img_login from '../assets/img/login-img.jpeg';

import { instance, parseJwt } from '../utils.js';
export default function Login (props) {
    const nagivate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [capValue, setCapValue] = useState("");
    
    useEffect(() => {
        LoggedIn();
    }, []);

    const onSubmit = async (data) => {
        if (capValue == null || capValue == undefined || capValue == "") {
            alert('Please verify that you are not a robot.');
            return;
        }
        try {
            console.log(data);
            const res = await instance.post('/Users/Login', data);
            if (res.data.authenticated) {
                // console.log(res.data.token);
                localStorage.token = res.data.token;

                const obj = parseJwt(res.data.token);
                localStorage.userId = obj.userId;

                // console.log(location.state);
                const retUrl = location.state?.from?.pathname || '/';
                nagivate(retUrl);
            } else {
                alert('Invalid login.');
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

    const onChange = (value) => {
        //console.log("Captcha value:", value);
        setCapValue(value);
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
                                    <div className="flex-grow-1 bg-login-image" style={{ backgroundImage: "url(" + img_login + ")" }} />
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">Welcome Back!</h4>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <input className="form-control form-control-user" type="username" id="exampleInputUsername" placeholder="Username" name="username" autoFocus {...register('username', { required: true })} />
                                                {errors.username && <span className="error-message">*</span>}
                                            </div>
                                            <div className="mb-3">
                                                <input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" autoFocus {...register('password', { required: true })} />
                                                {errors.password && <span className="error-message">*</span>}
                                            </div>
                                            <div className="mb-3">
                                                <div className="custom-control custom-checkbox small">
                                                    <div className="form-check"><input className="form-check-input custom-control-input" type="checkbox" id="formCheck-1" /><label className="form-check-label custom-control-label" htmlFor="formCheck-1">Remember Me</label></div>
                                                </div>
                                            </div>
                                            <div className="mb-3 d-flex justify-content-center">
                                                <ReCAPTCHA
                                                    sitekey="6Le2nbMjAAAAAOhaMDHl3jYdxh0GF4YQ3sMaHYCz"
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <button className="btn btn-primary d-block btn-user w-100" type="submit">
                                                Login
                                            </button>
                                            <hr />
                                        </form>
                                        <div className="text-center"><Link to ="/forgot">Forgot Password?</Link></div>
                                        <div className="text-center"><Link to ="/signup">Create an Account!</Link></div>
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