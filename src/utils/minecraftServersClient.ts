import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import authToken from '../atoms/authToken';
import config from '../config';
import { MinecraftServer } from '../interfaces/minecraftServer';

interface MinecraftServersHooksProps {
  minecraftServers: MinecraftServer[];
  isLoading: boolean;
  error: string | null;
}

export function useMinecraftServers() {
  const [minecraftServer, setMinecraftServer] = useState<MinecraftServersHooksProps>({
    minecraftServers: [],
    isLoading: true,
    error: null,
  });
  const token = useRecoilValue(authToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(config.api.url + 'server', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMinecraftServer({
          minecraftServers: response.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        setMinecraftServer({
          minecraftServers: [],
          isLoading: false,
          error,
        });
      });
  }, [token]);

  return minecraftServer;
}

interface MinecraftServerHooksProps {
  minecraftServer: MinecraftServer | null;
  isLoading: boolean;
  error: string | null;
}

export function useMinecraftServer(id: string | undefined) {
  const [minecraftServer, setMinecraftServer] = useState<MinecraftServerHooksProps>({
    minecraftServer: null,
    isLoading: true,
    error: null,
  });
  const token = useRecoilValue(authToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(config.api.url + `server/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMinecraftServer({
          minecraftServer: response.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        setMinecraftServer({
          minecraftServer: null,
          isLoading: false,
          error,
        });
      });
  }, [id, token]);

  return minecraftServer;
}
