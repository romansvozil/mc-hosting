import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { SilentRequest } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import authToken from '../atoms/authToken';
import { loginRequest } from '../msalConfig';

interface Props {
  children: React.ReactElement;
}

export default function TokenRequired(props: Props) {
  const [, setToken] = useRecoilState(authToken);
  const { instance } = useMsal();

  useEffect(() => {
    const accessTokenRequest: SilentRequest = {
      account: instance.getAllAccounts()[0],
      ...loginRequest,
    };
    instance
      .acquireTokenSilent(accessTokenRequest)
      .then((returnedData) => {
        setToken(returnedData.accessToken);
        console.log(returnedData.accessToken);
      })
      .catch(console.error);
  }, [instance, setToken]);

  return props.children;
}
