import { createBrowserRouter } from 'react-router-dom';
import LoginFormModal from '../components/LoginFormModal/LoginFormModal';
import SignupFormModal from '../components/SignupFormModal/SignupFormModal';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import LPUser from '../components/LandingPage/LPUser/LPUser';
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
import EditPhotoPage from '../components/EditPhotoPage/EditPhotoPage';
import SearchResults from '../components/SearchResults/SearchResults';
import GroupsPage from '../components/GroupsPage/GroupsPage';
import EventsPage from '../components/EventsPage/EventsPage';
import AlbumPage from '../components/AlbumsPage/AlbumPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,  // You can choose what component you want here
      },
      {
        path: "/welcome",
        element: <LPUser />,  // Direct access to the new user landing page
      },
      {
        path: "login",
        element: <LoginFormModal />,
      },
      {
        path: "signup",
        element: <SignupFormModal />,
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
        path: "/albums",
        element: <AlbumPage />,
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
      {
        path: "/photos/:photoId/edit",
        element: <EditPhotoPage />,
      },
      {
        path: "/search",
        element: <SearchResults />
      },
      {
        path: "/groups",
        element: <GroupsPage />
      },
      {
        path: "/events",
        element: <EventsPage />
      },
    ],
  },
]);
