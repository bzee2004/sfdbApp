'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/app/lib/stores/supabase';

export default function RaceData({data}) {
    const [raceData, setRaceData] = useState([{heat: 'NA', crew: 'NA', lane: 'NA', time: 'NA', placement: 'NA', next_heat: 'NA', estimated_start_time: 'NA', race_type: 'NA', display: true}]);

    const getRaceData = useCallback(async (heat, selectCrew) => {
        if (selectCrew == '*') {
            const { data, error } = await supabase
            .from('race_results')
            .select('heat, crew, lane, time, placement, next_heat, race_type, display')
            .eq('heat', heat)
            .order('placement', { ascending: true });

            if (error) { console.error(error) }
            if (data) { setRaceData(data) }
        }
        else {
            const { data, error } = await supabase
            .rpc('get_race_data', {
                selectheat: heat,
                selectcrew: selectCrew
            })
            if (error) { console.error(error) }
            if (data) { setRaceData(data) }
        }
    }, [data])

    useEffect(() => {
        getRaceData(data.heat, data.crew);
    }, [getRaceData])
    
    return <div>{JSON.stringify(raceData)}</div>
}