import React from 'react';

import { MinecraftServer } from '../../interfaces/minecraftServer';
import { useMinecraftServers } from '../../utils/minecraftServersClient';
import Loader from '../loader/Loader';
import MinecraftServerPreview from './MinecraftServerPreview';

function MinecraftServers() {
  const { minecraftServers, isLoading } = useMinecraftServers();
  const minecraftServersCount = minecraftServers.length;

  return (
    <div className="minecraft-servers container">
      <h2 className="title">Minecraft servers {minecraftServersCount > 0 ? `(${minecraftServersCount})` : ''}</h2>

      {isLoading && (
        <div className="container text-center">
          <Loader />
        </div>
      )}
      {!isLoading &&
        minecraftServers.map((minecraftServer: MinecraftServer) => (
          <MinecraftServerPreview key={minecraftServer.id} {...minecraftServer} />
        ))}

      {!isLoading && minecraftServersCount === 0 && <h3>No servers found</h3>}
    </div>
  );
}

export default MinecraftServers;
