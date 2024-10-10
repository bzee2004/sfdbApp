import { useEffect, useState, useRef } from "react"
import { useRaceData } from './useRaceData';
import { supabase } from "@/app/lib/stores/supabase";
import './race_instance.css';

export default function Table({data}) {
    const {raceData, setRaceData, getRaceData, subscribeToRaceData} = useRaceData();

    useEffect(() => {
        getRaceData(data.heat, data.crew, data.race_id)
    }, [data.heat])

    useEffect(() => {
        setRaceData(raceData);
    }, [raceData, data])

    // useEffect(() => {
    //     subscribeToRaceData();
    // }, [supabase, data])
    
    return (
        <>
        <h1 className="heat-title"><b>Heat {data.heat}: {data.race_type}</b></h1>
        <table>
            <thead>
                <tr>
                    <td className='crew-title'>Crew</td>
                    <td className='lane-title'>Lane</td>
                    <td className='time-title'>Time</td>
                    <td className='placement-title'>Placement</td>
                    <td className='next-heat-title'>Next Heat</td>
                    {/* <td className='est-start-title'>Est. Start Time</td> */}
                </tr>
            </thead>
            <tbody>
                {
                    raceData.map((data, index) => {
                        if (data.display != false) {
                            return (
                                <tr key={'row_'+index}>
                                    <td><b>{data.crew}</b></td>
                                    <td>{data.lane}</td>
                                    <td>{data.time}</td>
                                    <td>{data.placement}</td>
                                    <td>{data.next_heat}</td>
                                    {/* <td>{data.estimated_start_time}</td> */}
                                </tr>
                            )  
                        }
                    })
                }
            </tbody>
        </table>
        </> 
    )
}

