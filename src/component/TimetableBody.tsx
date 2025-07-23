
interface Timetable {
  type: string,
  departureTime: string,
  destination: string,
}

export default function TimetableBody() {
  const sampleObject: Array<Timetable> = [
    {
      type: "普通",
      departureTime: "13:40",
      destination: "大垣",
    },
    {
      type: "特別快速",
      departureTime: "13:46",
      destination: "岐阜",
    }
  ];

  return (<div id="timetable-body">
    {sampleObject.map((train, index) => 
      <div key={index} className="timetable-item">
        <div className="type">{train.type}</div>
        <div className="time">{train.departureTime}</div>
        <div className="destination">{train.destination}</div>
      </div>
    )}
  </div>);
}