/* GitHub Contributionsデータの取得 */

import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const fetch = require("node-fetch");

const handler: NextApiHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  const user_id: string = "himazin331"
  const req_headers = {
    "Authorization": `bearer ${process.env.GITHUB_TOKEN}`,
  };
  const req_body = JSON.stringify({
    query: `
      query {
        user(login: ` + user_id + `) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
                firstDay
              }
            }
          }
        }
      }
    `,
  });

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: req_headers,
      body: req_body,
    });

    if (!response.ok) {
      throw new Error('GitHub GraphQL API request failed');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export default handler;