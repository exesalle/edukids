import {SyntheticEvent, useState} from 'react';

type Props = {
  title: string,
  handleClick: (e: SyntheticEvent<HTMLFormElement>) => void;
}
const Form = (props: Props) => {
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


                </div>
            </div>
            </>
    )
}

export {Form}
