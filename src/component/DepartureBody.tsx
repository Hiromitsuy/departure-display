import formatTime from "../tools/formatTime";
import type { Timetable } from "../model/timetableModel";
import "../stylesheets/DepartureSign.css";


interface TimetableBodyProps {
  tables: Array<Timetable>,
  currentTime: Date,
  isTerminalStation: Boolean,
}

export default function DepartureBody(props: TimetableBodyProps) {

  return (<div id="departure-body">
    {props.tables
      .filter((t)=> formatTime(props.currentTime) <= t.departureTime)
      .slice(0, props.isTerminalStation ? 5 : 2)
      .map((train, idx) => 
      <div key={idx} 
        className={ "departure-item " + 
          ((formatTime(props.currentTime) === train.departureTime && props.currentTime.getSeconds() > 30) ? "blinking" : "") 
        }
      >
        <div className={"type " + (train.type.length > 4 ? "multiline" : "")} 
          style={{
            backgroundColor: train.typeColor || "inherit",
            color: train.fontColor || "inherit",
            outline: train.typeOutlineColor ? `solid 4px ${train.typeOutlineColor}` : "0px", 
          }}>
            {train.type}
        </div>
        <div className="time">{train.departureTime}</div>
        <div className="destination">{train.destination}</div>
      </div>
    )}
  </div>);
}