import { supabase } from "./lib/stores/supabase"
import { useState } from "react";

export const useRaces = () => {
    const [race, setRace] = useState([{'max': -1, 'racename': 'N/A'}]);
    const [races, setRaces] = useState([{'max': -1, 'racename': 'N/A'}]);

    const getRaces = async () => {
        const { data, error } = await supabase
        .from('racenames')
        .select('raceId, raceName')
        .order('raceId', { ascending: true })
        if (error) {console.error(error)}

        setRaces(data);
    }

    const getCurrentRace = async () => {
        const { data, error } = await supabase
        .rpc('get_current_race')
        if (error) {console.error(error)}

        setRace(data);
    }

    const subscribeToRaces = async () => {
        const taskListener = supabase
        .channel('table_db_changes')
        .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'racenames',
        },
        (payload) => {
            races[payload['old']['raceId']] = payload['new']['raceName'];
        }
        ).subscribe();

        return taskListener.unsubscribe();
    }

    return {
        race,
        races,
        getRaces,
        getCurrentRace,
        subscribeToRaces
    }
}