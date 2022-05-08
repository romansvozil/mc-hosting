import React from 'react';
import { BsMicrosoft } from 'react-icons/bs';

import { IPublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { DefaultButton } from '@fluentui/react';

import { loginRequest } from '../../msalConfig';

function handleLogin(instance: IPublicClientApplication) {
  instance.loginRedirect(loginRequest).catch(() => {
    // console.error(e);
  });
}

function Login() {
  const { instance } = useMsal();

  return (
    <div className="login-page">
      <div className="position-absolute top-50 start-50 translate-middle sign-in-container text-center">
        <h2 className="mb-0">Minecraft hosting</h2>
        <div className="mb-3">Roman Svozil & Marcel Lukčo</div>

        <DefaultButton className="btn btn-primary btn-lg py-3 ml-auto" onClick={() => handleLogin(instance)}>
          Sign in <BsMicrosoft className="ms-2" />
        </DefaultButton>
      </div>
    </div>
  );
}

export default Login;
