import React from 'react';
import Input from '../Input';
import Button from '../Button';

import { Props } from './props'

const AuthForm: React.FC<Props> = ({
  title,
  buttonText,
  username,
  name,
  password,
  confirmPassword,
  setUsername,
  setName,
  setPassword,
  setConfirmPassword,
  onSubmit,
  isRegister
}) => {
  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      <form onSubmit={onSubmit}>
        {
          isRegister && setName && (
            <Input
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={setName}
            />
          )
        }
        <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={setUsername}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        {
          isRegister && setConfirmPassword && (
            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          )
        }
        <Button
          type='submit'
          text={buttonText}
        />
      </form>
    </div>
  );
};

export default AuthForm;
