import React from "react";
import "../stylesheets/App.css";
import formatTime from "../tools/formatTime";
import type { TimetableStation } from "../model/timetableModel";

export interface InfomationProps {
  station: string;
  setStaion: (newSta: TimetableStation) => void,
  currentTime: Date;
}

export default function Infomation(props: InfomationProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const clickStation = () => {
    inputRef.current?.click();
  }

  const fileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) {
      alert("ファイルが指定されていません。");
      return;
    };

    // 先頭のファイルを取得
    const file = files[0];

    const reader = new  FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result);

      if (typeof reader.result !== "string") {
        alert("ファイルの内容が正しくありません");
        return;
      }
      
      try {
        const jsonObj: TimetableStation = JSON.parse(reader.result);
        props.setStaion(jsonObj);
      } catch (e) {
        alert("ファイルの内容が正しくありません。");
        console.log(e);
      }
    });
    reader.readAsText(file, 'UTF-8');
  }

  return (<div id="simulator-info">
    <div id="station-info" onClick={clickStation}>
      <p>{props.station}</p>
      <input 
        hidden 
        ref={inputRef} 
        type="file"
        onChange={fileOnChange}
        accept=".json" />
    </div>
    <div id="current-time">
      <span id="time-label">現在時刻 </span>
      <span id="time">{formatTime(props.currentTime)}</span>
    </div>
  </div>);
}
