import formatTime from "../tools/formatTime";
import type { Timetable } from "../model/timetableModel";

interface TimetableBodyProps {
  tables: Array<Timetable>,
  currentTime: Date,
}

export default function TimetableBody(props: TimetableBodyProps) {

  return (<div id="timetable-body">
    {props.tables
      .filter((t)=> formatTime(props.currentTime) <= t.departureTime)
      .slice(0, 2)
      .map((train, idx) => 
      <div key={idx} className="timetable-item">
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