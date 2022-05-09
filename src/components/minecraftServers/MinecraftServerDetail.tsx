import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { useRecoilValue } from 'recoil';

import authToken from '../../atoms/authToken';
import config from '../../config';
import { deleteServer } from '../../utils/fetcher';
import { MinecraftServer } from '../../interfaces/minecraftServer';
import { useMinecraftServer } from '../../utils/minecraftServersClient';
import E404 from '../e404/E404';
import Loader from '../loader/Loader';

function formatValue(value: string | number) {
  if (value === 'True') {
    return 'On';
  }

  if (value === 'False') {
    return 'Off';
  }

  return value;
}

function MinecraftServerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { minecraftServer: minecraftServerResponse } = useMinecraftServer(id);
  const [minecraftServer, setMinecraftServer] = useState<MinecraftServer | null>(null);
  const token = useRecoilValue(authToken);

  const [negotiateToken, setNegotiateToken] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${config.api.urlW}negotiate`)
      .then((res) => {
        setNegotiateToken(res.data.url);
      })
  }, [setNegotiateToken]);

  const { lastMessage, readyState } = useWebSocket(negotiateToken, {
    protocols: 'json.webpubsub.azure.v1'
  });

  useEffect(() => {
    setMinecraftServer(minecraftServerResponse);
  }, [minecraftServerResponse, setMinecraftServer]);

  useEffect(() => {
    console.log(lastMessage, minecraftServer, lastMessage?.data == minecraftServer?.id)
    if (lastMessage !== null && minecraftServer !== null && JSON.parse(lastMessage.data).data == minecraftServer?.id) {
      setMinecraftServer({ ...minecraftServer, state: 'Deployed' });  
    }
  }, [lastMessage, setMinecraftServer]);

  if (!id) {
    return <E404 />;
  }

  if (minecraftServer === null) {
    return (
      <div className="container text-center">
        <Loader />
      </div>
    );
  }

  const url = `${config.serverUrlPrefix}${minecraftServer.slug}${config.serverUrlSuffix}`;

  return (
    <div className="minecraft-server-detail container">
      <h2 className="title mb-0">
        <span>
          {minecraftServer.name} <small>(id: {minecraftServer.id})</small>
        </span>
        <span>
          <button
            className="btn btn-danger ms-2"
            onClick={async () => {
              deleteServer(minecraftServer.id, token).then(() => {
                navigate('/');
              });
            }}
          >
            Delete
          </button>
        </span>
      </h2>
      <div className="mt-2">
        {minecraftServer.state === 'Deployed' ? (
          <span className="badge bg-secondary">Deployed</span>
        ) : (
          <span className="badge bg-primary">
            Deploying <Loader />
          </span>
        )}
      </div>
      <div className="server-settings pb-4 mt-4">
        <div className="server-setting">
          <div className="key">
            <b>url:</b>
          </div>
          <div className="value">{url}</div>
        </div>

        {Object.keys(minecraftServer.envVars).map((key: string) => (
          <div className="server-setting" key={key}>
            <div className="key">
              <b>{key.toLowerCase().replace('_', ' ')}:</b>
            </div>
            <div className="value">
              {minecraftServer.envVars[key] ? formatValue(minecraftServer.envVars[key]) : 'Not defined'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MinecraftServerDetail;
