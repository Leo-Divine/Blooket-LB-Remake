import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavBar, BackNavBar } from "./Navagation.jsx";
import { Background } from "./Background.jsx";
import {
  App,
  Gamemodes,
  GamemodePage,
  LeaderboardPage,
  Account,
  SignUp,
  AccountCreation,
  PrivacyPolicy,
} from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Background />
        <App />
      </>
    ),
    children: [
      {
        path: "/home",
        element: (
          <>
            <NavBar />
            <Background />
            <App />
          </>
        ),
      },
      {
        path: "/gamemodes",
        element: (
          <>
            <NavBar />
            <Background />
            <Gamemodes />
          </>
        ),
        children: [
          {
            path: "/gamemodes/:gamemode",
            element: (
              <>
                <NavBar />
                <Background />
                <GamemodePage />
              </>
            ),
            children: [
              {
                path: "/gamemodes/:gamemode/:leaderboard",
                element: (
                  <>
                    <BackNavBar />
                    <Background />
                    <LeaderboardPage />
                  </>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/account",
        element: (
          <>
            <NavBar />
            <Background />
            <Account />
          </>
        ),
        children: [
          {
            path: "/account/:user",
            element: (
              <>
                <NavBar />
                <Background />
                <Account />
              </>
            ),
          },
        ],
      },
      {
        path: "/sign-up",
        element: (
          <>
            <NavBar />
            <Background />
            <SignUp />
          </>
        ),
      },
      {
        path: "/create-account",
        element: (
          <>
            <NavBar />
            <Background />
            <AccountCreation />
          </>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <>
            <PrivacyPolicy />
          </>
        ),
      },
      {
        path: "/events/:event",
        element: <App />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
