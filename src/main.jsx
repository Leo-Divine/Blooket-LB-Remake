import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavBar } from './Navagation.jsx';
import { Background } from './Background.jsx';
import { App, Gamemodes, GamemodePage, LeaderboardPage, Account, SignUp, AccountCreation, PrivacyPolicy } from './App.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Background />
      <App />
    </>,
  },
  {
    path: "/home",
    element: <>
      <Background />
      <App />
    </>,
  },
  {
    path: "/gamemodes",
    element: <>
      <Background />
      <Gamemodes />
    </>,
  },
  {
    path: "/gamemodes/:gamemode",
    action: ({ params }) => { },
    element: <>
      <Background />
      <GamemodePage />
    </>,
  },
  {
    path: "/gamemodes/:gamemode/:leaderboard",
    action: ({ params }) => { },
    element: <>
    <Background />
    <LeaderboardPage />
  </>,
  },
  {
    path: "/account",
    action: ({ params }) => { },
    element: <>
      <Background />
      <Account />
    </>,
  },
  {
    path: "/account/:user",
    action: ({ params }) => { },
    element: <>
      <Background />
      <Account />
    </>,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/create-account",
    element: <>
    <Background />
    <AccountCreation />
  </>,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/events/:event",
    action: ({ params }) => { },
    element: <App />,
  },
  {
    path: "*",
    element: (
      <p>Page Not Found</p>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </StrictMode>,
);
