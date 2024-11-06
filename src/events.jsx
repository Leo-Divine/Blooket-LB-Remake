import { useState, useEffect } from 'react';
import './events.css';

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

