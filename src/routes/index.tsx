import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { GetStarted } from '../pages/GetStarted';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/get-started',
    element: <GetStarted />,
  },
]); 