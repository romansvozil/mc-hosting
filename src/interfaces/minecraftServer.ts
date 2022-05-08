export interface MinecraftServer {
  id: string;
  name: string;
  slug: string;
  // Deployed, BeingDeployed
  state: string;
  envVars: {
    [key: string]: string | number;
  };
}
