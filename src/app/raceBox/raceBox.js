import React from 'react';
import './racebox.css';

export default function RaceBox(props) {
    return (
        <a 
        href={'../../pages/'+props.displayText+'-'+props.raceId} 
        className='race-box'>
            <h1>{props.displayText}</h1>
        </a>
    )
}