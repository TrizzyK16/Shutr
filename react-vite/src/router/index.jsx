import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import FeaturesPage from '../components/FeaturesPage/FeaturesPage'
import Layout from './Layout';
import ShutrProPage from '../components/ShutrProPage/ShutrProPage';
import TheAppsPage from '../components/TheAppsPage/TheAppsPage';
import CommunityPage from '../components/CommunityPage/CommunityPage';
import CompanyPage from '../components/CompanyPage/CompanyPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/features",
        element: <FeaturesPage />,
      },
      {
        path: "/shutrpro",
        element: <ShutrProPage />,
      },
      {
        path: "/theapps",
        element: <TheAppsPage />,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/company",
        element: <CompanyPage />,
      },

    ],
  },
]);