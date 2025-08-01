import "../stylesheets/DepartureSign.css";

export interface HeaderProps {
  lineName: string,
  lineColor?: string,
  corporateColor: string,
  directionTitle: string,
}

export default function DepartureHeader(props: HeaderProps) {
  return (<div id="departure-header">
    <div id="line-name" className={props.lineName.includes('\n') ? "multiline" : ""}>
      <p>{props.lineName}</p>
    </div>
    <div id="line-color" style={{backgroundColor: props.lineColor || props.corporateColor}}></div>
    <div id="line-direction">
      <p>{props.directionTitle}</p>
    </div>
  </div>);
}