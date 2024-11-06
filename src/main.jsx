import "./index.css";
import { App, PrivacyPolicy } from "./app.jsx";
import { GamemodePage, Gamemodes, LeaderboardPage } from "./game.jsx";
import { Account, AccountCreation, SignUp } from "./user.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/gamemodes",
    element: <Gamemodes />,
  },
  {
    path: "/gamemodes/:gamemode",
    element: <GamemodePage />,
  },
  {
    path: "/gamemodes/:gamemode/:leaderboard",
    element: <LeaderboardPage />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/account/:user",
    element: <Account />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/create-account",
    element: <AccountCreation />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/events/:event",
    element: <App />,
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
]);

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <nav>
      <div id="nav-bar" className="flex v-center">
        <a href="/"> Home </a>
        <a href="/gamemodes">Gamemodes</a>
        <a href="/account">Account</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="https://discord.gg/5nYGQtqyBZ">Discord</a>
      </div>
    </nav>
    <div id="background-container">
      <div id="background" />
    </div>
    <RouterProvider router={router} />
  </StrictMode>
);
