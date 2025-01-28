import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  getIsAuthenticated,
  userLogIn
} from '../../../src/services/slices/UserDataSlice';
import { TLoginData } from '@api';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthChecked = useSelector(getIsAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userLoginData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(userLogIn(userLoginData));
    navigate('/');
  };

  if (isAuthChecked) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
