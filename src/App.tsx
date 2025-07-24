import React from 'react';
import Infomation from './component/Info'
import TimetableBody from './component/TimetableBody'
import TimetableHeader from './component/TimetableHeader'
import './stylesheets/App.css'
import { sampleData, type Line, type TimetableStation } from './model/timetableModel';
import InitData from './public/sampleShinjuku.json';

function App() {
  const [station, setStation] = React.useState<TimetableStation>(InitData);
  const [line, setLine] = React.useState<Line>(sampleData.lines[0]);

  const [curretTime, setCurrentTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => { clearInterval(timer); };
  }, []);

  React.useEffect(() => {
    setLine(station.lines[0]);
  }, [station]);

  return (
    <>
      <Infomation 
        station={station.station}
        currentTime={curretTime}
        setStaion={setStation} />
      {
        line.directions.map((lineObj, idx) => 
          <div className='timetable' key={idx}>
            <TimetableHeader 
              lineName={line.lineName}
              lineColor={line.lineColor}
              corporateColor={line.corporateColor}
              directionTitle={lineObj.directionTitle}
            />
            <TimetableBody
              tables={lineObj.tables}
              currentTime={curretTime}
            />
          </div>
        )
      }
    </>
  )
}

export default App
