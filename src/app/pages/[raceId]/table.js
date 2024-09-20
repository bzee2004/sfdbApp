import { useEffect } from "react"
import { useRaceData } from './useRaceData';
import Row from './row';
import './styles.modules.css';

export default function Table(props) {
    const {raceData, getRaceData, subscribeToRaceData} = useRaceData();

    useEffect(() => {
        subscribeToRaceData();
        getRaceData(props.heat);
    }, [])

    return (
        <>
        <h1 className="heat-num">Heat {raceData[0].heat}</h1>
        <table>
            <thead>
                <tr>
                    <td>Crew</td>
                    <td>Lane</td>
                    <td>Time</td>
                    <td>Placement</td>
                    <td>Next Heat</td>
                    <td>Estimated Start Time</td>
                </tr>
            </thead>
            <tbody>
                {
                    raceData.map((data, i) => {
                        return (
                            <Row key={i}
                            crew={data.crew}
                            lane={data.lane}
                            time={data.time} 
                            placement={data.placement}
                            next_heat={data.next_heat}
                            estimated_start_time={data.estimated_start_time}
                            />
                        )
                        
                    })
                }
            </tbody>
        </table>
        </> 
    )
}
