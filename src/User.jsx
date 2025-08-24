import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toTimeString, getBlookImage } from "./common.js";
import { getAllLeaderboards, getUser, getRunsFromUser, Authentication, updateBlooketStats, submitRun } from "./supabase.js";

export function Account() {
  let params = useParams();
  const param_user = params.user;
  const current_user_data = JSON.parse(localStorage.getItem("sb-zacycauwtkwjxbufkmjk-auth-token"));
  const [state, setState] = useState([]);

  let selected_user;
  if (param_user) {
    selected_user = param_user;
  } else if (current_user_data) {
    selected_user = current_user_data.user.user_metadata.user_name;
  }

  useEffect(() => {
  function updateAccount(u) {
      //Check if user isn't logged in or viewing others profile
      if (!u) {
        setState(<LoginRedirect />);
        return;
      }

      //Get data
      getUser(u).then((user) => {
        if(!user) {
          setState(<Settings />);
          return;
        }
        getRunsFromUser(user.user_id).then((runs) => {
          const stat_elements = [];
          const stats_array = Object.keys(user.user_blooket_stats);

          for (const stat of stats_array) {
            if (!["wins", 
              "cafeCash", 
              "upgrades", 
              "defenseDmg", 
              "foodServed", 
              "numUnlocks", 
              "boxesOpened", 
              "gamesPlayed", 
              "totalTokens", 
              "showdownWins", 
              "classicPoints", 
              "defenseRounds", 
              "correctAnswers", 
              "playersDefeated", 
              "totalFishWeight"].includes(stat)) {
              continue;
            }
            stat_elements.push(
              <div className="board-stat-item flex column v-center">
                <p>{stat}</p>
                <h2>{Object.getOwnPropertyDescriptor(user.user_blooket_stats, stat).value.toLocaleString()}</h2>
              </div>
            );
          }

          const runs_elements = [];
          for (const run of runs) {
            runs_elements.push(
              <div className="board-button-item flex between v-center" 
                    onClick={() =>
                      globalThis.location.assign(`/gamemodes/${run.leaderboard.gamemode.path}/${run.leaderboard.path}`
                    )}>
                <h2>{run.leaderboard.name}</h2>
                <p>{run.leaderboard.type == "Time" ? toTimeString(run.run_score) : run.run_score.toLocaleString()}</p>
              </div>
            );
          }

          setState(
            <>
              <div className="board-row">
                <div className="board account-header flex v-center">
                  <img src={getBlookImage(user.user_blooket_stats.blook)} alt="blook"></img>
                  <div className="flex column">
                    <h2 className={user.user_blooket_stats.blook == "Elite" ? "rainbow" : ""}>{user.user_name}</h2>
                    <p>{user.user_blooket_stats.name}</p>
                    <p>Created: {user.created_at.substring(0, 10)}</p>
                    <p>Last Updated: {user.stats_last_updated.substring(0, 10)}</p>
                  </div>
                </div>
              </div>
              <div className="board-row">
                <div className="board flex v-center">
                  <div className="board-title">
                    <h2>Stats</h2>
                  </div>
                  <div className="board-contents flex h-center around scrollable">
                    {stat_elements}
                  </div>
                </div>
                <div className="board flex v-center">
                  <div className="board-title">
                    <h2>Runs</h2>
                  </div>
                  <div className="board-contents scrollable">
                    {runs_elements}
                  </div>
                </div>
              </div>
              {window.location.pathname == "/account" ? <Settings /> : ""}
            </>
          );
        });
      });
    }
    updateAccount(selected_user);
  }, []);

  return <main>{state}</main>;
}

function Settings() {
  return (
    <>
      <div className="board-row">
        <div className="board flex v-center">
          <div className="board-title">
            <h2>Update Stats</h2>
          </div>
          <div className="board-contents flex column v-center account-input">
            <input
              id="account-stats"
              className="inputs"
              type="text"
              placeholder="Blooket Stats Here!"
            />
            <button
              id="account-submit"
              className="inputs"
              type="submit"
              onClick={() => {updateBlooketStats(JSON.parse(document.querySelector("#account-stats").value));}}>
              Submit
            </button>
            <a href="https://dashboard.blooket.com/api/users" target="_blank">
              Blooket API
            </a>
          </div>
        </div>
        <div className="board flex v-center">
          <div className="board-title">
            <h2>Submit Run</h2>
          </div>
          <div className="board-contents flex column v-center account-input">
            <p>Fill out the info on the next page. Someone should review it at some point.</p>
            <button type="button" className="inputs" onClick={() => globalThis.location.assign(`/submission`)}>
              Submission Page
            </button>
          </div>
        </div>
      </div>
      <div className="board-row">
        <div className="board flex v-center">
          <div className="board-title">
            <h2>Settings</h2>
          </div>
          <div className="board-contents">
            <button type="button" className="inputs" onClick={Authentication.resetUsername.bind(this)}>
              Change Username
            </button>
            <br/>
            <button type="button" className="inputs" onClick={Authentication.userLogOut.bind(this)}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function LoginRedirect() {
  return (
    <>
      <header className="text-center">
        <h1>Accounts</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Log In</h2>
            </div>
            <div className="board-contents flex column v-center">
              <input id="email-input" className="inputs" type="email" placeholder="Email"></input>
              <input id="password-input" className="inputs" type="password" placeholder="Password"></input>
              <button id="user-submit" className="inputs" type="submit" onClick={Authentication.userLogIn.bind(this)}>Login</button>
              <a href="/sign-up">Sign Up Page</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function SignUp() {
  return (
    <>
      <header className="text-center">
        <h1>Sign Up</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Fill Out</h2>
            </div>
            <div className="board-contents flex column v-center account-input">
              <input
                id="username-input"
                className="inputs"
                type="text"
                placeholder="Username"
              />
              <input
                id="email-input"
                className="inputs"
                type="email"
                placeholder="Email"
              />
              <input
                id="password-input"
                className="inputs"
                type="password"
                placeholder="Password"
              />
              <div>
                <input type="checkbox" id="stats-age" />
                <label htmlFor="stats-age"> I am over the age of 13</label>
                <input type="checkbox" id="stats-privacy" />
                <label htmlFor="stats-privacy">
                  {" "}
                  I agree to the <a href="/privacy-policy">Privacy Policy</a>
                </label>
              </div>
              <button
                id="user-submit"
                className="inputs"
                type="submit"
                onClick={Authentication.userSignUp.bind(this)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function AccountCreation() {
  return (
    <>
      <header className="text-center">
        <h1>Almost Done!</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Steps</h2>
            </div>
            <div className="board-contents">
              <h2 className="text-center">
                Complete these steps to complete your account creation!
              </h2>
              <ol type="1">
                <li>
                  Login to{" "}
                  <a href="https://blooket.com" target="_blank">
                    Blooket
                  </a>{" "}
                  and come back to this page.
                </li>
                <li>
                  Go to this link in a seperate tab:{" "}
                  <a
                    href="https://dashboard.blooket.com/api/users"
                    target="_blank"
                  >
                    Blooket API
                  </a>
                  .
                </li>
                <li>Copy all of the text on the page.</li>
                <li>
                  Paste the data into the box below that says &quot;Paste
                  Here!&quot;.(It&apos;s the only light purple box on the page!)
                </li>
                <li>Submit! :D</li>
              </ol>
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Fill Out</h2>
            </div>
            <div className="board-contents flex column v-center account-input">
              <input
                id="account-stats"
                className="inputs"
                type="text"
                placeholder="Paste Here!"
              />
              <button
                id="account-submit"
                className="inputs"
                type="submit"
                onClick={Authentication.createUserData.bind(this)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function ResetUserInfo() {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        const { data, error } = await supabase.auth.updateUser({
          data: { password: newPassword }
        });
        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);
}

export function SubmissionPage() {
  let parameters = useParams();
  const selectedLeaderboard = parameters.leaderboard;
  const current_user_data = JSON.parse(localStorage.getItem("sb-zacycauwtkwjxbufkmjk-auth-token"));
  const [state, setState] = useState([]);

  useEffect(() => {
    function updateCategories(leaderboard) {    
      if(!current_user_data) {
        setState(<LoginRedirect />);
        return;
      } 
      getAllLeaderboards().then((l) => {
        const leaderboard_options = [];
        const leaderboards = l.filter((x) => x.gamemode.path != "stats");
        let selected_leaderboard = leaderboards[0];
        leaderboards.forEach((lb) => {
          leaderboard_options.push(<option key={lb.lb_path} value={lb.lb_path} >{lb.lb_title_long}</option>);
          if(lb.lb_path == leaderboard) { selected_leaderboard = lb; }
        });

        setState(
          <>
            <header className="text-center">
              <h1>Run Submission</h1>
            </header>
            <main>
              <div className="board-row">
                <div className="board flex v-center">
                  <div className="board-title">
                    <h2>Submit</h2>
                  </div>
                  <div className="board-contents">
                    <h2>Choose a Leaderboard:</h2>
                    <select id="leaderboard-input" className="inputs" value={selected_leaderboard.lb_path} onChange={(event) => {updateCategories(event.target.value)}}>
                      {leaderboard_options}
                    </select>
                    <hr/>
                    <br/>
                    {selected_leaderboard.lb_score_type == "Time" ? 
                    <>
                      <h2>Enter your Final Time:</h2>
                      <div id="time-input" className="flex">
                        <input id="time-input-hours" type="number"></input>
                        <p>h</p>
                        <input id="time-input-minutes" type="number"></input>
                        <p>m</p>
                        <input id="time-input-seconds" type="number"></input>
                        <p>s</p>
                        <input id="time-input-milliseconds" type="number"></input>
                        <p>ms</p>
                      </div>
                    </> 
                    : 
                    <>
                      <h2>Enter your Final Score:</h2>
                      <input id="score-input" className="inputs" type="number"></input>
                    </>
                    }
                    <hr/>
                    <br/>
                    <h2>Enter your Video URL:</h2>
                    <input id="video-input" type="url" placeholder="URL Here!" className="inputs"></input>
                    <br/>
                    <p>A quick reminder to take a look at the <a href="/rules" target="_blank">rules</a>!</p>
                    <button id="account-submit" className="inputs" type="submit" onClick={submitRun.bind(this, selected_leaderboard)}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </>   
        );
      });
    }
    updateCategories(selectedLeaderboard);
  }, []);

  return (<>{state}</>);
}

export function RulesPage() {
  return (
    <div style={{ color: "black" }}>
      <main>
        <h1>Blooket Leaderboards Rules</h1>
        <p>Here are some general rules that apply to all leaderboards.</p>
        <br/>
        <h2>Recording Footage</h2>
        <p>All runs of the game must be recorded to be reviewed by a verifier. To make sure all runs are not tampered with or use cheats when not visible, all runs must have a designated start and end time/screen. This is usually determined by gamemode and playing method.</p>
        <p>Assuming the timing is not already specified:</p>
        <ul>
          <li>For solo games(Kingdom, Plushie, ToD, etc) that have a start button, the recording must either start at or before the start button is displayed.</li>
          <li>For all hosted games the run doesn't have to show the host screen, but it should show the pregame lobby on the players screen.</li>
          <li>Timing on default will end at the post game screen(the same one you get your tokens on). This may change based on the leaderboard.</li>
        </ul>
        <br/>
        <p>Some leaderboards allow for segmented runs. This is defined as having multiple seperate videos that when put together will show all footage of a run. This is intended for leaderboards and gamemodes that are progressive such as Cafe and TD.</p>
        <p>There are a few rules for this:</p>
        <ul>
          <li>In the provided footage, all rounds/days/anything must be present.</li>
          <li>Each video provided must start at the save file selection screen. You will then choose your save file and proceed to play your run as normal.</li>
        </ul>
        <br/>
        <p>Other things to note:</p>
        <ul>
          <li>Recorded footage may not be tampered with, such as cutting or splicing footage. Any runs found to have that will be rejected.</li>
          <li>Runs accepted before 6-14-2025 are the only runs which do not require footage. I already verified them long ago.</li>
        </ul>
        <br/>
        <h2>Glitches</h2>
        <p>Every leaderboard does not allow glitches unless stated in the rules of the leaderboard.</p>
        <br/>
        <h2>Hacking</h2>
        <p>I hope it's obvious that using blooket hacks is never allowed in any run of the game. Runs will be rejected if hacks are used at any time.</p>
      </main>
    </div>
  );
}