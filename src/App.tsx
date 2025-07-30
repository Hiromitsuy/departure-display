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

  const [currentTime, setCurrentTime] = React.useState(new Date());
  const moveMinutes = React.useRef(0);

  React.useEffect(() => {
    const handleKeyDownEvent = (ev: KeyboardEvent) => {
      console.log("Keydown,", ev.code, moveMinutes);
      switch(ev.code) {
        case 'ArrowLeft':
          moveMinutes.current = moveMinutes.current - 1;
          break;
        case 'ArrowRight':
          moveMinutes.current = moveMinutes.current + 1;
          break;
      }
    };
    addEventListener('keydown', handleKeyDownEvent);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date((new Date).getTime() + moveMinutes.current * 60 * 1000);
      setCurrentTime(current);
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
        currentTime={currentTime}
        setStaion={setStation}
        setCurrentTime={setCurrentTime}
      />
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
              currentTime={currentTime}
              isTerminalStation={line.directions.length < 2}
            />
          </div>
        )
      }
      <div id='footer'>
        <p>表示されている時刻情報はサンプルです。</p>
      </div>
    </>
  )
}

export default App
