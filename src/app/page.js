"use client";
// import Image from "next/image";
import './styles.modules.css';
import { useRaces } from './useRaces';
import { useEffect, useState } from 'react';
import { useRaceData } from './pages/[raceId]/useRaceData';
import Table from './pages/[raceId]/table';
import { Truculenta } from 'next/font/google';

export default function Landing() {

  const { race, getCurrentRace, subscribeToRaces } = useRaces();
  const { heatList, setHeatList, getHeatList, subscribeToHeatList } = useRaceData();
  const [ prevHeatList, setPrevHeatList ] = useState([]);
  const { crewList, getAllCrews } = useRaceData();

  const [ selectCrew, setSelectCrew ] = useState('*');  
  const [ newCrew, setNewCrew ] = useState('');

  const filterCrew = (value) => setSelectCrew(value)

  const title = race[0].racename, raceId = race[0].max;
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    if (race[0].max < 1) {
      getCurrentRace();
      subscribeToRaces();
    }
  }, [race]);

  useEffect(() => {
    if (JSON.stringify(heatList) != JSON.stringify(prevHeatList) || heatList.length < 1) {
      getHeatList(raceId, selectCrew);
      setPrevHeatList(heatList)
      setIsLoading(false);
    }
  }, [heatList, race])

  useEffect(() => {
    if (selectCrew != '*' || newCrew == '*') {
      setHeatList([]);
      setNewCrew(selectCrew);
      setIsLoading(true);
    }
    else {setNewCrew(selectCrew);}
  }, [selectCrew, newCrew])

  useEffect(() => {
    if (crewList.length < 1) {
      getAllCrews(raceId);
    }
  }, [crewList])

  return (
    <>
      <h1 className="header">NCIDBF Race Results</h1>
          <div className='race-header'>
            <h1>{title}</h1>
            <label htmlFor='crews'>Filter by crew:</label>
            <select name='crews' id='crews' 
            onChange={({target}) => {target.value != 'choose_option' ? filterCrew(target.value) : filterCrew('*')}}
            >
            <option selected value="choose_option" id='default-option'>-- DEFAULT --</option>
              {
              crewList.map((crew, index) => {
                return (
                  <option key={'option_'+index} id={'option_'+index} value={crew}>
                    {crew}
                  </option>
                )
              })
              }
            </select>
          </div>
          <div className='heats'>
          { 
          // isLoading 
          // ? 
          // <div>Loading...</div> 
          // :
              heatList.map((i, index) => {
                  return (
                      <Table key={'heat_'+index} 
                      data={{heat: i.heat, race_type: i.race_type, crew: selectCrew}}
                      />
                  )
              })              
          }    
          </div>
    </>
  );
  }
