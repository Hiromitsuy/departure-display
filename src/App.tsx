import React from 'react';
import Infomation from './component/Info'
import TimetableBody from './component/TimetableBody'
import TimetableHeader from './component/TimetableHeader'
import './stylesheets/App.css'

function App() {
  const [station, setStation] = React.useState("新宿");
  const [line, setLine] = React.useState("山手線");

  const [curretTime, setCurrentTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => { clearInterval(timer); };
  }, []);



  return (
    <>
      <Infomation station={station} currentTime={curretTime} />
      <div className='timetable'>
        <TimetableHeader />
        <TimetableBody />
      </div>
      <div className='timetable'>
        <TimetableHeader />
        <TimetableBody />
      </div>
    </>
  )
}

export default App
