'use client';
import { useEffect, useState } from 'react';
import { useRaceData } from './useRaceData';
import Table from './table';

export default function Race({ params }) {

    const title = (params.raceId).slice(0, params.raceId.indexOf('-')).replaceAll('%20', ' ');
    const raceId = (params.raceId).slice(params.raceId.indexOf('-')+1);

    const {heatList, getHeatList} = useRaceData();
    const [ selectCrew, setSelectCrew ] = useState('*');

    useEffect(() => {
        getHeatList(raceId, selectCrew);
    }, [])
        return (
            <>
                <div className='race-header'>
                    <h1>{title}</h1>
                </div>
                {
                    heatList.map((i, index) => {
                        return (
                            <Table key={'heat_'+index} 
                            data={{heat: i.heat, race_type: i.race_type, race_id: raceId, crew: selectCrew, past_race: true}}
                            /> 
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