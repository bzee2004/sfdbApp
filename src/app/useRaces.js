import { supabase } from "./stores/supabase"
import { useState } from "react";

export const useRaces = () => {
    const [races, setRaces] = useState([]);

    const getRaces = async () => {
        const { data, error } = await supabase
        .from('racenames')
        .select('raceId, raceName')
        .order('raceId', { ascending: true })
        if (error) {console.error(error)}

        setRaces(data);
    }

    const subscribeToRaces = async () => {
        supabase
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
    }

    return {
        races,
        getRaces,
        subscribeToRaces
    }
}