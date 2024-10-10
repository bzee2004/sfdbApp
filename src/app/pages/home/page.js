"use client";
import { useRaces } from "@/app/useRaces"
import { useEffect } from "react";
import RaceBox from "@/app/raceBox/raceBox"
import './home.css';
import '../../globals.css' 

export default function Home() {

  const { races, getRaces, subscribeToRaces } = useRaces();

    useEffect(() => {
        if (races[0].max < 1) {
            subscribeToRaces();
            getRaces();
        }
    }, [races])

    return ( 
        <>
        <h1 className='header'> NCIDBF Race History</h1>
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
    )
    
}