import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './app/router/routes';
import "./index.scss";

declare global {
    interface Window {
        _env_: {
            API_URL: string;
            SERVER_API_URL: string;
            REACT_APP_GOOGLE_ANALYTICS: string;
        };
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);