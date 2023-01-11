import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import img_login from '../assets/img/login-img.jpeg';
import { instance, parseJwt } from '../utils.js';

export default function Login(props) {
    const nagivate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm();
    const [capValue, setCapValue] = useState("");

    useEffect(() => {
        LoggedIn();
    });

    const onSubmit = async (data) => {
        console.log("submit");
        if (!capValue) {
            //alert('Please verify that you are not a robot.');
            setError('captcha', { type: 'manual', message: 'Please verify that you are not a robot.' });
        }
        if (!data.username) {
            setError('username', { type: 'manual', message: 'Username cannot be empty.' });
        }
        if (!data.password) {
            setError('password', { type: 'manual', message: 'Password cannot be empty.' });
        }
        if (!data.username || !data.password || !capValue) {
            return;
        }
        try {
            console.log(data);
            const res = await instance.post('/Users/Login', data);
            if (res.status === 200) {
                console.log(res);
                localStorage.token = res.data.data.token;
                localStorage.refreshToken = res.data.data.refreshToken;

                // console.log(location.state);
                const retUrl = location.state?.from?.pathname || '/';
                nagivate(retUrl);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setError('login', { type: 'manual', message: error.response.data.message });
                //alert(JSON.stringify(error.response.data.message));
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                setError('login', { type: 'manual', message: 'Cannot login right now.' });
                //alert('Cannot login right now.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    const onChange = (value) => {
        setCapValue(value);
        clearErrors('captcha');
        //console.log("Captcha value:", capValue);
    }

    const onReset = () => {
        if (capValue) {
            clearErrors(['captcha', 'login']);    
        } else {
            setCapValue("");
            clearErrors(['captcha', 'login']);
        }
      };

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
                                                <input className="form-control form-control-user" type="username" id="exampleInputUsername" placeholder="Username" name="username" autoFocus {...register('username')} />
                                                {errors.username && <span className="error-message text-danger">{errors.username.message}</span>}
                                            </div>
                                            <div className="mb-3">
                                                <input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" autoFocus {...register('password')} />
                                                {errors.password && <span className="error-message text-danger">{errors.password.message}</span>}
                                            </div>
                                            {/* <div className="mb-3">
                                                <div className="custom-control custom-checkbox small">
                                                    <div className="form-check"><input className="form-check-input custom-control-input" type="checkbox" id="formCheck-1" /><label className="form-check-label custom-control-label" htmlFor="formCheck-1">Remember Me</label></div>
                                                </div>
                                            </div> */}
                                            <div className="d-flex justify-content-center">
                                                <ReCAPTCHA
                                                    sitekey="6Le2nbMjAAAAAOhaMDHl3jYdxh0GF4YQ3sMaHYCz"
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="mb-3 d-flex justify-content-center">
                                                {errors.captcha && <span className="error-message mt-2 text-danger">{errors.captcha.message}</span>}
                                                {errors.login && <span className="error-message mt-2 text-danger">{errors.login.message}</span>}
                                            </div>
                                            <button className="btn btn-primary d-block btn-user w-100" type="submit" onClick={onReset}>
                                                Login
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center small"><Link to="/forgot">Forgot Password?</Link></div>
                                        {/* <div className="text-center small"><Link to ="/signup">Create an Account!</Link></div> */}
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