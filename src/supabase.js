import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://zacycauwtkwjxbufkmjk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphY3ljYXV3dGt3anhidWZrbWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNTM4NjMsImV4cCI6MjA0NTYyOTg2M30.SYa6fSMtGb1JSynCltNAv1HEn9Imy_GC3eUqygPPZ9o"
  );
export default supabase;

export async function getAllGamemodes() {
  const { data, error } = await supabase.from("Gamemodes").select();
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getGamemode(gamemode_path) {
  const { data, error } = await supabase.from("Gamemodes").select().eq("gamemode_path", gamemode_path).limit(1).single();
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getAllLeaderboards() {
  const { data, error } = await supabase.from("Categories").select("*, gamemode:Gamemodes!Categories_lb_gamemode_fkey ( path:gamemode_path )");
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getLeaderboardsFromGamemode(gamemode_name) {
  const { data, error } = await supabase.from("Categories").select().eq("lb_gamemode", gamemode_name);
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getLeaderboard(leaderboard_path) {
  const { data, error } = await supabase.from("Categories").select().eq("lb_path", leaderboard_path).limit(1).single();
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getRunsFromLeaderboard(leaderboard) {
    const { data, error } = await supabase.from("Accepted_Runs").select("*, user_data:Users!Accepted_Runs_run_player_fkey ( user_name, user_blooket_stats->name, user_blooket_stats->blook ), verifier_data:Users!Accepted_Runs_accepted_by_fkey ( user_name, user_blooket_stats->blook )").eq("run_leaderboard", leaderboard.id).order("run_score", { ascending: leaderboard.lb_score_type != "Score"});
    if (error) {
      console.error(error);
      throw error;
    }
    return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase.from("Users").select();
  if (error) {
    console.error(error);
    return;
  }
  return data;
}

export async function getAllUsersWithStat(stat_name) {
  let { data, error } = await supabase.from("Users").select().gt(`user_blooket_stats->${stat_name}`, 0).order(`user_blooket_stats->${stat_name}`, { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }
  if (stat_name == "dateCreated") {
    data = (await supabase.from("Users").select().not(`user_blooket_stats->${stat_name}`, "is", null).order(`user_blooket_stats->${stat_name}`, { ascending: true })).data;
  }
  return data;
}

export async function getUser(user_name) {
  const { data, error } = await supabase.from("Users").select().eq("user_name", user_name).limit(1).single();
  if (error) {
    console.error(error);
    return;
  }
  return data;
}

export async function getRunsFromUser(user_id) {
    const { data, error } = await supabase.from("Accepted_Runs").select("*, leaderboard:Categories ( name:lb_title_short, path:lb_path, type:lb_score_type, gamemode:Gamemodes!Categories_lb_gamemode_fkey ( path:gamemode_path ) )").eq("run_player", user_id).order("lb_title_long", { referencedTable: 'Categories', ascending: false });
    console.log(data);
    if (error) {
      console.error(error);
      throw error;
    }
    return data;
}

export const Authentication = {
  userLogIn: async function userLogIn() {
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    const { error } = await supabase.auth.signInWithPassword({ email: email, password: password,})
    if (error) {
      console.error(error);
      return;
    }
    globalThis.location.reload();
  },
  userLogOut: async function userLogOut() {
    if ((await supabase.auth.signOut()).error) {
      console.error(error);
      return;
    }
    alert("You have been successfully logged out!");
    globalThis.location.assign("/");
  },
  userSignUp: async function userSignUp() {
    const username = document.querySelector("#username-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;
    const age_verification = document.querySelector("#stats-age");
    const privacy_verification = document.querySelector("#stats-privacy");

    if (!username || !email || !password) {
      alert("Please fill in all input fields!");
      return;
    }
    if (!age_verification.checked || !privacy_verification.checked) {
      alert("Make sure to check all of the boxes!\nPrivacy Policy and Age.");
      return;
    }

    getAllUsers().then(async (users) => {
      if (users.some((x) => x.user_name == username)) {
        alert("Username is already taken.\nPlease pick a new name!");
        return;
      }
      const { error } = await supabase.auth.signUp({ email, password, options: { shouldCreateUser: false, data: { user_name: username, }, } });
      if (error) {
        if (error == "AuthApiError: User already registered") {
          alert("Email is already taken.\nPlease use a different email!");
          return;
        }
        alert(error);
        return;
      }
      globalThis.location.assign("/add-stats");
    });
  },
  createUserData: async function createUserData() {
    const account_stats = JSON.parse(document.querySelector("#account-stats").value);
    if (!account_stats) {
      alert("Error: You put in your blooket stats wrong.\nTry re-copying and pasting.");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("Users").insert({
      user_name: user.user_metadata.user_name,
      user_id: user.id,
      created_at: user.created_at,
      user_blooket_stats: {},
      stats_last_updated: new Date().toJSON(),
    });
    if (error) {
      console.error(error);
      return;
    }
    await updateBlooketStats(account_stats);
    globalThis.location.assign("/");
  }
};

export async function updateBlooketStats(account_stats) {
  if (!account_stats) {
    alert("Error: You put in your blooket stats wrong.\nTry re-copying and pasting.");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("Users").update({ user_blooket_stats: account_stats, stats_last_updated: new Date().toJSON() }).eq("user_id", user.id);
  if (error) {
    console.error(error);
    return;
  }
}

export async function submitRun(selected_leaderboard) {
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) {
    alert("Error: Please log in!");
    return;
  }

  let video_input = document.querySelector("#video-input").value;
  if(!video_input) {
    alert("Error: Please provide a link to a recording of your run!");
    return;
  }
  if(video_input.includes("youtu")) {
    const response = await fetch(`https://www.youtube.com/oembed?url=${video_input}`);
    const json = await response.json();
    video_input = new DOMParser().parseFromString(json.html, "text/html").body.firstChild.src;
  }

  if(selected_leaderboard.lb_score_type == "Time") {
    const score_input = {
      hours: document.querySelector("#time-input-hours").value,
      minutes: document.querySelector("#time-input-minutes").value,
      seconds: document.querySelector("#time-input-seconds").value,
      milliseconds: document.querySelector("#time-input-milliseconds").value,
    }
    if(!score_input.hours && !score_input.minutes && !score_input.seconds && !score_input.milliseconds) {
      alert("Error: Please fill in your final time!");
      return;
    }
    const { error } = await supabase.from("Submitted_Runs").insert(
      { 
        run_leaderboard: selected_leaderboard.id,
        run_player: user.id, 
        run_score: Number(`${score_input.hours}${score_input.minutes.padStart(2, "0")}${score_input.seconds.padStart(2, "0")}${score_input.milliseconds.padStart(3, "0")}`),
        submitted_at: new Date().toJSON(),
        run_video_link: video_input,
      }
    );
    if (error) {
      console.error(error);
      return;
    }
    alert("Your run has been submitted! \n Please wait until someone reviews it :Þ");
    return;
  } 
  const score_input = document.querySelector("#score-input").value;
  if(!score_input) {
      alert("Error: Please fill in your final score!");
      return;
    }
    const { error } = await supabase.from("Submitted_Runs").insert(
      { 
        run_leaderboard: selected_leaderboard.id,
        run_player: user.id, 
        run_score: Number(score_input),
        submitted_at: new Date().toJSON(),
        run_video_link: video_input,
      }
    );
    if (error) {
      console.error(error);
      return;
    }
    alert("Your run has been submitted! \n Please wait until someone reviews it :Þ");
}
export async function getTopLeaderboards() {
  const { data, error } = await supabase.from("most_popular").select();
  if (error) {
    console.error(error);
    return;
  }
  return data;
}