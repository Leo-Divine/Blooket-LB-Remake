import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FontAwesomeIcons } from "./common.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Events.css';

import popGoldIcon from "./assets/pop/gold.png";
import popLogo from "./assets/pop/pop_logo.png";
import popEmblem1 from "./assets/pop/pop_emblems/emblem1.png";
import popEmblem2 from "./assets/pop/pop_emblems/emblem2.png";
import popEmblem3 from "./assets/pop/pop_emblems/emblem3.png";
import popEmblem4 from "./assets/pop/pop_emblems/emblem4.png";
import popEmblem5 from "./assets/pop/pop_emblems/emblem5.png";
import popEmblem6 from "./assets/pop/pop_emblems/emblem6.png";
import popEmblem7 from "./assets/pop/pop_emblems/emblem7.png";
import popEmblem8 from "./assets/pop/pop_emblems/emblem8.png";
import popEmblem9 from "./assets/pop/pop_emblems/emblem9.png";
import popEmblem10 from "./assets/pop/pop_emblems/emblem10.png";
import popEmblem11 from "./assets/pop/pop_emblems/emblem11.png";
import popEmblem12 from "./assets/pop/pop_emblems/emblem12.png";
import popEmblem13 from "./assets/pop/pop_emblems/emblem13.png";
import popEmblem14 from "./assets/pop/pop_emblems/emblem14.png";
import popEmblem15 from "./assets/pop/pop_emblems/emblem15.png";
import popEmblem16 from "./assets/pop/pop_emblems/emblem16.png";
import popEmblem17 from "./assets/pop/pop_emblems/emblem17.png";
import popEmblem18 from "./assets/pop/pop_emblems/emblem18.png";
import popEmblem19 from "./assets/pop/pop_emblems/emblem19.png";
import popEmblem20 from "./assets/pop/pop_emblems/emblem20.png";
import popEmblem21 from "./assets/pop/pop_emblems/emblem21.png";
import popEmblem22 from "./assets/pop/pop_emblems/emblem22.png";
import popEmblem23 from "./assets/pop/pop_emblems/emblem23.png";
import popEmblem24 from "./assets/pop/pop_emblems/emblem24.png";
import popEmblem25 from "./assets/pop/pop_emblems/emblem25.png";
import popEmblem26 from "./assets/pop/pop_emblems/emblem26.png";
import popEmblem27 from "./assets/pop/pop_emblems/emblem27.png";
import popEmblem28 from "./assets/pop/pop_emblems/emblem28.png";
import popEmblem29 from "./assets/pop/pop_emblems/emblem29.png";
import popEmblem30 from "./assets/pop/pop_emblems/emblem30.png";
import popEmblem31 from "./assets/pop/pop_emblems/emblem31.png";
import popEmblem32 from "./assets/pop/pop_emblems/emblem32.png";
import popEmblem33 from "./assets/pop/pop_emblems/emblem33.png";
import popEmblem34 from "./assets/pop/pop_emblems/emblem34.png";
import popEmblem35 from "./assets/pop/pop_emblems/emblem35.png";
import popEmblem36 from "./assets/pop/pop_emblems/emblem36.png";
import popEmblem37 from "./assets/pop/pop_emblems/emblem37.png";
import popEmblem38 from "./assets/pop/pop_emblems/emblem38.png";
import popEmblem39 from "./assets/pop/pop_emblems/emblem39.png";
import popEmblem40 from "./assets/pop/pop_emblems/emblem40.png";
import popEmblem41 from "./assets/pop/pop_emblems/emblem41.png";
import popEmblem42 from "./assets/pop/pop_emblems/emblem42.png";
import popEmblem43 from "./assets/pop/pop_emblems/emblem43.png";
import popEmblem44 from "./assets/pop/pop_emblems/emblem44.png";
import popEmblem45 from "./assets/pop/pop_emblems/emblem45.png";
import popEmblem46 from "./assets/pop/pop_emblems/emblem46.png";
import popEmblem47 from "./assets/pop/pop_emblems/emblem47.png";
import popEmblem48 from "./assets/pop/pop_emblems/emblem48.png";

const EMBLEMS = [
  popEmblem1,
  popEmblem2,
  popEmblem3,
  popEmblem4,
  popEmblem5,
  popEmblem6,
  popEmblem7,
  popEmblem8,
  popEmblem9,
  popEmblem10,
  popEmblem11,
  popEmblem12,
  popEmblem13,
  popEmblem14,
  popEmblem15,
  popEmblem16,
  popEmblem17,
  popEmblem18,
  popEmblem19,
  popEmblem20,
  popEmblem21,
  popEmblem22,
  popEmblem23,
  popEmblem24,
  popEmblem25,
  popEmblem26,
  popEmblem27,
  popEmblem28,
  popEmblem29,
  popEmblem30,
  popEmblem31,
  popEmblem32,
  popEmblem33,
  popEmblem34,
  popEmblem35,
  popEmblem36,
  popEmblem37,
  popEmblem38,
  popEmblem39,
  popEmblem40,
  popEmblem41,
  popEmblem42,
  popEmblem43,
  popEmblem44,
  popEmblem45,
  popEmblem46,
  popEmblem47,
  popEmblem48,
];

export function CoC2023() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("coc_2023").then((leaderboard) => {
      //Get an array of all ranking-box elements
      const rankingElements = [];
      for (const [index, data] of leaderboard.entries()) {
        const time_string = new Date(Date.parse(data.time));
        rankingElements.push(
          <div key={index} className="ranking-box text-center">
            <h2>{`${ordinalNumber(index + 1)} Place`}</h2>
            <h3>{data.name}</h3>
            <h4>Stickers: 108</h4>
            <h6>{`Dec ${time_string.getDate()}th 2023, ${time_string.toTimeString().slice(0, 8)}`}</h6>
          </div>
        );
      }

      //Put the rankingElements into pairs
      const elements = [];
      for (let index = 0; index < leaderboard.length; index += 2) {
        elements.push(
          <div key={index} className="flex h-center">
            {rankingElements[index]}
            {rankingElements[index + 1]}
          </div>
        );
      }

      setState(elements);
    });
  }, []);
  return (
    <>
      <header className="text-center">
        <h1>Contest of Candy 2023</h1>
      </header>
      <main>
        <div className="coc-2023 flex h-center">
          {state}
        </div>
      </main>
    </>
  );
}

export function CoC2022() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("coc_2022").then((leaderboard) => {
      const elements = [];
      for (const [index, data] of leaderboard.entries()) {
        elements.push(
          <div key={index} className="ranking-box flex between">
            <h3>{`${ordinalNumber(index + 1)}. ${data.name}`}</h3>
            <p>{`${data.toys} Toys`}</p>
          </div>
        );
      }
      setState(elements);
    });
  }, []);

  return (
    <>
      <header className="text-center">
        <h1>Contest of Candy 2022</h1>
      </header>
      <main>
        <div className="coc-2022 flex column v-center">
          {state}
        </div>
      </main>
    </>
  );
}

export function LUNCH() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("lunch").then((leaderboard) => {
      const elements = [];
      for (const [index, data] of leaderboard.entries()) {
        let img_source;
        img_source = data.flag == "cor" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_of_Corsica.svg/1200px-Flag_of_Corsica.svg.png" : `https://flagicons.lipis.dev/flags/4x3/${data.flag}.svg`;
        elements.push(
          <div key={index} className="ranking-box flex">
            <img src={img_source} alt="Flag" />
            <div>
              <h3>{data.name}</h3>
              <h4>{`${data.score.toLocaleString()}🏆`}</h4>
              <h4>{ordinalNumber(index + 1)}</h4>
            </div>
          </div>
        );
      }
      setState(elements);
    });
  }, []);
  return (
    <>
      <header className="text-center">
        <h1>Legendary Universal Never-Before-Seen Championships of Hockey</h1>
      </header>
      <main>
        <div className="lunch flex around">
          {state}
        </div>
      </main>
    </>
  );
}

export function PoP() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("pop").then((guilds) => {
      setState(guilds.map((guild, index) => (
        <div className="container guild" onClick={() => {globalThis.location.pathname = `/events/pop/${guild._id}`}}>
          <h3>{ordinalNumber(index + 1)}</h3>
          <img className="container" src={EMBLEMS[guild.emblemIndex]}></img>
          <h3 className="name">{guild.name}</h3>
          <div className="flex v-center nowrap">
            <h3>{guild.gold.toLocaleString()}</h3>
            <img src={popGoldIcon} alt="Gold"></img>
          </div>
        </div>
      )));
    });
  }, []);

  return (
    <>
      <header className="flex h-center">
        <img className="pop-logo" src={popLogo} alt="PoP Logo"></img>
      </header>
      <main>
        <div className="pop flex column v-center">
          {state}
        </div>
      </main>
    </>
  );
}

export function PoPTeam() {
  let parameters = useParams();
  const [state, setState] = useState([]);

  useEffect(() => {
    getEventLeaderboard("pop").then((guilds) => {
      const guild = guilds.find((x) => x._id == parameters.guild);

      setState(
        <>
          <div className="container header">
            <img className="container emblem" src={EMBLEMS[guild.emblemIndex]}></img>
            <div className="name" style={{alignSelf: "flex-start"}}>
              <h3>{guild.name}</h3>
              <h5>{guild.desc}</h5>
            </div>
            <div className="flex v-center nowrap">
              <h4>{guild.numMembers}</h4>
              <FontAwesomeIcon icon={FontAwesomeIcons.users} />
            </div>
          </div>
          {guild.members.map((member) => (<div className="container member">
            <h4 className="name">{member.name}</h4>
            <p>Blooket: {member.blooketName}</p>
            <div className="flex v-center nowrap">
              <h4>{member.gold.toLocaleString()}</h4>
              <img src={popGoldIcon} alt="Gold"></img>
            </div>
          </div>))}
        </>
      );
    });
  }, []);

  return (
    <main>
      <div className="pop flex column v-center">
        {state}
      </div>
    </main>
  );
}

export function CoC2021() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("coc_2021").then((leaderboard) => {
      setState(leaderboard.map((player, index) => (
        <div key={index} className="ranking-box flex between v-center">
          <div className="flex v-center">
            <p>{ordinalNumber(index + 1)}&nbsp;</p>
            <h3>{player.name}</h3>
          </div>
          <p>10/24 {new Date(Date.parse(player.time)).toLocaleTimeString().slice(0, 8)}</p>
        </div>
      )));
    });
  }, []);

  return (
    <>
      <header className="text-center">
        <h1>Contest of Candy 2021</h1>
      </header>
      <main>
        <div className="coc-2021 flex column v-center">
          {state}
        </div>
      </main>
    </>
  );
}

export function PAC() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("pac").then((leaderboard) => {
      const rankingElements = [];
      const top3Elements = []
      for (const [index, player] of leaderboard.entries()) {
        if(index < 3) {
          top3Elements.push(
            <div key={index} className="ranking-box top-3 flex between nowrap">
              <img src={index == 2 ? "/src/assets/charizard.webp" : "/src/assets/lugia.webp"} alt=""/>
              <div>
                <div className="text-box flex between">
                  <p>Rank:</p>
                  <p>{index + 1}</p>
                </div>
                <div className="text-box flex between">
                  <p>Name:</p>
                  <p>{player.name}</p>
                </div>
                <div className="text-box flex between">
                  <p>Cards:</p>
                  <p>{player.cards}</p>
                </div>
              </div>
            </div>
          );
          continue;
        }
        rankingElements.push(
          <div key={index} className="ranking-box flex between">
            <div className="text-box flex between">
              <p>Rank:</p>
              <p>{index + 1}</p>
            </div>
            <div className="text-box flex between">
              <p>Name:</p>
              <p>{player.name}</p>
            </div>
            <div className="text-box flex between">
              <p>Cards:</p>
              <p>{player.cards}</p>
            </div>
          </div>
        );
      }
      setState(
        <>
          <div className="flex h-center top-3">
            {top3Elements}
          </div>
          {rankingElements}
        </>
      );
    });
  }, []);

  return (
    <main>
      <div className="pac flex column v-center">
        {state}
      </div>
    </main>
  );
}

export function CoC2020() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("coc_2020").then((leaderboard) => {
      setState(leaderboard.map((player, index) => (
        <div key={index} className="ranking-box flex between v-center">
          <div className="flex v-center">
            <h2>&nbsp;{`${ordinalNumber(index + 1)} `}&nbsp;</h2>
            <h3>{player.name}</h3>
          </div>
          <div className="flex v-center nowrap">
            <h3>{player.candy}</h3>
            <img src="/src/assets/candy.png" alt="Candy" />
          </div>
        </div>
      )));
    });
  }, []);

  return (
    <main>
      <div className="coc-2020 flex column v-center">
        <div className="ranking-box header flex h-center">
          <h1>Contest of Candy 2020</h1>
        </div>
        {state}
      </div>
    </main>
  );
}

export function CoC2019() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("coc_2019").then((leaderboard) => {
      setState(leaderboard.map((player, index) => (
        <div key={index} className="ranking-box flex between v-center">
          <div className="flex v-center">
            <h2>&nbsp;{`${ordinalNumber(index + 1)} `}&nbsp;</h2>
            <h3>{player.name}</h3>
          </div>
          <div className="flex v-center nowrap">
            <h3>{player.score}</h3>
            <img src="/src/assets/candy.png" alt="Candy" />
          </div>
        </div>
      )));
    });
  }, []);

  return (
    <main>
      <div className="coc-2020 flex column v-center">
        <div className="ranking-box header flex h-center">
          <h1>Contest of Candy 2019</h1>
        </div>
        {state}
      </div>
    </main>
  );
}

async function getEventLeaderboard(event) {
  const response = await fetch(`/data/${event}.json`);
  const JSON = await response.json();
  return JSON;
}

function ordinalNumber(number_) {
  let index = number_ % 10,
    k = number_ % 100;
  if (index === 1 && k !== 11) {
    return `${number_}st`;
  }
  if (index === 2 && k !== 12) {
    return `${number_}nd`;
  }
  if (index === 3 && k !== 13) {
    return `${number_}rd`;
  }
  return `${number_}th`;
}