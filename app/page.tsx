"use client";

import { FC, useEffect, useState, SyntheticEvent, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ContributeCalendar from "@/components/contribute_calender";
import ContributeWeeklyGraph from "@/components/contribute_weekly_graph";
import styles from "@/styles/page.module.css";

type Props = {
  contributeData: any;
};

const fetchGetContributions = async (userId: string) => {
  const response = await fetch("/api", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({"userId": userId}), 
                                cache: "no-store" });
  const responseData = await response.json();
  return responseData;
};

const WidgetArea: FC<Props> = ({ contributeData }) => {
  return (
    <>
      <div className={styles.widgetDiv}>
        <ContributeCalendar contributeData={contributeData} />
      </div>
      <div className={styles.widgetDiv}>
        <ContributeWeeklyGraph contributeData={contributeData} />
      </div>
    </>
  )
};

const Home: FC = () => {
  const searchParams = useSearchParams();
  const [contributeLoading, setContributeLoading] = useState<boolean>(true);
  const [contributeData, setContributeData] = useState<any>(null);
  
  const GetContributions = () => {
    const userId = searchParams.get("userId") || "himazin331"
    const res = fetchGetContributions(userId);
    res.then((r) => {
      setContributeData(r["data"]["user"]["contributionsCollection"]["contributionCalendar"]);
      setContributeLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  };
  useEffect(GetContributions, [searchParams]);

  // User input event processing
  const ref = useRef<HTMLInputElement>(null);
  const userIdOnClick = (e: SyntheticEvent) => {
    e.preventDefault(); // prevent page transitions
    const paramUserId = ref.current?.value || "himazin331";
    window.document.location.href = `/?userId=${paramUserId}`;
  };

  return (
    <div className={styles.main}>
      <div className={styles.contentArea}>
        <h1>Contribute Calender and Weekly-Graph Widget Demo</h1>
        <h2>Show: {searchParams.get("userId") || "himazin331"} </h2>
      </div>

      <div className={styles.contentArea}>
        {contributeLoading && <span>Loading...</span>}
        {contributeData && 
          <WidgetArea contributeData={contributeData} />
        }
      </div>

      <div className={styles.contentArea}>
        <form>
          <p>Enter a GitHub User-ID to see the user&apos;s Contributions</p>
          <input ref={ref} type="text" placeholder="himazin331"/>
          <button type="submit" onClick={userIdOnClick}>Show</button>
        </form>
      </div>

      <div className={styles.contentArea}>
        <p>GitHub repo: <a href="https://github.com/himazin331/contribute_graph_widget" target="_blank" rel="noopener noreferrer">https://github.com/himazin331/contribute_graph_widget</a></p>
        <p>Author: <a href="https://github.com/himazin331" target="_blank" rel="noopener noreferrer">himazin331</a></p>
      </div>
    </div>
  );
};
export default Home;