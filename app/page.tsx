"use client";

import ContributeCalendar from "@/components/contribute_calender";
import ContributeWeeklyGraph from "@/components/contribute_weekly_graph";
import { useEffect, useState } from "react";

import styles from "@/styles/page.module.css";

const handleGetContributions = async () => {
  const response = await fetch("/api", { cache: "no-store" });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

const Home = () => {
  const [contributeData, setContributeData] = useState<any>(null);
  const [contributeLoading, setContributeLoading] = useState<boolean>(true);

  useEffect(() => {
    const res = handleGetContributions();
    res.then((r) => {
      setContributeData(r["data"]["user"]["contributionsCollection"]["contributionCalendar"]);
      setContributeLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className={styles.main}>
      <h1>Contribute Calender and Weekly-Graph Widget Sample</h1>

      <div className={styles.githubContribution} id="github_contributors">
        {contributeLoading && <span>Loading...</span>}
        {contributeData &&
          <div className={styles.widgetDiv}>
            <ContributeCalendar contributeData={contributeData} />
          </div>
        }
        {contributeData &&
          <div className={styles.widgetDiv}>
            <ContributeWeeklyGraph contributeData={contributeData} />
          </div>
        }
      </div>

      <div style={{ textAlign: "center" }}>
        <p>GitHub repo: <a href="https://github.com/himazin331/contribute_graph_widget" target="_blank" rel="noopener noreferrer">https://github.com/himazin331/contribute_graph_widget</a></p>
        <p>by <a href="https://github.com/himazin331" target="_blank" rel="noopener noreferrer">himazin331</a></p>
      </div>
    </div>
  );
};
export default Home;