import type { Line } from "../model/timetableModel";
import "../stylesheets/Timetable.css";
import TimetableBody from "./TimetableBody";

interface TimetableProps {
  line: Line,
  currentHour: number,
}

export default function TimetableView(props: TimetableProps) {
  props.line.directions.map((direction) => {
    return direction.tables.filter((timeItem) => 
      timeItem.departureTime > (props.currentHour + ":00")
    );
  });

  return (<div id="timetable">
    { 
      props.line.directions.map((direction, idx) => (
        <div className="timetable-direction" key={idx}>
          <div className="timetable-header">
            <div className="line-name">{props.line.lineName}</div>
            <div className="line-color" style={{backgroundColor: props.line.lineColor ? props.line.lineColor : props.line.corporateColor}}></div>
            <div className="distination">{direction.directionTitle}</div>
          </div>
          <div className="timetable-body">
            <TimetableBody 
              timetableItems={direction.tables} />
          </div>
        </div>))
    }
  </div>);
}

