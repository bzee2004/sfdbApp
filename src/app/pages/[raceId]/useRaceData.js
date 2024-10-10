import { supabase } from "@/app/lib/stores/supabase";
import { useState } from "react";

export const useRaceData = () => {
    const [raceData, setRaceData] = useState([{heat: 'NA', crew: 'NA', lane: 'NA', time: 'NA', placement: 'NA', next_heat: 'NA', estimated_start_time: 'NA', race_type: 'NA', display: true}]);

    const getRaceData = async (heat, selectCrew, raceId) => {
        if (selectCrew == '*') {
            const { data, error } = await supabase
            .rpc('get_race_data_all_crews', {
                selectheat: heat,
                raceid: raceId
            })

            if (error) { console.error(error) }
            if (data) { setRaceData(data) }
        }
        else {
            const { data, error } = await supabase
            .rpc('get_race_data', {
                selectheat: heat,
                selectcrew: selectCrew,
                raceid: raceId
            })
            if (error) { console.error(error) }
            if (data) { setRaceData(data) }
        }
    }

    const subscribeToRaceData = async () => {
        const taskListener = supabase
        .channel('race_data_changes')
        .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'race_results',
        },
        (payload) => {
            setRaceData([...raceData, payload.new])
            console.log(payload);
            // raceData[payload['old']['id']] = payload['new']['raceName'];
        }
        ).subscribe();

        return () => {
            supabase.removeChannel(taskListener);
        }
    }



    const [heatList, setHeatList] = useState([{heat: 0, race_type: 'NA'}]);

    const getHeatList = async (raceid, crew) => {
        if (crew == '*') {
            const { data, error } = await supabase
            .rpc('list_heats', {
                raceid: raceid
            })
            if (data) { setHeatList(data) }
        }
        else {
            const { data, error } = await supabase
            .rpc('list_heats_select_crew', {
                raceid: raceid,
                selectcrew: crew
            })
            if (data) { setHeatList(data) }
            if (error) { console.log(error) }
        }
    }

    const subscribeToHeatList = async () => {
        const taskListener = supabase
        .channel('heat_list_changes')
        .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'race_results',
        },
        (payload) => {
            setHeatList([...heatList, payload.new])
            // console.log(payload);
        }
        ).subscribe();

        return () => {
            supabase.removeChannel(taskListener);
        }
    }

    const [ crewList, setCrewList ] = useState([]); 

    const getAllCrews = async (raceid) => {
        const {data, error} = await supabase
        .rpc('get_all_crews', {
            raceid: raceid
        })
        if (error) { console.log(error) }
        if (data) { setCrewList(data) }
    }

    return {
        raceData,
        setRaceData,
        getRaceData,
        heatList,
        setHeatList,
        getHeatList,
        crewList,
        getAllCrews,
        subscribeToRaceData,
        subscribeToHeatList
    }
}