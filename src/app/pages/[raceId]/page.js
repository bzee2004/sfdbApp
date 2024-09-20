'use client';
import { useEffect } from 'react';
import { useRaceData } from './useRaceData';
import Table from './table';

export default function Race({ params }) {
    const title = (params.raceId).slice(0, params.raceId.indexOf('-')).replaceAll('%20', ' ');
    const raceId = (params.raceId).slice(params.raceId.indexOf('-')+1);

    const {maxHeat, getMaxHeat} = useRaceData();
    
    useEffect(() => {
        getMaxHeat(raceId);
    }, [])

        return (
            <>
                <h1>{title}</h1>
                <a href="/">Home</a>
                {
                    maxHeat.map((heat, i) => {
                        return (
                            <Table heat={heat} key={i}/>
                        )
                    })
                }
            </>
        )
     
        


    // return (
    //     <>
    //         <h1>{title}</h1>
    //         <a href="/">Home</a>
    //         {
    //             raceData.map((raceInstance, i) => {
    //                 return (
    //                     <Table 
    //                     key={'key '+i}
    //                     heat={raceInstance.heat}
    //                     crew={raceInstance.crew}
    //                     lane={raceInstance.lane}
    //                     time={raceInstance.time}
    //                     next_heat={raceInstance.next_heat}
    //                     estimated_start_time={raceInstance.estimated_start_time}
    //                     />
    //                 )
    //             })
    //         }
    //     </>
    // )
}