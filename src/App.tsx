import React from 'react';
import Infomation from './component/Info'
import TimetableBody from './component/TimetableBody'
import TimetableHeader from './component/TimetableHeader'
import './stylesheets/App.css'
import { sampleData, type Line, type TimetableStation } from './component/TimetableModel';


function App() {
  const [station, setStation] = React.useState<TimetableStation>(sampleData[0]);
  const [line, setLine] = React.useState<Line>(sampleData[0].lines[0]);

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
      <Infomation station={station.station} currentTime={curretTime} />
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
