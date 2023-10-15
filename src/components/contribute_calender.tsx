/* コントリビューションカレンダー */

import { OverlayTrigger, Tooltip} from "react-bootstrap";
import style from "@/styles/contribute_calender.module.css";
import { ContributeProps, DayContributions, MonthsLabel } from "@/types/contribute_graph";

const ContributeCalendar: React.FC<ContributeProps> = ({contributeData}): React.ReactElement => {
  const daysList: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsList: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let dayData: Array<Array<DayContributions>> = [];  // 日毎データ
  let monthsLabels: Array<MonthsLabel> = [];       // 月ラベル
  for (let i = 0; i < contributeData["weeks"].length; i++)
  {
    const weekly = contributeData["weeks"][i];
    const weeklyDays = weekly["contributionDays"];

    let dayContributions: Array<DayContributions> = [];
    for (let j = 0; j < weeklyDays.length; j++)
    {
      const date: Date = new Date(weeklyDays[j]["date"]);
      dayContributions.push({
        "date": date,
        "contribute": weeklyDays[j]["contributionCount"]
      });
    }
    dayData.push(dayContributions);
  }

  // 月ラベル作成
  let firstDayMonth: number = dayData[0][0]["date"].getMonth();
  let monthsLabelColSpan: number = 0;
  for (let i = 0; i < dayData.length; i++) {
    let dayMonth: number = dayData[i][0]["date"].getMonth();
    if (firstDayMonth !== dayMonth)
    {
      monthsLabels.push({
        "month": monthsList[firstDayMonth],
        "colSpan": Math.ceil(monthsLabelColSpan / 7)
      });

      firstDayMonth = dayMonth;
      monthsLabelColSpan = 0;
    }
    
    for (let j = 0; j < dayData[i].length; j++) {
      if (firstDayMonth === dayData[i][j]["date"].getMonth()) monthsLabelColSpan += 1;
    }
  }
  monthsLabels.push({
    "month": monthsList[firstDayMonth],
    "colSpan": Math.ceil(monthsLabelColSpan / 7)
  });

  // 行・列の入れ替え
  dayData = dayData[0].map((_, index: number) => dayData.map(row => row[index]));

  return (
    <>
      <div style={{maxWidth: "100%", overflowY: "hidden", overflowX: "auto"}}>
        <p style={{margin: 0}}>{contributeData["totalContributions"]} contributions in the last year</p>
        <table className={style.ContributionCalendar_grid} style={{textAlign: "center"}}>
          <thead>
            <tr style={{height: 15}}>
              <td style={{width: 29}} />
              {monthsLabels.map((monthsLabel: MonthsLabel, idx: number) => (
                <td key={idx} className={style.ContributionCalendar_label} colSpan={monthsLabel["colSpan"]}>
                  <span style={{position: "absolute", top: 0}}>{monthsLabel["month"]}</span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {dayData.map((daysData: Array<DayContributions>, idx: number) => (
              <tr key={idx} style={{height: 11}}>
                <td className={style.ContributionCalendar_label} style={{position: "relative"}}>
                  <span style={{clipPath: "None", position: "absolute", bottom: -4}}>
                    {daysList[idx]}
                  </span>
                </td>
                {daysData.map((dayData: DayContributions, index: number) => (
                  dayData && 
                  <OverlayTrigger key={index} placement="top" overlay={<Tooltip>{dayData["contribute"]} contributions <br /> on {`${daysList[dayData["date"].getDay()]}, ${monthsList[dayData["date"].getMonth()]} ${dayData["date"].getDate()}, ${dayData["date"].getFullYear()}`}</Tooltip>}>
                    <td className={style.ContributionCalendar_day} data-level={dayData["contribute"] && Math.floor(dayData["contribute"] / 3) + 1} />
                  </OverlayTrigger>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ContributeCalendar;