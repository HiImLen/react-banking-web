import { set, useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dog2 from '../assets/img/dogs/image2.jpeg';

import { instance, parseJwt } from '../utils.js';
export default function SignUp(props) {
    const nagivate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        LoggedIn();
    }, []);

    const onSubmit = async (data) => {
        try {
            //console.log(data);
            const res = await instance.post('/Users', data);
            if (res.data.authenticated) {
                // console.log(res.data.accessToken);
                localStorage.accessToken = res.data.accessToken;

                const obj = parseJwt(res.data.accessToken);
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

    const LoggedIn = () => {
        if (localStorage.token) {
            nagivate('/');
        }
    }

    return (
        <div className="container">
            <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-flex">
                            <div className="flex-grow-1 bg-register-image" style={{ backgroundImage: "url(" + dog2 + ")" }} />
                        </div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">Create an Account!</h4>
                                </div>
                                <form className="user">
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="exampleName" placeholder="Full Name" name="name" />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="examplePhone" placeholder="Phone Number" name="phone" />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="exampleUserName" placeholder="Username" name="username" />
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" />
                                        </div>
                                        <div className="col-sm-6">
                                            <input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
                                    <hr />
                                </form>
                                <div className="text-center"><Link to="/forgot">Forgot Password?</Link></div>
                                <div className="text-center"><Link to="/login">Already have an account? Login!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}