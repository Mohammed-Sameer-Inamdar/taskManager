import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LockIcon, Spinner } from '../../utils/icons';
import CustomInput from '../common/CustomInput';
import { loginApi } from '../../store/apis/authApi';
import { showMessage } from '../../store/slices/dialogSlice';
import ConfirmLogout from '../common/ConfirmLogout';
import { accessToken } from '../../store/slices/authSlice';

export const LoginPge = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(accessToken);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEmailError('');
    }, [email])


    useEffect(() => {
        setPasswordError('');
    }, [password])

    const emailInputChange = (e) => setEmail(e.target.value);
    const passwordInputChange = (e) => setPassword(e.target.value);

    const isValidForm = () => {
        let isValid = true;
        if (!email || !email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!password || !password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isValidForm()) {
                return;
            }
            setIsLoading(true);

            await dispatch(loginApi({ email, password })).unwrap();
            navigate('/');
            dispatch(showMessage({ message: 'Login successful', type: 'success' }));
        } catch (err) {
        } finally {
            setIsLoading(false);
        }
    }

    const logoutCancel = () => {
        navigate('/');
    }

    return (
        <div className='flex justify-center'>
            <section className='container'>
                <div className="p-5 w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='sm:mx-auto sm:w-full sm:mx-w-sm flex flex-col justify-center items-center'>
                        <LockIcon width={30} height={30} />
                        <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-grey-900'>Login</h1>
                    </div>
                    <div className='mt-10 sm:w-full'>

                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <CustomInput label='Email' errorMessage={emailError} id='email' name='email' value={email} onChange={emailInputChange} />
                            <CustomInput label='Password' errorMessage={passwordError} id='password' name='password' value={password} onChange={passwordInputChange} type="password" />

                            <div className='flex flex-col justify-center items-center'>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>Login {isLoading && <Spinner tintColor={"#fff"} />}</button>
                            </div>

                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member? <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up</Link>
                        </p>
                    </div>
                </div>
            </section>
            <ConfirmLogout open={token ? true : false} onCancel={logoutCancel} />
        </div>
    )

}

export default LoginPge;