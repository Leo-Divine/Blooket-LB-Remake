import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Events.css';

export function CoC2023() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getEventLeaderboard("coc_2023").then((leaderboard) => {
      //Get an array of all ranking-box elements
      const rankingElements = [];
      for (let i = 0; i < leaderboard.length; i++) {
        const data = leaderboard[i];
        const time_string = new Date(Date.parse(data.time));
        rankingElements.push(
          <div key={i} className="ranking-box text-center">
            <h2>{`${ordinalNumber(i + 1)} Place`}</h2>
            <h3>{data.name}</h3>
            <h4>Stickers: 108</h4>
            <h6>{`Dec ${time_string.getDate()}th 2023, ${time_string.toTimeString().substring(0, 8)}`}</h6>
          </div>
        );
      }

      //Put the rankingElements into pairs
      const elements = [];
      for (let i = 0; i < leaderboard.length; i += 2) {
        elements.push(
          <div key={i} className="flex h-center">
            {rankingElements[i]}
            {rankingElements[i + 1]}
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
      for (let i = 0; i < leaderboard.length; i++) {
        const data = leaderboard[i];
        elements.push(
          <div key={i} className="ranking-box flex between">
            <h3>{`${ordinalNumber(i + 1)}. ${data.name}`}</h3>
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
      for (let i = 0; i < leaderboard.length; i++) {
        const data = leaderboard[i];
        let img_source;
        if(data.flag == "cor") {
          img_source = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_of_Corsica.svg/1200px-Flag_of_Corsica.svg.png";
        } else {
          img_source = `https://flagicons.lipis.dev/flags/4x3/${data.flag}.svg`;
        }
        elements.push(
          <div key={i} className="ranking-box flex">
            <img src={img_source} alt="Flag" />
            <div>
              <h3>{data.name}</h3>
              <h4>{`${data.score.toLocaleString()}🏆`}</h4>
              <h4>{ordinalNumber(i + 1)}</h4>
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

function ordinalNumber(num) {
  let j = num % 10,
    k = num % 100;
  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
}

