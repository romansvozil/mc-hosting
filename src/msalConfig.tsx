export const msalConfig = {
  auth: {
    clientId: 'd3085e44-a8c7-4d94-9a44-1b49a0dd5d94',
    authority: 'https://login.microsoftonline.com/11904f23-f0db-4cdc-96f7-390bd55fcee8', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: import.meta.env.VITE_REDIRECT_URI as string,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['api://776dc958-af22-4bba-948f-69577c63dfca/access_as_user'],
};
