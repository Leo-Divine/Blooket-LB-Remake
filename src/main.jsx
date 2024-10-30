import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavBar } from './Navagation.jsx';
import { Background } from './Background.jsx';
import { App, Gamemodes, GamemodePage, LeaderboardPage, PrivacyPolicy } from './App.jsx';
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
    path: "/settings",
    element: <>
      <Background />
      <App />
    </>,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/rules",
    element: <App />,
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
