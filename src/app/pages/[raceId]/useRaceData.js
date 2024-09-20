import { supabase } from "@/app/stores/supabase";
import { useState } from "react";

export const useRaceData = () => {
    const [raceData, setRaceData] = useState([{heat: 'NA', crew: 'NA', lane: 'NA', time: 'NA', placement: 'NA', next_heat: 'NA', estimated_start_time: 'NA'}]);

    const getRaceData = async (heat) => {
        const { data, error } = await supabase
        .from('race_results')
        .select('heat, crew, lane, time, placement, next_heat, estimated_start_time')
        .eq('heat', heat)
        .order('placement', { ascending: true });
        if (error) { console.error(error) }
        if (data) { setRaceData(data) }
    }

    const subscribeToRaceData = async () => {
        supabase
        .channel('race_data_changes')
        .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'racenames',
        },
        (payload) => {
            raceData[payload['old']['raceId']] = payload['new']['raceName'];
        }
        ).subscribe();
    }

    const [maxHeat, setMaxHeat] = useState([]);

    const getMaxHeat = async (raceid) => {
        const { data, error } = await supabase
        .rpc('list_heats', {
            raceid: raceid
        })
        if (data) { setMaxHeat(data) }
    }

    return {
        raceData,
        getRaceData,
        maxHeat,
        getMaxHeat,
        subscribeToRaceData
    }
}