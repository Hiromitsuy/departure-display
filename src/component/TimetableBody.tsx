import type { Timetable } from "./TimetableModel";

interface TimetableBodyProps {
  tables: Array<Timetable>,
  currentTime: Date,
}

export default function TimetableBody(props: TimetableBodyProps) {

  return (<div id="timetable-body">
    {props.tables.map((train, idx) => 
      <div key={idx} className="timetable-item">
        <div className="type" 
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