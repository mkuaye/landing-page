import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { GetStarted } from '../pages/GetStarted';
import { Layout } from '../components/Layout';
import { ScrollToTop } from '../components/ScrollToTop';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ScrollToTop />
        <App />
      </Layout>
    ),
  },
  {
    path: '/get-started',
    element: (
      <Layout>
        <ScrollToTop />
        <GetStarted />
      </Layout>
    ),
  },
]); 