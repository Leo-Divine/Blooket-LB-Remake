import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase, { BElite, firstUppercase, getUsers } from "./common.js";

export function Account() {
  let parameters = useParams();
  const parameter_user = parameters.user;
  const current_user_data = JSON.parse(
    localStorage.getItem("sb-zacycauwtkwjxbufkmjk-auth-token")
  );
  const [state, setState] = useState([]);

  let selected_user;
  if (parameter_user) {
    selected_user = parameter_user;
  } else if (current_user_data) {
    selected_user = current_user_data.user.user_metadata.user_name;
  }

  useEffect(() => {
    supabase
      .channel("leaderboards")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Users" },
        () => {
          update(selected_user);
        }
      )
      .subscribe();

    function update(selected_user) {
      //Check if user isn't logged in or viewing others profile
      console.log(selected_user);
      if (!selected_user) {
        setState(<LoginRedirect />);
        return;
      }

      //Get data
      getUser(selected_user).then((selected_user_data) => {
        const elements = [];

        //Account Header
        let blook_image = `https://ac.blooket.com/marketassets/blooks/${selected_user_data.blooket_stats.blook
          .replaceAll(" ", "")
          .toLowerCase()}.svg`;
        let name_class = "";

        //Custom Stuff
        if (selected_user_data.blooket_stats.blook == "Elite") {
          blook_image = BElite;
          name_class = "rainbow";
        }
        elements.push(
          <>
            <div className="board-row">
              <div className="board account-header flex v-center">
                <img src={blook_image} alt="blook"></img>
                <div className="flex column">
                  <h2 className={name_class}>
                    {selected_user_data.display_name}
                  </h2>
                  <p>{selected_user_data.blooket_stats.name}</p>
                  <p>{selected_user_data.created_at.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </>
        );

        //Stats and Runs
        const stat_elements = [];
        const stats = selected_user_data.blooket_stats;
        const stats_array = Object.keys(stats);
        const include = new Set([
          "wins",
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
          "totalFishWeight",
        ]);

        for (const element of stats_array) {
          if (!include.has(element)) {
            continue;
          }
          stat_elements.push(
            <div className="board-stat flex column v-center">
              <p>{element}</p>
              <h2>
                {Object.getOwnPropertyDescriptor(
                  stats,
                  element
                ).value.toLocaleString()}
              </h2>
            </div>
          );
        }

        const runs_elements = [];
        const runs = selected_user_data.blooket_runs;
        const runs_array = Object.keys(runs);

        for (const element of runs_array) {
          const run_name_array = element.split("-");
          let run_name = "";
          for (const element of run_name_array) {
            run_name += firstUppercase(element) + " ";
          }
          runs_elements.push(
            <>
              <div className="board-button flex between v-center">
                <h2>{run_name}</h2>
                <p>
                  {Object.getOwnPropertyDescriptor(
                    runs,
                    element
                  ).value.toLocaleString()}
                </p>
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
                <div className="board-contents scrollable">{runs_elements}</div>
              </div>
            </div>
          </>
        );

        if (globalThis.location.pathname == "/account") {
          elements.push(<Settings />);
        }

        setState(elements);
      });
    }
    update(selected_user);
  }, [selected_user]);

  return <main>{state}</main>;
}

function Settings() {
  return (
    <div className="board-row">
      <div className="board flex v-center">
        <div className="board-title">
          <h2>Settings</h2>
        </div>
        <div className="board-contents">
          <button type="button" onClick={userLogOut()}>
            Logout
          </button>
        </div>
      </div>
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
          ></input>
          <button
            id="account-submit"
            className="inputs"
            type="submit"
            onClick={updateStats()}
          >
            Submit
          </button>
          <a href="https://dashboard.blooket.com/api/users" target="_blank">
            Blooket API
          </a>
        </div>
      </div>
    </div>
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
              <input
                id="email-input"
                className="inputs"
                type="email"
                placeholder="Email"
              ></input>
              <input
                id="password-input"
                className="inputs"
                type="password"
                placeholder="Password"
              ></input>
              <button
                id="user-submit"
                className="inputs"
                type="submit"
                onClick={userLogIn()}
              >
                Login
              </button>
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
                onClick={signUpData()}
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
              ></input>
              <button
                id="account-submit"
                className="inputs"
                type="submit"
                onClick={accountSignUp()}
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

async function getUser(user_name) {
  const { data, error } = await supabase.from("Users").select();
  if (error) {
    console.error(error);
    return;
  } else {
    for (const element of data) {
      if (element.display_name == user_name) {
        return element;
      }
    }
  }
}

async function userLogIn() {
  const email = document.querySelector("#email-input").value;
  const password = document.querySelector("#password-input").value;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    alert(error);
    return;
  }
  globalThis.location.reload();
}

async function userLogOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    return;
  }
  alert("You have been successfully logged out!");
  globalThis.location.assign("/");
}

async function signUpData() {
  const username = document.querySelector("#username-input").value;
  const email = document.querySelector("#email-input").value;
  const password = document.querySelector("#password-input").value;
  const age_verification = document.querySelector("#stats-age");
  const privacy_verification = document.querySelector("#stats-privacy");

  if (!username) {
    alert("Please provide a username!");
    return;
  }
  if (!email) {
    alert("Please provide a email!");
    return;
  }
  if (!password) {
    alert("Please provide a password!");
    return;
  }
  console.log(privacy_verification.checked);
  if (!age_verification.checked || !privacy_verification.checked) {
    alert("Make sure to check all of the boxes!\nPrivacy Policy and Age.");
    return;
  }

  //Check for Duplicate Usernames
  const user_array = [];
  getUsers().then((users) => {
    for (const user of users) {
      user_array.push(user.display_name);
    };
    if (user_array.includes(username)) {
      alert("Username is already taken.\nPlease pick a new name!");
      return;
    }
    userSignUp(username, email, password);
  });
}

async function userSignUp(user_name, email, password) {
  let { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      shouldCreateUser: false,
      data: {
        user_name,
      },
    },
  });
  if (error) {
    if (error == "AuthApiError: User already registered") {
      alert("Email is already taken.\nPlease use a different email!");
      return;
    }
    alert(error);
    return;
  }
  globalThis.location.assign("/create-account");
}

async function updateStats() {
  const account_stats = JSON.parse(
    document.querySelector("#account-stats").value
  );
  if (!account_stats) {
    alert(
      "Error: You put in your blooket stats wrong.\nTry re-copying and pasting."
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("Users")
    .update({ blooket_stats: account_stats })
    .eq("display_name", user.user_metadata.user_name);
  if (error) {
    console.error(error);
  }
}

async function accountSignUp() {
  const account_stats = JSON.parse(
    document.querySelector("#account-stats").value
  );
  if (!account_stats) {
    alert(
      "Error: You put in your blooket stats wrong.\nTry re-copying and pasting."
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(account_stats);

  const { error } = await supabase.from("Users").insert({
    display_name: user.user_metadata.user_name,
    user_id: user.id,
    created_at: user.created_at,
    blooket_stats: account_stats,
    blooket_id: account_stats._id,
    blooket_runs: {},
  });
  if (error) {
    alert(error);
    return;
  }
  globalThis.location.assign("/");
}
