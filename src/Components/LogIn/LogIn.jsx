import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { log_in } from './LogIn.js';
import Loading from '../Loading/Loading.jsx';
import './LogIn.scss';

const LogIn = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => localStorage.clear(), [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let form = document.querySelector('.login-container-reg-form');
        let response = await log_in(form.login.value, form.password.value);
        setIsLoading(false);
        if (response) navigate('/home', { replace: true });
        else alert("Login or Password was incorrect.");
    }

    return (
        <>
            {
                isLoading && <Loading />
            }
            <div className='login'>
                <div className='login-container'>
                    <form onSubmit={handleSubmit} className='login-container-reg-form'>
                        <legend className='login-container-reg-form-legend'>Class Up</legend>
                        <hr />
                        <input required placeholder='Login'
                            type='text' name='login'
                            className='login-container-reg-form-input-login'
                            value={login}
                            onChange={e => setLogin(e.target.value)} />
                        <input required placeholder='Password'
                            type='password' name='password'
                            minLength="4" maxLength="32"
                            className='login-container-reg-form-input-password'
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <button name='loginbtn' className='login-container-reg-form-btn'>Sign In</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default LogIn;