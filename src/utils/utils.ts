export const generateUrl = (path: string): string => {
    return `${import.meta.env.VITE_APP_SERVER_URL || 'https://dev-api.meko.ac'}${path}`;
}