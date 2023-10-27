import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.scss';

const LogIn = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => localStorage.clear(), [])

    const handleSubmit = e => {
        e.preventDefault();
        // (async () => {
        //     let form = document.querySelector('.login-container-reg-form');
        //     let response = await login(form.login.value, form.password.value);
        //     if (response) navigate('/home', { replace: true });
        // })();
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <form onSubmit={handleSubmit} className='login-container-reg-form'>
                    <legend className='login-container-reg-form-legend'>Class Up</legend>
                    <hr />
                    <input required placeholder='Login'
                        type='email' name='login'
                        className='login-container-reg-form-input-login'
                        value={login}
                        onChange={e => setLogin(e.target.value)} />
                    <input required placeholder='Password'
                        type='password' name='password'
                        minLength="8" maxLength="32"
                        className='login-container-reg-form-input-password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button name='loginbtn' className='login-container-reg-form-btn'>Sign In</button>
                </form>
            </div>
        </div>
    )
};

export default LogIn;