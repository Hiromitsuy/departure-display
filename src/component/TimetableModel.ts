

export interface TimetableStation {
  station: string,
  lines: Array<Line>,
}

export interface Line {
  lineName: string,
  lineColor?: string,
  corporateColor: string,
  directions: Array<Directions>,
}

export interface Directions {
  directionTitle: string,
  tables: Array<Timetable>,
}

export interface Timetable {
  type: string,
  typeColor?: string,
  typeOutlineColor?: string,
  fontColor?: string,
  departureTime: string,
  destination: string,
}


export const sampleData: Array<TimetableStation> = [{
  station: "新宿",
  lines: [
    {
      lineName: "山手線",
      lineColor: "#80C342",
      corporateColor: "008803", 
      directions: [
        {
          directionTitle: "上野・池袋方面 （外回り）",
          tables: [
            {
              type: "各駅停車",
              departureTime: "13:40",
              destination: "上野・池袋 方面",
            },
            {
              type: "各駅停車",
              typeColor: "#2387c2",
              departureTime: "13:46",
              destination: "上野・池袋 方面",
            },
          ]
        },
        {
          directionTitle: "品川・渋谷方面 （内回り）",
          tables: [
            {
              type: "各駅停車",
              departureTime: "13:43",
              destination: "品川・渋谷方面",
            },
            {
              type: "各駅停車",
              departureTime: "13:49",
              typeOutlineColor: "orange",
              fontColor: "orange",
              destination: "品川・渋谷方面",
            },
          ]
        },
      ],
    }
  ]
}];