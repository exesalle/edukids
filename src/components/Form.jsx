import {useState} from 'react';

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <>
            <div className="content">
                <div className="registration">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <button className="signUp"
                onClick={() => handleClick(email, pass)}
            >
                <h3>{title}</h3>
            </button>

                </div>
            </div>
            </>
    )
}

export {Form}
