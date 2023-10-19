import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request: Request) {
  const reader = request.body?.getReader();
  async function readRequestBody() {
    const { value, done } = await reader!.read();
    if (done) return;
    return value;
  }
  const textDecoder = new TextDecoder("utf-8");
  const decoded_reqbody = textDecoder.decode(await readRequestBody());
  const reqbody = JSON.parse(decoded_reqbody);
  const user_id = reqbody["userId"] === "" ? "himazin331" : reqbody["userId"];
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
