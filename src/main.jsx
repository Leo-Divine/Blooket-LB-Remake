import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import { App, PrivacyPolicy } from "./App.jsx";
import { GamemodePage, Gamemodes, LeaderboardPage } from "./Game.jsx";
import { Account, AccountCreation, SignUp, SubmissionPage } from "./User.jsx";
import { CoC2023, CoC2022, LUNCH, PoP, PoPTeam } from './Events.jsx';
import { FontAwesomeIcons } from "./common.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';

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
    path: "/add-stats",
    element: <AccountCreation />,
  },
  {
    path: "/submission",
    element: <SubmissionPage />,
  },
  {
    path: "/submission/:leaderboard",
    element: <SubmissionPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/events/coc2023",
    element: <CoC2023 />,
  },
  {
    path: "/events/coc2022",
    element: <CoC2022 />,
  },
  {
    path: "/events/lunch",
    element: <LUNCH />,
  },
  {
    path: "/events/pop",
    element: <PoP />,
  },
  {
    path: "/events/pop/:guild",
    element: <PoPTeam />,
  },
  {
    path: "*",
    element: (
      <p>Page Not Found :(</p>
    ),
  },
]);

function Background() {
  if(globalThis.location.pathname === "/privacy-policy") {
    return;
  }
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
          path="/events/pop"
          element={<div id="background-container" className="pop"></div>}
        />
        <Route
          path="/events/pop/*"
          element={<div id="background-container" className="pop"></div>}
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {
      globalThis.location.pathname.includes("/events/pop") ? 
      <>
      <nav>
        <div className="flex" style={{justifyContent: "end"}}>
          <FontAwesomeIcon className="pop nav-link" icon={FontAwesomeIcons.trophy} onClick={() => {globalThis.location.pathname = "./events/pop"}}></FontAwesomeIcon>
          <FontAwesomeIcon className="pop nav-link" icon={FontAwesomeIcons.reply} onClick={() => {globalThis.location.pathname = "./"}}></FontAwesomeIcon>
        </div>
      </nav>
      </> 
      : 
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
          {globalThis.location.pathname.includes("/gamemodes/") ? <a href="./">Back</a> : ""}
        </div>
      </nav>
    }
    
    <Background />
    <RouterProvider router={router} />
  </StrictMode>,
);
