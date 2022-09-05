import { e, round } from "mathjs";

export async function main(
  event: any,
): Promise<any> {
  console.log('event 👉', event);

  return {
    body: JSON.stringify({message: 'Successful lambda invocation', num: round(e, 3) }),
    statusCode: 200,
  };
}