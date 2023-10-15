/* コントリビューション週グラフ */

import style from "@/styles/page.module.css";
import { ContributeProps, DayContributions } from "@/types/contribute_type";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTootip,
  LinearScale,
  Title
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTootip,
);

const ContributeWeeklyGraph: React.FC<ContributeProps> = ({ contributeData }): React.ReactElement => {
  let weeklyData: Array<number> = [];             // 週毎データ
  let weeklyContLabels: Array<string | Array<string>> = [];  // 週ラベル
  let backgroundColors: Array<string> = [];       // 背景色リスト

  let prevYear: number = 0;
  for (let i = 0; i < contributeData["weeks"].length; i++) {
    const weekly = contributeData["weeks"][i];
    const weeklyDays = weekly["contributionDays"];

    let dayContributions: Array<DayContributions> = [];
    let weeklyContributions: number = 0;

    for (let j = 0; j < weeklyDays.length; j++) {
      const date: Date = new Date(weeklyDays[j]["date"]);
      dayContributions.push({
        "date": date,
        "contribute": weeklyDays[j]["contributionCount"]
      });

      weeklyContributions += dayContributions[j]["contribute"];
    }
    weeklyData.push(weeklyContributions);

    // 週ラベル作成
    const firstDay: Date = new Date(weeklyDays[0]["date"]);
    const firstDayYear: number = firstDay.getFullYear();
    const lastDay: Date = new Date(weeklyDays[weeklyDays.length - 1]["date"]);

    let weeklyContLabel: string | Array<string> = `${firstDay.getMonth() + 1}/${firstDay.getDate()}~${lastDay.getMonth() + 1}/${lastDay.getDate()}`;
    // idx=0か前年と異なる年であれば年を追加
    if (i === 0 || prevYear !== firstDayYear) weeklyContLabel = [String(firstDayYear), weeklyContLabel];
    weeklyContLabels.push(weeklyContLabel);

    // 背景色セット
    if (weeklyContributions >= 15) {
      backgroundColors.push("#39d353");
    } else if (weeklyContributions >= 10) {
      backgroundColors.push("#26a641");
    } else if (weeklyContributions >= 5) {
      backgroundColors.push("#006d32");
    } else {
      backgroundColors.push("#0e4429");
    }

    prevYear = lastDay.getFullYear();
  }

  // グラフ設定
  let dataMax: number = Math.max(...weeklyData);
  let remainder: number = dataMax % 5;
  if (remainder !== 0) dataMax += remainder;

  const Scale = {
    y: {
      min: 0,
      max: dataMax,
      ticks: {
        color: "rgb(209, 205, 199)",
        stepSize: 5,
      },
      grid: {
        color: "rgb(209, 205, 199)",
      },
    },
    x: {
      ticks: {
        color: "rgb(209, 205, 199)",
      },
      grid: {
        color: "rgb(89, 85, 79)",
      }
    },
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        color: "rgb(209, 205, 199)",
        text: "GitHub Contributions",
      },
    },
    scales: Scale,
  };
  const graphData = {
    labels: weeklyContLabels,
    datasets: [
      {
        label: "Contributions",
        data: weeklyData,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <>
      <div className={style.githubContributeWeekly}>
        <Bar options={options} data={graphData} style={{ height: "300px", width: "100%" }} />
      </div>
    </>
  );
};
export default ContributeWeeklyGraph;