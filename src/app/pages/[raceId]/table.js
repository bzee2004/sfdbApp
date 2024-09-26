import { useEffect } from "react"
import { useRaceData } from './useRaceData';
import './race_instance.css';

export default function Table(props) {
    const {raceData, getRaceData, subscribeToRaceData} = useRaceData();

    useEffect(() => {
        subscribeToRaceData();
        getRaceData(props.heat);
    }, [raceData])

    return (
        <>
        <h1 className="heat-title"><b>Heat {raceData[0].heat}: {raceData[0].race_type}</b></h1>
        <table>
            <thead>
                <tr>
                    <td className='crew-title'>Crew</td>
                    <td className='lane-title'>Lane</td>
                    <td className='time-title'>Time</td>
                    <td className='placement-title'>Placement</td>
                    <td className='next-heat-title'>Next Heat</td>
                    <td className='est-start-title'>Est. Start Time</td>
                </tr>
            </thead>
            <tbody>
                {
                    raceData.map((data, i) => {
                        if (data.display != true) {return}
                        return (
                            <tr key={'row_'+i}>
                                <td><b>{data.crew}</b></td>
                                <td>{data.lane}</td>
                                <td>{data.time}</td>
                                <td>{data.placement}</td>
                                <td>{data.next_heat}</td>
                                <td>{data.estimated_start_time}</td>
                            </tr>
                        )  
                    })
                }
            </tbody>
        </table>
        </> 
    )
}
