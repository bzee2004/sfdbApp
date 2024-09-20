"use client";
// import Image from "next/image";
import './styles.modules.css';
import { useRaces } from './useRaces';
import { useEffect } from 'react';
import RaceBox from './raceBox/raceBox';

export default function Home() {

  const { races, getRaces, subscribeToRaces } = useRaces();
  
    useEffect(() => {
      subscribeToRaces();
      getRaces();
    }, []);

  return (
    <>
      <h1 className="header">Live Race Results</h1>
      <div className="race-display">
        {races.map((race, i) => {
            return (
                <RaceBox key={'race_' + i}
                  displayText={race.raceName}
                  raceId={race.raceId}
                />
            )
        })}
      </div>
    </>
  );
}