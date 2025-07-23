import "../stylesheets/Timetable.css";

export default function TimetableHeader() {
  return (<div id="timetable-header">
    <div id="line-name">
      <p>東海道本線</p>
    </div>
    <div id="line-color"></div>
    <div id="line-direction">
      <p>下り 岐阜・一宮方面</p>
    </div>
  </div>)
}