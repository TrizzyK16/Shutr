import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import FeaturesPage from '../components/FeaturesPage/FeaturesPage';
import ShutrProPage from '../components/ShutrProPage/ShutrProPage';
import TheAppsPage from '../components/TheAppsPage/TheAppsPage';
import CommunityPage from '../components/CommunityPage/CommunityPage';
import CompanyPage from '../components/CompanyPage/CompanyPage';
import YouPage from '../components/YouPage/YouPage';
import ExplorePage from "../components/ExplorePage/ExplorePage";
import PrintsPage from '../components/PrintsPage/PrintsPage';
import GetProPage from '../components/GetProPage/GetProPage';
import UploadPage from '../components/UploadPage/UploadPage';
import PhotosPage from '../components/PhotosPage/PhotosPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,  // You can choose what component you want here
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
        path: "/shutr-pro",
        element: <ShutrProPage />,
      },
      {
        path: "/the-apps",
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
      {
        path: "/you",
        element: <YouPage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/prints",
        element: <PrintsPage />,
      },
      {
        path: "/get-pro",
        element: <GetProPage />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
      {
        path: "/photos",
        element: <PhotosPage />,
      },
    ],
  },
]);
