import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

import factoryLogo from "./assets/game_logos/Factory_Logo.webp";
import monsterBrawlLogo from "./assets/game_logos/Monster_Brawl_Logo.webp";
import fishingFrenzyLogo from "./assets/game_logos/Fishing_Frenzy_Logo.webp";
import towerDefenseLogo from "./assets/game_logos/Tower_Defense_Logo.webp";
import towerDefense2Logo from "./assets/game_logos/Tower_Defense_2_Logo.webp";
import cafeLogo from "./assets/game_logos/Cafe_Logo.webp";
import crazyKingdomLogo from "./assets/game_logos/Crazy_Kingdom_Logo.webp";
import statsLogo from "./assets/game_logos/Stats_Logo.png";
import flappyBlookLogo from "./assets/game_logos/Flappy_Blook_Logo.png";
import BElite from "./assets/B-Elite.png";

import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://zacycauwtkwjxbufkmjk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphY3ljYXV3dGt3anhidWZrbWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNTM4NjMsImV4cCI6MjA0NTYyOTg2M30.SYa6fSMtGb1JSynCltNAv1HEn9Imy_GC3eUqygPPZ9o');

export function App() {
  return (
    <>
      <header className="text-center">
        <h1>Blooket Leaderboards</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex h-center v-center">
            <div className="board-title">
              <h2>What is This?</h2>
            </div>
            <div className="board-contents">
              <p>Blooket Leaderboards is a website that showcases leaderboards ranking the achievements of many different blooket players. You can see leaderboards from a wide variety of different categories, from gamemodes, to stats, even to the leaderboards from blooket events. This website is here to showcase the skill of any and all blooket players.</p>
            </div>
          </div>
        </div>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Events</h2>
            </div>
            <div className="board-contents scrollable">
              <div className="board-button flex v-center between">
                <h2>CoC 2023</h2>
                <p>8-Dec-23 - 9-Dec-23</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>CoC 2022</h2>
                <p>29-Oct-22 - 30-Oct-22</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>L.U.N.C.H</h2>
                <p>5-Mar-22 - 5-Mar-22</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>PoP</h2>
                <p>11-Dec-21 - 12-Dec-21</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>CoC 2021</h2>
                <p>24-Oct-21 - 24-Oct-21</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>PAC</h2>
                <p>3-Aug-21 - 7-Aug-21</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>CoC 2020</h2>
                <p>26-Oct-20 - 26-Oct-20</p>
              </div>
              <div className="board-button flex v-center between">
                <h2>CoC 2019</h2>
                <p>28-Oct-19 - 8-Nov-19</p>
              </div>
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Most Popular</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function Gamemodes() {
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
              <a href="/gamemodes/factory">
                <img src={factoryLogo} alt="Factory Logo"></img>
              </a>
              <a href="/gamemodes/monster-brawl">
                <img src={monsterBrawlLogo} alt="Monster Brawl Logo"></img>
              </a>
              <a href="/gamemodes/fishing-frenzy">
                <img src={fishingFrenzyLogo} alt="Fishing Frenzy Logo"></img>
              </a>
              <a href="/gamemodes/tower-defense">
                <img src={towerDefenseLogo} alt="Tower Defense Logo"></img>
              </a>
              <a href="/gamemodes/tower-defense-2">
                <img src={towerDefense2Logo} alt="Tower Defense 2 Logo"></img>
              </a>
              <a href="/gamemodes/cafe">
                <img src={cafeLogo} alt="Cafe Logo"></img>
              </a>
              <a href="/gamemodes/crazy-kingdom">
                <img src={crazyKingdomLogo} alt="Crazy Kingdom Logo"></img>
              </a>
              <a href="/gamemodes/stats">
                <img src={statsLogo} alt="Stats Logo"></img>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function GamemodePage() {
  //Get Gamemode
  let params = useParams();

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    getGamemode(params.gamemode).then((r) => {

      //Get Header Value & Gamemode Info
      const header_array = r.gamemode.split("-");
      let header_text = "";
      for (let i = 0; i < header_array.length; i++) {
        header_text += firstUpperCase(header_array[i]) + " ";
      }
      const gamemode_info = r.info;

      //Get Leaderboards
      const leaderboardElements = [];
      for (let i = 0; i < r.leaderboards.length; i++) {
        const leaderboard = r.leaderboards[i];
        const icon_source = `/src/assets/icons/${leaderboard.icon}.png`;
        leaderboardElements.push(
          <>
            <div key={leaderboard.path} className="board-button flex v-center" onClick={selectLeaderboard.bind(this, r.gamemode, leaderboard.path)}>
              <img src={icon_source} alt={leaderboard.icon}></img>
              <h2>{leaderboard.name}</h2>
            </div>
          </>
        );
      }

      let response = {
        header: header_text,
        info: gamemode_info,
        leaderboards: leaderboardElements
      };
      setBoards(response);
    });
  }, [boards, params]);

  return (
    <>
      <header className="text-center">
        <h1>{boards.header} Leaderboards</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Leaderboards</h2>
            </div>
            <div className="board-contents scrollable">
              {boards.leaderboards}
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Info</h2>
            </div>
            <div className="board-contents">
              <p>{boards.info}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function LeaderboardPage() {
  let params = useParams();
  const [state, setState] = useState([]);

  useEffect(() => {
    getLeaderboard(params.gamemode, params.leaderboard).then((leaderboard) => {
      getUsers().then((users) => {
        //Add all scores to a list and a map
        let scoreArray = [];
        const userMap = new Map();
        let count = 0;
        users.forEach((user) => {
          const user_stats = { ...user.blooket_runs, ...user.blooket_stats }; //Combine stats and runs

          if (user_stats.hasOwnProperty(leaderboard.path)) {
            const score = Object.getOwnPropertyDescriptor(user_stats, leaderboard.path).value;

            //Unformat Score
            let temp;
            if (leaderboard.type == "Date") {
              temp = score.substring(0, 10);
              temp = temp.replaceAll("-", "");
            } else {
              temp = score;
              if (leaderboard.type == "Time") {
                temp = temp.replaceAll(":", "");
                temp = temp.replaceAll(".", "");
              }
            }
            temp = temp + (0.0001 * count);

            scoreArray.push(temp);
            userMap.set(scoreArray[count], { user: user, stats: user_stats });
          }

          count++;
        });

        //Sort Scores
        if (leaderboard.type == "Time" || leaderboard.type == "Date") {
          scoreArray = scoreArray.sort(function (a, b) { return a - b });
        } else {
          scoreArray = scoreArray.sort(function (a, b) { return b - a });
        }

        //Make Table
        const leaderboardElements = [];

        for (let i = 0; i < scoreArray.length; i++) {
          const data = userMap.get(scoreArray[i]);

          let score = Object.getOwnPropertyDescriptor(data.stats, leaderboard.path).value;

          //Format Score
          if (leaderboard.type == "Date") {
            score = score.slice(0, 10);
          }

          let blook_image = `https://ac.blooket.com/marketassets/blooks/${(data.stats.blook).replaceAll(" ", "").toLowerCase()}.svg`;
          if (data.stats.blook == "Elite") {
            blook_image = BElite;
          }
          leaderboardElements.push(
            <>
              <tr id={data.user.display_name} key={data.user.display_name}>
                <td>
                  <h2>{i + 1}.</h2>
                </td>
                <td className="lb-lock">
                  <div className="flex nowrap v-center">
                    <img src={blook_image} alt={data.stats.blook}></img>
                    <p>{data.user.display_name}</p>
                  </div>
                </td>
                <td>
                  <p>{score.toLocaleString()}</p>
                </td>
                <td>
                  <p>{data.stats.name}</p>
                </td>
              </tr>
            </>
          );
        }

        let response = {
          header: leaderboard.title,
          info: leaderboard.desc,
          type: leaderboard.type,
          scores: leaderboardElements
        };

        setState(response);
      });
    });
  }, [state, params]);

  return (
    <>
      <header className="text-center">
        <h1>{state.header}</h1>
      </header>
      <main>
        <div className="board-row">
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Info</h2>
            </div>
            <div className="board-contents">
              <p>{state.info}</p>
            </div>
          </div>
        </div>
        <div className="board-row">
          <div className="board leaderboard flex v-center">
            <div className="board-title">
              <h2>Ranking</h2>
            </div>
            <div className="lb">
              <table className="lb-table">
                <thead>
                  <tr>
                    <td className="lb-top-left">
                      <h2>#</h2>
                    </td>
                    <td className="lb-lock">
                      <h2>Person</h2>
                    </td>
                    <td>
                      <h2>{state.type}</h2>
                    </td>
                    <td className="lb-top-right">
                      <h2>Username</h2>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {state.scores}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function Account() {
  let params = useParams();
  const param_user = params.user;
  const current_user_data = JSON.parse(localStorage.getItem("sb-ughstfzbqkwwurstknii-auth-token"));

  const [state, setState] = useState([]);

  useEffect(() => {
    let selected_user;
    if (param_user) {
      selected_user = param_user;
    } else if (current_user_data) {
      selected_user = current_user_data.user.user_metadata.user_name;
    } else {
      setState(<LoginRedirect />);
      return;
    }

    getUser(selected_user).then((selected_user_data) => {
      //console.log(selected_user_data);
      const elements = [];

      //Account Header
      let blook_image = `https://ac.blooket.com/marketassets/blooks/${(selected_user_data.blooket_stats.blook).replaceAll(" ", "").toLowerCase()}.svg`;
      if (selected_user_data.blooket_stats.blook == "Elite") {
        blook_image = BElite;
      }
      elements.push(
        <>
          <div className="board-row">
            <div className="board account-header flex v-center">
              <img src={blook_image} alt="blook"></img>
              <div className="flex column">
                <h2>{selected_user_data.display_name}</h2>
                <p>{selected_user_data.blooket_stats.name}</p>
                <p>{selected_user_data.created_at}</p>
              </div>
            </div>
          </div>
        </>
      );

      //Stats and Runs
      const stat_elements = [];
      const stats = selected_user_data.blooket_stats;
      const stats_array = Object.keys(stats);
      const include = ["wins", "cafeCash", "upgrades", "defenseDmg", "foodServed", "numUnlocks", "boxesOpened", "gamesPlayed", "totalTokens", "showdownWins", "classicPoints", "defenseRounds", "correctAnswers", "playersDefeated", "totalFishWeight"];

      for (let i = 0; i < stats_array.length; i++) {
        if (!include.includes(stats_array[i])) {
          continue;
        }
        stat_elements.push(
          <div className="board-stat flex column v-center">
            <p>{stats_array[i]}</p>
            <h2>{Object.getOwnPropertyDescriptor(stats, stats_array[i]).value.toLocaleString()}</h2>
          </div>
        );
      }

      const runs_elements = [];
      const runs = selected_user_data.blooket_runs;
      const runs_array = Object.keys(runs);

      for (let i = 0; i < runs_array.length; i++) {
        const run_name_array = runs_array[i].split("-");
        let run_name = "";
        for (let i = 0; i < run_name_array.length; i++) {
          run_name += firstUpperCase(run_name_array[i]) + " ";
        }
        runs_elements.push(
          <>
            <div className="board-button flex between v-center">
              <h2>{run_name}</h2>
              <p>{Object.getOwnPropertyDescriptor(runs, runs_array[i]).value.toLocaleString()}</p>
            </div>
          </>
        );
      }

      elements.push(
        <>
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
        </>
      );

      setState(elements);
    });

  }, [state, param_user, current_user_data]);

  return (
    <>
      <main>
        {state}
      </main>
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
            <div className="board-contents">
              <a href="/sign-up">Sign Up</a>
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
      <button onClick={userSignUp.bind(this)}></button></>
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
              <h2 className="text-center">Complete these steps to complete your account creation!</h2>
              <ol type="1">
                <li>Login to <a href="https://blooket.com" target="_blank">Blooket</a> and come back to this page.</li>
                <li>Go to this link in a seperate tab: <a href="https://dashboard.blooket.com/api/users" target="_blank">Blooket API</a>.</li>
                <li>Copy all of the text on the page.</li>
                <li>Paste the data into the box below that says "Paste Here!".(It's the only light purple box on the page!)</li>
                <li>Submit! :D</li>
              </ol>
            </div>
          </div>
          <div className="board flex v-center">
            <div className="board-title">
              <h2>Fill Out</h2>
            </div>
            <div className="board-contents flex column v-center account-input">
              <input id="account-stats" type="text" placeholder="Paste Here!"></input>
              <button id="account-submit" type="submit" onClick={accountSignUp.bind(this)}>Submit</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <>
      <div style={{ color: 'black' }}>
        <h1> Privacy Policy for Blooket Leaderboards </h1>
        <h3> This Privacy Policy describes the information collected, how it is used and protected, and your privacy rights. </h3>
        <p> Last Updated: 27 October 2024 </p>
        <br />
        <h2> Terminology </h2>
        <p> Bolded words have meanings which are described below. </p>
        <ul>
          <li>
            <b> Account: </b> refers to a/the unique user that has added their <b>Personal Data</b> to Blooket
            Leaderboards.
          </li>
          <br />
          <li>
            <b> Blooket: </b> refers to Blooket LLC, and their service/website <a href="blooket.com"> blooket.com
            </a>.
          </li>
          <br />
          <li>
            <b> Company: </b> referred to "We", "Us", or "Our", and refers to Blooket Leaderboards.
          </li>
          <br />
          <li>
            <b> Personal Data: </b> any information that relates to an identified or identifiable individual.
          </li>
          <br />
          <li>
            <b> Service: </b> refers to the <b>Website</b>.
          </li>
          <br />
          <li>
            <b> Website: </b> refers to Blooket Leaderboards, accessed from <a href="blooket.games"> blooket.games
            </a>.
          </li>
          <br />
          <li>
            <b> You: </b> refers to the individual who uses the <b>Service</b>.
          </li>
        </ul>
        <br />
        <h2> Relations with Blooket LLC </h2>
        <p> <b>We</b> are a seperate service to <b>Blooket</b>. However, creating an <b>Account</b> using our <b>Service</b> requires you to use <b>Blooket</b> to make an account on their website. <b>We</b> are not responsible for any issues that may happen to your account or data on <b>Blooket</b>.
        </p>
        <br />
        <h2> Your Data </h2>
        <h3> What Data is Collected </h3>
        <p> When using <b>Our Service</b>, <b>We</b> may ask <b>You</b> to provide us with personal information that can
          be used to contact and identify you. Personal information that is collected may include, but not limmited
          to:
          <ul>
            <li> Email Address. </li>
            <br />
            <li> Your Discord Username </li>
            <br />
            <li> Your <b>Blooket</b> Username. </li>
            <br />
            <li> Your <b>Blooket</b> Statistics(ex. how many games you have played). </li>
            <br />
            <li>Your <b>Blooket</b> Account's Date of Creation. </li>
          </ul>
          Blooket Leaderboards will never ask you for your blooket password, payment information, or anything private to
          you. If anyone that says thay are associated with the <b>Service</b> or the <b>Website</b> and asks you for your
          blooket password, DO NOT GIVE THEM ANYTHING! I repeat, DO NOT GIVE THEM YOUR PASSWORD!!
        </p>
        <br />
        <h3> How Data is Collected </h3>
        <p> Your <b>Personal Data</b> is provided to <b>Us</b> through a form that can be seen on our <b>Website</b>. No
          data is taken without <b>Your</b> Consent. </p>
        <br />
        <h3> Why Data is Collected </h3>
        <p> Blooket Leaderboards is a service that collects data from <b>You</b> and others to rank users based on your
          <b>Blooket</b> Account's statistics. <b>We</b> use your data to rank you among others, to contact you if
          issues with the <b>Website</b> arises, or to inform <b>You</b> of changes relating to <b>Your Personal
            Data</b>.
        </p>
        <br />
        <h3> What Data is Made Public </h3>
        <p>
          Some of the data collected by <b>Us</b> is displayed on <b>Our Website</b>. This data includes:
          <ul>
            <li> Your <b>Blooket</b> Username. </li>
            <br />
            <li> Your <b>Blooket</b> Account's Statistics. </li>
            <br />
            <li> Your <b>Blooket</b> Account's Date of Creation. </li>
          </ul>
          <br />
        </p>
        <h3> What Data is Made Private </h3>
        <p> <b>Personal Data</b> that can be used to contact <b>You</b> is never shown to the public. This data may
          inclide but is not limited to:
          <ul>
            <li> Your Discord Username </li>
            <br />
            <li> Your Email Address </li>
            <br />
            <li> Any Other Data Used to Contact <b>You</b>. </li>
          </ul>
        </p>
        <br />
        <h3> Security of Your Personal Data </h3>
        <p> Keeping the privacy of the <b>Accounts</b> and the users are important. Nothing over the internet is 100%
          secure, but <b>We</b> do Our best to keep <b>Your</b> data secure. </p>
        <br />
        <h2> Your Rights </h2>
        <h3> Changing Your Contact Information </h3>
        <p> <b>You</b> are easily able to change the way <b>We</b> contact you. By resubmitting the form on the
          <b>Website</b> with a different contact, it automatically updates the contact info. <b>Your</b> old contact
          info is never saved, and is deleted when you change it.
        </p>
        <br />
        <h3> Deleting Your Data </h3>
        <p> If at any point you wish to delete your <b>Personal Data</b> that is saved, <b>You</b> may contact <b>Us</b>
          from any of the contacts provided at the end of this document. <b>We</b> are obligated to delete any and all
          data saved under <b>Your Account</b>. </p>
        <br />
        <h2> Children's Policy </h2>
        <p> Although <b>We</b> ask if <b>You</b> are over the age of 13, children are capable of giving <b>Us</b> false information.
          <b>We</b> never intentionally gather the data of anyone under the age of 13. If at any point it comes to
          <b>Our</b> attention that the <b>Personal Data</b> of someone under the age of 13 is in <b>Our</b> possesion, it becomes a priority to remove the data from our database.
        </p>
        <br />
        <h2> Contact Us </h2>
        <p>
          If you need to contact <b>Us</b> on questions about the <b>Service/Website</b>, matters regarding <b>Your</b> data, or any other matters, <b>You</b> may reach out to <b>Us</b> through the contact info
          provided below:
          <ul>
            <li><b> Email: </b> blooketelite@gmail.com </li>
          </ul>
        </p>
      </div>
    </>
  );
}

async function getGamemode(g) {
  const { data, error } = await supabase.from('Leaderboards').select();

  if (error) {
    console.error(error);
  } else {

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (data[i].gamemode != g) {
        continue;
      }
      return data[i];
    }
  }
  return;
}

async function getLeaderboard(g, p) {
  const { data, error } = await supabase.from('Leaderboards').select();

  if (error) {
    console.error(error);
    return;
  }
  let gamemode;
  //get gamemode
  for (let i = 0; i < data.length; i++) {
    if (data[i].gamemode != g) {
      continue;
    }
    gamemode = data[i].leaderboards;
  }

  //get lb
  for (let i = 0; i < gamemode.length; i++) {
    if (gamemode[i].path != p) {
      continue;
    }
    return gamemode[i];
  }
}

async function getUsers() {
  const { data, error } = await supabase.from('Users').select();

  if (error) {
    console.error(error);
  } else {
    return data;
  }
  return;
}

async function getUser(user_name) {
  const { data, error } = await supabase.from('Users').select();
  if (error) {
    console.error(error);
    return;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].display_name == user_name) {
        return data[i];
      }
    }
  }
}

async function userSignUp() {
  /*
  const username = document.getElementById("username-input").value;
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  */

  let { data, error } = await supabase.auth.signUp({
    email: "test@something.com",
    password: "supergoodpassword1",
    options: {
      shouldCreateUser: false,
      data: {
        user_name: "Leonidas",
      }
    }
  });
  if (error) {
    console.error(error);
    return;
  }
  window.location.href = "/create-account";
}

async function accountSignUp() {
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);

  const { error } = await supabase.from('users').insert({ display_name: user.user_metadata.user_name, email: user.email, user_id: user.user_id, created_at: user.created_at, blooket_stats: {}, blooket_id: "1", blooket_runs: {} });
  console.log(error);
}

function selectLeaderboard(gamemode, path) {
  window.location.href = `/gamemodes/${gamemode}/${path}`;
}

function firstUpperCase(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}