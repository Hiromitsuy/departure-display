// main.js
import axios from "axios";
import { load } from "cheerio";
import postcss from 'postcss';
import * as fs from 'fs' // 読み込む
import { Directions, Line, Timetable, TimetableStation } from "./timetableModel";

const CSS_URL = "https://ekitan.com/timetable/pc/css/train/train.css";
const HTML_URL = [
  "https://ekitan.com/timetable/railway/line-station/131-2/d1",
  "https://ekitan.com/timetable/railway/line-station/131-2/d2",
]

const LINE_COLOR = "#E31F26"
const LINE_NAME = "埼京線"
const CORP_COLOR = "#008803"

export default async function main() {
  try {
    const cssData = await axios.get(CSS_URL).then(res => res.data);
    const ast = postcss.parse(cssData);
    // ast.walkRules(/.t102 .means-text/, rule => {
    //   console.log(rule.selector);
    //   rule.walkDecls('color', decl => {
    //     console.log(decl.value);
    //   })
    // });

    let stationName = "";
    const directions: Array<Directions> = [];

    for (const url of HTML_URL) {

      // 指定されたURLからデータを取得
      const response = await axios.get(url);
      // 取得したHTMLデータをパース
      const $ = load(response.data);

      const tableTr = $("div.tab-content-inner.active table.search-result-data.ek-search-result tbody tr");
      // console.log("a", tableTr.length);
      // const b = $(tableTr[1]).find("td");
      // console.log("b", b.length);
      // const c = $(b[1]).find("ul li");
      // console.log("c", c.length);
      // const d = $(c[0]).find("a span").eq(1).text();
      // console.log("d", d);

      stationName = $("div.station-name a").eq(0).text();
      console.log(stationName);

      const directionName = $("li.ek-direction_tab.active a").eq(0).text();
      console.log(directionName);

      const table: Array<Timetable> = tableTr.map((idx: number, elem: any) => {
        if (idx === 0) return;

        const td = $(elem).find("td");
        const hour = td.eq(0).text();

        const timetables: Array<Timetable> = td.eq(1).find("ul li").map((i: number, elem: any) => {
          const minute = $(elem).find("a span").eq(1).text();

          const styleClassRegExp = new RegExp(`${$(elem).attr('data-kind_palette')} .means-text`);
          let textColor = "";
          ast.walkRules(styleClassRegExp, rule => {
            rule.walkDecls('color', decl => {
              textColor = decl.value;
            })
          });

          const distString = $(elem).attr('data-dest').trim() ? $(elem).attr('data-dest') : directionName;

          const obj: Timetable = {
            type: $(elem).attr('data-tr-type'),
            departureTime: `${hour}:${minute}`,
            destination: distString,
            typeColor: textColor,
          };

          return obj;
        }).get();

        return timetables;
      }).get();
      
      const direction: Directions = {
        directionTitle: directionName,
        tables: table,
      }
      directions.push(direction);


    }

    const lineData: Line = 
      {
        lineName: LINE_NAME,
        lineColor: LINE_COLOR,
        corporateColor: CORP_COLOR,
        directions: directions,
      }

    const retData: TimetableStation = {
      station: stationName,
      lines: [lineData],
    }
    
    fs.writeFileSync('export.json', JSON.stringify(retData));
    
  } catch (err) {
    console.error("Error in main:", err);
  }
}