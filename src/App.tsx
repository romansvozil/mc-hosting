import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import E404 from './components/e404/E404';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import MinecraftServerCreate from './components/minecraftServers/MinecraftServerCreate';
import MinecraftServerDetail from './components/minecraftServers/MinecraftServerDetail';
import MinecraftServers from './components/minecraftServers/MinecraftServers';
import TokenRequired from './components/tokenRequired';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <AuthenticatedTemplate>
          <TokenRequired>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MinecraftServers />} />
                <Route path="project/create" element={<MinecraftServerCreate />} />
                <Route path="project/:id" element={<MinecraftServerDetail />} />
                <Route path="*" element={<E404 />} />
              </Route>
            </Routes>
          </TokenRequired>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </div>
    </RecoilRoot>
  );
}

export default App;
