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
            <h2>{`${i + 1}th Place`}</h2>
            <h3>{data.name}</h3>
            <h4>Stickers: 108</h4>
            <h6>{`Dec ${time_string.getDate()}th 2023, ${time_string.toTimeString().substring(0, 8)}`}</h6>
          </div>
        );
      }

      //Put the rankingElements into pairs
      const elements = [];
      for(let i = 0; i < leaderboard.length; i += 2) {
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
/*<div className="flex h-center">
            <div className="ranking-box text-center">
              <h2>1st Place</h2>
              <h3>X0T1C5</h3>
              <h3>Stickers: 108</h3>
              <h6>Dec 8th 2023, 21:20:09 EST</h6>
            </div>
            <div className="ranking-box text-center"></div>
          </div>
          <div className="flex h-center">
            <div className="ranking-box text-center"></div>
            <div className="ranking-box text-center"></div>
          </div>
          */

async function getEventLeaderboard(event) {
  const response = await fetch(`/data/${event}.json`);
  const JSON = await response.json();
  return JSON;
}