import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavBar, BackNavBar, CoC2022NavBar } from './Navagation.jsx';
import { Background, CoC2023Background, CoC2022Background } from './Background.jsx';
import { App, Gamemodes, GamemodePage, LeaderboardPage, Account, SignUp, AccountCreation, PrivacyPolicy } from './App.jsx';
import { CoC2023, CoC2022 } from './Events.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <NavBar />
      <Background />
      <App />
    </>,
  },
  {
    path: "/home",
    element: <>
      <NavBar />
      <Background />
      <App />
    </>,
  },
  {
    path: "/gamemodes",
    element: <>
      <NavBar />
      <Background />
      <Gamemodes />
    </>,
  },
  {
    path: "/gamemodes/:gamemode",
    action: ({ params }) => { },
    element: <>
      <NavBar />
      <Background />
      <GamemodePage />
    </>,
  },
  {
    path: "/gamemodes/:gamemode/:leaderboard",
    action: ({ params }) => { },
    element: <>
      <BackNavBar />
      <Background />
      <LeaderboardPage />
    </>,
  },
  {
    path: "/account",
    action: ({ params }) => { },
    element: <>
      <NavBar />
      <Background />
      <Account />

    </>,
  },
  {
    path: "/account/:user",
    action: ({ params }) => { },
    element: <>
      <NavBar />
      <Background />
      <Account />
    </>,
  },
  {
    path: "/sign-up",
    element: <>
      <NavBar />
      <Background />
      <SignUp />
    </>,
  },
  {
    path: "/create-account",
    element: <>
      <NavBar />
      <Background />
      <AccountCreation />
    </>,
  },
  {
    path: "/privacy-policy",
    element: <>
      <NavBar />
      <PrivacyPolicy />
    </>,
  },
  {
    path: "/events/coc2023",
    action: ({ params }) => { },
    element: <>
      <NavBar />
      <CoC2023Background />
      <CoC2023 />
    </>,
  },
  {
    path: "/events/coc2022",
    action: ({ params }) => { },
    element: <>
      <CoC2022NavBar />
      <CoC2022Background />
      <CoC2022 />
    </>,
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

    <RouterProvider router={router} />
  </StrictMode>,
);
