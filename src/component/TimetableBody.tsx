import type { Timetable } from "../model/timetableModel";
import { sliceByN } from "../tools/sliceN";

interface TimetableHourBodyProps {
  timetableItems: Array<Timetable>
}

export default function TimetableBody(props: TimetableHourBodyProps) {
  const groupedByHour: Map<string, Array<Array<Timetable>>> = new Map();

  [...new Set(props.timetableItems.map((item) => item.departureTime.slice(0,2)))].forEach((hour) => {
    groupedByHour.set(hour, sliceByN(props.timetableItems.filter((item) => item.departureTime.slice(0, 2) === hour), 7))
  });

  return (<table className="timetable-body">
    <tbody>
      {
        Array.from(groupedByHour.entries()).map(([hour, timesRow]) => 
          timesRow.map((times, i) => 
          <tr key={i}>
            { i === 0 ? <th rowSpan={ timesRow.length } >{hour}</th> : <></>}
            {times.map((it, i) => <td key={i} style={{color: it.typeColor ? "white" : it.typeColor}}>{it.departureTime.slice(3)}</td>)}
          </tr>)
        )
      }
    </tbody>
  </table>);
}