"use client";
// import Image from "next/image";
import './styles.modules.css';
import { useRaces } from './useRaces';
import { useEffect } from 'react';
import { useRaceData } from './pages/[raceId]/useRaceData';
import Table from './pages/[raceId]/table';

import { useNavigate } from 'react-router-dom';

let forceRedirect;

export default function Landing() {

  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (forceRedirect != true) {
  //     return navigate('./pages/[1]');
  //   }
  // })

  const { race, getCurrentRace, subscribeToRaces } = useRaces();
  const { heatList, getHeatList } = useRaceData();
  

  const raceId = race[0].max;
  const title = race[0].racename;

  useEffect(() => {
    subscribeToRaces();
    getCurrentRace();
  }, [race]);

  useEffect(() => {
    getHeatList(raceId);
  }, [heatList])

  return (
    <>
      <h1 className="header">NCIDBF Race Results</h1>
          <div className='race-header'>
              <h1>{title}</h1>
          </div>
          {
              heatList.map((heat, i) => {
                  return (
                      <Table heat={heat} key={'heat_'+i}/>
                  )
              })
          }    
    </>
  );
}