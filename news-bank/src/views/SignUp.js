import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import sign_up_img from '../assets/img/Banking-_Services.jpg';

import { instance } from '../utils.js';
export default function SignUp(props) {
    const nagivate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        IsEmployee();
    });

    const onSubmit = async (data) => {
        try {
            //console.log(data);
            const res = await instance.post('/Users', data);
            if (res.status === 201) {
                alert('Account created successfully.');
                // console.log(location.state);
                const retUrl = location.state?.from?.pathname || '/';
                nagivate(retUrl);
            } else if (res.status === 401) {
                alert('User already exist.');
            } else if (res.status === 403) {
                alert('You do not have permission to create account.');
            }
            else {
                alert('Cannot create account right now.');
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

    const IsEmployee = () => {
        if (localStorage.role_id === 2) {
            nagivate('/');
        }
    }

    return (
        <div className="container">
            <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-flex">
                            <div className="flex-grow-1 bg-register-image" style={{ backgroundImage: "url(" + sign_up_img + ")" }} />
                        </div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">Create an Account!</h4>
                                </div>
                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="exampleName" placeholder="Full Name" name="name" autoFocus {...register('name', { required: true })} />
                                        {errors.name && <span className="error-message">Name cannot be empty</span>}
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" autoFocus {...register('email', { required: true })} />
                                        {errors.email && <span className="error-message">Email cannot be empty</span>}
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="examplePhone" placeholder="Phone Number" name="phone" autoFocus {...register('phone', { required: true })} />
                                        {errors.phone && <span className="error-message">Phone cannot be empty</span>}
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control form-control-user" type="text" id="exampleUserName" placeholder="Username" name="username" autoFocus {...register('username', { required: true })} />
                                        {errors.username && <span className="error-message">Username cannot be empty</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" autoFocus {...register('password', { required: true })} />
                                            {errors.password && <span className="error-message">Password cannot be empty</span>}
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}