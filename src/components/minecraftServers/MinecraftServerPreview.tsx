import React from 'react';
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import config from '../../config';
import { MinecraftServer } from '../../interfaces/minecraftServer';

function MinecraftServerPreview({ id, name, slug, state }: MinecraftServer) {
  const url = `${config.serverUrlPrefix}${slug}${config.serverUrlSuffix}`;

  return (
    <Link to={`project/${id}`} className="minecraft-server-preview">
      <h3>
        <b>{name} </b>
        <small className="align-middle ms-2">
          {state === 'Deployed' ? (
            <span className="badge bg-secondary">Deployed</span>
          ) : (
            <span className="badge bg-primary">Deploying</span>
          )}
        </small>
      </h3>
      <div>
        <FaLink /> <b>{url}</b>
      </div>
    </Link>
  );
}

export default MinecraftServerPreview;
