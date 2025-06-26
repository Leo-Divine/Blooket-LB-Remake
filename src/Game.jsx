import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getBlookImage,
  Icons,
  toTimeString,
} from "./common.js";
import { getAllGamemodes, getGamemode, getLeaderboardsFromGamemode, getLeaderboard, getRunsFromLeaderboard, getAllUsersWithStat } from "./supabase.js";

export function Gamemodes() {
  const [gamemodeData, setGamemodes] = useState([]);
  useEffect(() => {
    function updateGamemodes() {
      getAllGamemodes().then((gamemodes) => {
        const gamemodeElements = [];
        for (const gamemode of gamemodes) {
          gamemodeElements.push(
            <a 
              key={gamemode.gamemode_path}
              href={`/gamemodes/${gamemode.gamemode_path}`}>
                <img src={gamemode.gamemode_logo_link} alt={`${gamemode.gamemode_name} Logo`} />
            </a>
          );
        }
        setGamemodes(gamemodeElements);
      });
    }
    updateGamemodes();
  }, []);

  return (
    <>
      <header className="text-center">
        <h1>Gamemodes</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex h-center v-center">
            <div className="board-title">
              <h2>Gamemodes</h2>
            </div>
            <div className="gamemode-container flex h-center">
              {gamemodeData}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function GamemodePage() {
  let parameters = useParams();
  const selectedGamemode = parameters.gamemode;
  const [data, setBoards] = useState([]);
  useEffect(() => {
    function updateGamemode(gamemode_name) {
      getGamemode(gamemode_name).then((gamemode_info) => {
        getLeaderboardsFromGamemode(gamemode_info.gamemode_name).then((leaderboards) => {
          const leaderboardElements = [];
          for (const leaderboard of leaderboards) {
            leaderboardElements.push(
              <div key={leaderboard.lb_path} className="board-button-item flex v-center" onClick={selectLeaderboard.bind(this, gamemode_info.gamemode_path, leaderboard.lb_path)}>
                <img src={Icons[leaderboard.lb_icon]} alt={leaderboard.lb_icon}></img>
                <h2>{leaderboard.lb_title_short}</h2>
              </div>
            );
          }

          let response = {
            header: gamemode_info.gamemode_name,
            desc: gamemode_info.gamemode_desc,
            leaderboards: leaderboardElements,
          };
          setBoards(response);
        });
      });
    }
    updateGamemode(selectedGamemode);
  }, []);

  function selectLeaderboard(gamemode_path, leaderboard_path) {
    window.location.href = `/gamemodes/${gamemode_path}/${leaderboard_path}`;
  }

  return (
    <>
      <header className="text-center">
        <h1>{data.header} Leaderboards</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Leaderboards</h2>
            </div>
            <div className="board-contents scrollable">
              {data.leaderboards}
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Info</h2>
            </div>
            <div className="board-contents">
              <p>{data.desc}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function LeaderboardPage() {
  let parameters = useParams();
  const [board, setBoard] = useState([]);
  const [run, setRun] = useState([]);

  useEffect(() => {
    function updateLeaderboard(leaderboard_path, isStatLB) {
      if(isStatLB) { upadteStatsLeaderboard(leaderboard_path); return; }
      getLeaderboard(leaderboard_path).then((leaderboard) => {
        getRunsFromLeaderboard(leaderboard).then((runs) => {
          const infoElements = 
          <>
            <p>{leaderboard.lb_desc}</p>
            {!leaderboard.lb_rules ? <></> : 
              <>
                <br/>
                <p>Rules:</p>
                <ul>
                  {leaderboard.lb_rules.split(";").map((rule) => <li>{rule}</li>)}
                </ul>
                <br/>
              </>
            }
            <p>Submit a run <a href={`/submission/${leaderboard.lb_path}`}>Here</a>!</p>
          </>

          const leaderboardElements = [];
          runs.forEach((run, index) => {
            leaderboardElements.push(
              <tr id={run.user_data.user_name} key={run.user_data.user_name} onClick={() => {setRun(<RunDetails run={run} leaderboard={leaderboard} />)}}>
                <td>
                  <h2>{index + 1}.</h2>
                </td>
                <td className="lb-lock">
                  <div className="flex nowrap v-center">
                    <img className="blook-image" src={getBlookImage(run.user_data.blook)} alt={run.user_data.blook} />
                    <p className={run.user_data.blook == "Elite" ? "rainbow" : ""}>{run.user_data.user_name}</p>
                  </div>
                </td>
                <td>
                  <p>{leaderboard.lb_score_type == "Time" ? toTimeString(run.run_score) : run.run_score.toLocaleString()}</p>
                </td>
                <td>
                  <p>{run.user_data.name}</p>
                </td>
              </tr>
            );
          });
          setBoard({
              header: leaderboard.lb_title_long,
              desc: infoElements,
              type: leaderboard.lb_score_type,
              runs: leaderboardElements,
          });
        });
      });
    }
    function upadteStatsLeaderboard(leaderboard_path) {
      getLeaderboard(leaderboard_path).then((leaderboard) => {
        getAllUsersWithStat(leaderboard.lb_path).then((players) => {
          const leaderboardElements = [];
          players.forEach((player, index) => {
            leaderboardElements.push(
              <tr id={player.user_name} key={player.user_name} onClick={() => {setRun(<StatDetails player={player} leaderboard={leaderboard}/>)}}>
                <td>
                  <h2>{index + 1}.</h2>
                </td>
                <td>
                  <div className="flex nowrap v-center">
                    <img className="blook-image" src={getBlookImage(player.user_blooket_stats.blook)} alt={player.user_blooket_stats.blook}/>
                    <p className={player.user_blooket_stats.blook == "Elite" ? "rainbow" : ""}>{player.user_name}</p>
                  </div>
                </td>
                <td>
                  <p>{leaderboard.lb_score_type == "Date" ? player.user_blooket_stats.dateCreated.substring(0, 10) : Object.getOwnPropertyDescriptor(player.user_blooket_stats, leaderboard.lb_path).value.toLocaleString()}</p>
                </td>
                <td>
                  <p>{player.user_blooket_stats.name}</p>
                </td>
              </tr>
            );
          });
          setBoard({
              header: leaderboard.lb_title_long,
              desc: leaderboard.lb_desc,
              type: leaderboard.lb_score_type,
              runs: leaderboardElements,
          });
        });
      });
    }
    updateLeaderboard(parameters.leaderboard, parameters.gamemode == "stats");
  }, []);

  return (
    <>
      <header className="text-center">
        <h1>{board.header}</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Info</h2>
            </div>
            <div className="board-contents">
              <p>{board.desc}</p>
            </div>
          </div>
        </div>
        <div className="board-row">
          <div className="board leaderboard flex v-center">
            <div className="board-title">
              <h2>Ranking</h2>
            </div>
            <div className="leaderboard-table">
              <table>
                <thead>
                  <tr>
                    <td>
                      <h2>#</h2>
                    </td>
                    <td>
                      <h2>Person</h2>
                    </td>
                    <td>
                      <h2>{board.type}</h2>
                    </td>
                    <td>
                      <h2>Username</h2>
                    </td>
                  </tr>
                </thead>
                <tbody>{board.runs}</tbody>
              </table>
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Run</h2>
            </div>
            <div className="board-contents">
              {run}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function RunDetails(run) {
  return (
    <>
      <div className="flex nowrap column v-center">
        {run.run.run_video_link == "blastphemy" ? "" : <iframe src={run.run.run_video_link}></iframe>}
        <div className="flex nowrap v-center" style={{cursor: "pointer"}} onClick={() => globalThis.location.assign(`/account/${run.run.user_data.user_name}`)}>
          <img className="blook-image" src={getBlookImage(run.run.user_data.blook)} alt={run.run.user_data.blook} />
          <h2 className={run.run.user_data.blook == "Elite" ? "rainbow" : ""}>{run.run.user_data.user_name}</h2>
        </div>
      </div>
      <br/>
      <div className="flex nowrap v-center">
        <h3>{run.leaderboard.lb_score_type}:&nbsp;</h3>
        <p>{run.leaderboard.lb_score_type == "Time" ? toTimeString(run.run.run_score) : run.run.run_score.toLocaleString()}</p>
      </div>
      <div className="flex nowrap v-center">
        <h3>Accepted on:&nbsp;</h3>
        <p>{new Date(run.run.accepted_at).getMonth() + 1}-{new Date(run.run.accepted_at).getDate()}-{new Date(run.run.accepted_at).getFullYear()}</p>
      </div>
      <div className="flex nowrap v-center">
        <h3>Verifier:&nbsp;</h3>
        <p className={run.run.verifier_data.blook == "Elite" ? "rainbow" : ""}>{run.run.verifier_data.user_name}</p>
      </div>
      <div className="flex nowrap v-center">
        <h3>Link:&nbsp;</h3>
        <a href={run.run.run_video_link == "blastphemy" ? "" : run.run.run_video_link}>{run.run.run_video_link}</a>
      </div>
    </>
  );
}

function StatDetails(player) {
  return (
    <>
      <div className="flex nowrap column v-center">
        <div className="flex nowrap v-center" style={{cursor: "pointer"}} onClick={() => globalThis.location.assign(`/account/${player.player.user_name}`)}>
          <img className="blook-image" src={getBlookImage(player.player.user_blooket_stats.blook)} alt={player.player.user_blooket_stats.blook} />
          <h2 className={player.player.user_blooket_stats.blook == "Elite" ? "rainbow" : ""}>{player.player.user_name}</h2>
        </div>
      </div>
      <br/>
      <div className="flex nowrap v-center">
        <h3>{player.leaderboard.lb_score_type}:&nbsp;</h3>
        <p>{player.leaderboard.lb_score_type == "Date" ? player.player.user_blooket_stats.dateCreated.substring(0, 10) : Object.getOwnPropertyDescriptor(player.player.user_blooket_stats, player.leaderboard.lb_path).value.toLocaleString()}</p>
      </div>
      <div className="flex nowrap v-center">
        <h3>Last Updated:&nbsp;</h3>
        <p>{new Date(player.player.stats_last_updated).getMonth() + 1}-{new Date(player.player.stats_last_updated).getDate()}-{new Date(player.player.stats_last_updated).getFullYear()}</p>
      </div>
    </>
  );
}