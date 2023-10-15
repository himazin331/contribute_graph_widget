import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(request: Request) {
  const user_id: string = "himazin331"
  const req_headers = {
    "Authorization": `bearer ${process.env.GITHUB_TOKEN}`,
  };
  const req_body = JSON.stringify({
    query: `
      query {
        user(login: "` + user_id + `") {
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
    return NextResponse.json(data, {status: 200});
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
};
