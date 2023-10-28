import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../database/methods';
import Loading from '../Loading/Loading.jsx';
import './SignUp.scss';

const SingUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [surname, setSurame] = useState('');

    const haveAccount = () => {
        navigate("/", { replace: true });
    }

    const handleSignUp = async e => {
        e.preventDefault();
        setIsLoading(true);
        await signUp(e.target);
        navigate("/", { replace: true });
        setIsLoading(false);
    }

    return (
        <>
            {
                isLoading && <Loading />
            }
            <div className='signup'>
                <div className='signup-container'>
                    <form onSubmit={handleSignUp} className='signup-container-reg-form'>
                        <legend className='signup-container-reg-form-legend'>Class Up</legend>
                        <hr />
                        <input required placeholder='Name'
                            type='text' name='firstname'
                            className='signup-container-reg-form-input-signup'
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)} />
                        <input required placeholder='Surname'
                            type='text' name='surname'
                            className='signup-container-reg-form-input-signup'
                            value={surname}
                            onChange={e => setSurame(e.target.value)} />
                        <input required placeholder='Login'
                            type='text' name='login'
                            className='signup-container-reg-form-input-signup'
                            value={login}
                            onChange={e => setLogin(e.target.value)} />
                        <input required placeholder='Password'
                            type='password' name='password'
                            minLength="4" maxLength="32"
                            className='signup-container-reg-form-input-password'
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <button name='signupbtn' className='signup-container-reg-form-btn'>Sign In</button>
                        <a onClick={haveAccount} className='signup-container-reg-form-signup'>Already have an accout? Log in!</a>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SingUp;