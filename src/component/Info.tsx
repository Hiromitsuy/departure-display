import React from "react";
import "../stylesheets/App.css";

export interface InfomationProps {
  station: string;
  currentTime: Date;
}
export default function Infomation(props: InfomationProps) {
  return (<div id="footer-info">
    <div id="display-info"><p>{props.station}</p></div>
    <div id="current-time">現在時刻 {formatTime(props.currentTime)}</div>
  </div>);
}

function formatTime(datetime: Date) {
  const hour = ("00" + datetime.getHours()).slice(-2);
  const minute = ("00" + datetime.getMinutes()).slice(-2);

  return `${hour}:${minute}`;
}