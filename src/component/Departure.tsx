import type { Line } from "../model/timetableModel";
import DepartureBody from "./DepartureBody";
import DepartureHeader from "./DepartureHeader";

interface DepartureProps {
  line: Line,
  currentTime: Date,
}

export default function Departure(props: DepartureProps) {

  return (<div >
      {
        props.line.directions.map((lineObj, idx) => 
          <div className='departure-sign' key={idx}>
            <DepartureHeader 
              lineName={props.line.lineName}
              lineColor={props.line.lineColor}
              corporateColor={props.line.corporateColor}
              directionTitle={lineObj.directionTitle}
            />
            <DepartureBody
              tables={lineObj.tables}
              currentTime={props.currentTime}
              isTerminalStation={props.line.directions.length < 2}
            />
          </div>
        )
      }
  </div>)
}