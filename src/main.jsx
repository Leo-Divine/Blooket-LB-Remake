import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { App, PrivacyPolicy } from "./app.jsx";
import { GamemodePage, Gamemodes, LeaderboardPage } from "./game.jsx";
import { Account, AccountCreation, SignUp } from "./user.jsx";
import { CoC2023, CoC2022, LUNCH } from "./events.jsx";
import "./index.css";
import { Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
      },
    ],
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
    children: [
      {
        path: ":user",
      },
    ],
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
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/events",
    children: [
      {
        path: "coc2023",
        element: <CoC2023 />,
      },
      {
        path: "coc2022",
        element: <CoC2022 />,
      },
      {
        path: "lunch",
        element: <LUNCH />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
]);

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <nav>
      <div
        id="nav-bar"
        className={`flex v-center ${
          globalThis.location.pathname === "/events/coc2022" ? "coc-2022" : ""
        }`}
      >
        <a href="/"> Home </a>
        <a href="/gamemodes">Gamemodes</a>
        <a href="/account">Account</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="https://discord.gg/5nYGQtqyBZ">Discord</a>
      </div>
    </nav>
    <Background />
    <RouterProvider router={router} />
  </StrictMode>
);

// eslint-disable-next-line react-refresh/only-export-components
function Background() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/events/lunch"
          element={<div id="background-container" className="lunch"></div>}
        />
        <Route
          path="/events/coc2022"
          element={<div id="background-container" className="coc-2022"></div>}
        />
        <Route
          path="/events/coc2023"
          element={<div id="background-container" className="coc-2023"></div>}
        />
        <Route
          path="*"
          element={
            <div id="background-container">
              <div id="background"></div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
