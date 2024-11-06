import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase, {
	factoryLogo,
	monsterBrawlLogo,
	fishingFrenzyLogo,
	towerDefenseLogo,
	towerDefense2Logo,
	cafeLogo,
	crazyKingdomLogo,
	statsLogo,
	extrasLogo,
	BElite,
	firstUppercase,
	icons,
	getUsers,
} from "./common.js";

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
								<img src={factoryLogo} alt="Factory Logo" />
							</a>
							<a href="/gamemodes/monster-brawl">
								<img src={monsterBrawlLogo} alt="Monster Brawl Logo" />
							</a>
							<a href="/gamemodes/fishing-frenzy">
								<img src={fishingFrenzyLogo} alt="Fishing Frenzy Logo" />
							</a>
							<a href="/gamemodes/tower-defense">
								<img src={towerDefenseLogo} alt="Tower Defense Logo" />
							</a>
							<a href="/gamemodes/tower-defense-2">
								<img src={towerDefense2Logo} alt="Tower Defense 2 Logo" />
							</a>
							<a href="/gamemodes/cafe">
								<img src={cafeLogo} alt="Cafe Logo" />
							</a>
							<a href="/gamemodes/crazy-kingdom">
								<img src={crazyKingdomLogo} alt="Crazy Kingdom Logo" />
							</a>
							<a href="/gamemodes/stats">
								<img src={statsLogo} alt="Stats Logo" />
							</a>
							<a href="/gamemodes/extras">
								<img src={extrasLogo} alt="Exras Logo" />
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
	let parameters = useParams();
	const [boards, setBoards] = useState([]);
	useEffect(() => {
		supabase
			.channel("leaderboards")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "Leaderboards" },
				() => {
					update(parameters.gamemode);
				}
			)
			.subscribe(); //This is here for realtime updates

		function update(g) {
			getGamemode(g).then((r) => {
				const header_array = r.gamemode.split("-");
				let header_text = "";
				for (const element of header_array) {
					header_text += `${firstUppercase(element)} `;
				}
				const gamemode_info = r.info;

				//Get Leaderboards
				const leaderboardElements = [];
				for (const leaderboard of r.BEliteleaderboards) {
					leaderboardElements.push(
						<div
							key={leaderboard.path}
							className="board-button flex v-center"
							onClick={globalThis.location.assign(
								`/gamemodes/${r.gamemode}/${leaderboard.path}`
							)}
						>
							<img src={icons[leaderboard.icon]} alt={leaderboard.icon} />
							<h2>{leaderboard.name}</h2>
						</div>
					);
				}

				let response = {
					header: header_text,
					info: gamemode_info,
					leaderboards: leaderboardElements,
				};
				setBoards(response);
			});
		}
		update(parameters.gamemode);
	}, [parameters]);

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
	let parameters = useParams();
	const [state, setState] = useState([]);

	useEffect(() => {
		supabase
			.channel("leaderboard")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "Leaderboards" },
				() => {
					update(parameters.gamemode, parameters.leaderboard);
				}
			)
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "Users" },
				() => {
					update(parameters.gamemode, parameters.leaderboard);
				}
			)
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "Users" },
				() => {
					update(parameters.gamemode, parameters.leaderboard);
				}
			)
			.subscribe(); //This is here for realtime updates

		function update(g, p) {
			getLeaderboard(g, p).then((leaderboard) => {
				getUsers().then((users) => {
					//Add all scores to a list and a map
					let scoreArray = [];
					const userMap = new Map();
					let count = 0;
					for (const user in users) {
						const user_stats = { ...user.blooket_runs, ...user.blooket_stats }; //Combine stats and runs

						if (Object.hasOwn(user_stats, leaderboard.path)) {
							const score = Object.getOwnPropertyDescriptor(
								user_stats,
								leaderboard.path
							).value;

							//Unformat Score
							let temporary;
							if (leaderboard.type == "Date") {
								temporary = score.slice(0, 10);
								temporary = temporary.replaceAll("-", "");
							} else {
								temporary = score;
								if (leaderboard.type == "Time") {
									temporary = temporary.replaceAll(":", "");
									temporary = temporary.replaceAll(".", "");
								}
							}
							temporary = temporary + 0.0001 * count;

							scoreArray.push(temporary);
							userMap.set(scoreArray.at(-1), { user: user, stats: user_stats });
						}

						count++;
					}

					//Sort Scores
					scoreArray =
						leaderboard.type == "Time" || leaderboard.type == "Date"
							? scoreArray.sort(function (a, b) {
									return a - b;
								})
							: scoreArray.sort(function (a, b) {
									return b - a;
								});
					scoreArray = scoreArray.filter((element) => element >= 1); //Delete scores less than 0

					//Make Table
					const leaderboardElements = [];

					for (let index = 0; index < scoreArray.length; index++) {
						const data = userMap.get(scoreArray[index]);

						let score = Object.getOwnPropertyDescriptor(
							data.stats,
							leaderboard.path
						).value;

						//Format Score
						if (leaderboard.type == "Date") {
							score = score.slice(0, 10);
						}

						let blook_image = `https://ac.blooket.com/marketassets/blooks/${data.stats.blook
							.replaceAll(" ", "")
							.toLowerCase()}.svg`;
						let name_class = "";
						//Custom Stuff
						if (data.stats.blook == "Elite") {
							blook_image = BElite;
							name_class = "rainbow";
						}
						leaderboardElements.push(
							<tr id={data.user.display_name} key={data.user.display_name}>
								<td>
									<h2>{index + 1}.</h2>
								</td>
								<td
									className="lb-lock"
									onClick={globalThis.location.assign(
										`/account/${data.user.display_name}`
									)}
								>
									<div className="flex nowrap v-center">
										<img src={blook_image} alt={data.stats.blook} />
										<p className={name_class}>{data.user.display_name}</p>
									</div>
								</td>
								<td>
									<p>{score.toLocaleString()}</p>
								</td>
								<td>
									<p>{data.stats.name}</p>
								</td>
							</tr>
						);
					}

					let response = {
						header: leaderboard.title,
						info: leaderboard.desc,
						type: leaderboard.type,
						scores: leaderboardElements,
					};
					setState(response);
				});
			});
		}
		update(parameters.gamemode, parameters.leaderboard);
	}, [parameters]);

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
								<tbody>{state.scores}</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

async function getGamemode(g) {
	const { data, error } = await supabase.from("Leaderboards").select();

	if (error) {
		console.error(error);
		throw error;
	} else {
		for (const element of data) {
			if (element.gamemode != g) {
				continue;
			}
			return element;
		}
	}
}

async function getLeaderboard(g, p) {
	const { data, error } = await supabase.from("Leaderboards").select();

	if (error) {
		console.error(error);
		throw error;
	}
	let gamemode;
	//get gamemode
	for (const element of data) {
		if (element.gamemode != g) {
			continue;
		}
		gamemode = element.leaderboards;
	}

	//get lb
	for (const element of data) {
		if (element.path != p) {
			continue;
		}
		return element;
	}
}
