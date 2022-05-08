import axios from 'axios';
import { useEffect, useState } from 'react';

import config from '../config';

export interface LatestMinecraftVersion {
  release: string;
  snapshot: string;
}

export interface MinecraftVersionDetails {
  id: string;
  type: string;
  url: string;
  time: string;
  releaseTime: string;
  sha1: string;
  complianceLevel: number;
}

export interface MinecraftServersResponse {
  latest: LatestMinecraftVersion;
  versions: MinecraftVersionDetails[];
}

export function useMinecraftVersions() {
  const [data, setData] = useState<MinecraftServersResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json')
      .then((r) => {
        setData(r.data);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, data, error };
}

export function deleteServer(id: string, token: string) {
  return axios.delete(`${config.api.url}server/${id}`, {
    data: {
      serverId: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
