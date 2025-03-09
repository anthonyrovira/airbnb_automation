import { Reservation, ReservationData } from "../types";

export async function fetchReservationsBy40(
  pageIndex: number = 0,
  allReservations: Reservation[] = [],
  totalCount: number = 0
): Promise<ReservationData | undefined> {
  const envVariableIndex = `AIRBNB_CLIENT_REQUEST_ID_${pageIndex}`;
  const clientRequestId = process.env[envVariableIndex] as string;

  const response: Response = await fetch(
    `https://www.airbnb.fr/api/v2/reservations?locale=fr&currency=EUR&_format=for_remy&_limit=40&_offset=${
      pageIndex * 40
    }&collection_strategy=for_reservations_list&sort_field=start_date&sort_order=desc`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-airbnb-api-key": `${process.env.AIRBNB_API_KEY}`,
        "x-airbnb-supports-airlock-v2": "true",
        "x-client-request-id": clientRequestId,
        "x-csrf-token": `${process.env.AIRBNB_CSRF_TOKEN}`,
        "x-csrf-without-token": "1",
        cookie: `${process.env.BROWSER_COOKIES}`,
        Referer: "https://www.airbnb.fr/hosting/reservations/all",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "GET",
    }
  );
  if (response.status !== 200) {
    console.log("❌ Fetching issue", {
      status: response.status,
      body: response.body,
      statusText: response.statusText,
      pageIndex,
    });
    return undefined;
  }

  const newReservations = (await response.json()) as ReservationData;

  if (newReservations?.reservations?.length === 0) {
    console.log(`🌈 Your data is ready with ${totalCount} reservations`);
    return {
      reservations: allReservations,
      metadata: {
        page_count: Math.ceil(totalCount / 40),
        page_index: pageIndex,
        total_count: totalCount,
      },
    } as ReservationData;
  }
  allReservations.push(...newReservations?.reservations);
  totalCount = newReservations?.metadata?.total_count;

  console.log(
    `👌 Page ${pageIndex + 1} is ready with ${
      newReservations?.reservations?.length
    } reservations`
  );
  return fetchReservationsBy40(pageIndex + 1, allReservations, totalCount);
}

export async function fetchAllReservations(): Promise<
  ReservationData | undefined
> {
  const allReservations: Reservation[] = [];
  const pageIndex = 0;
  const totalCount = 0;

  return fetchReservationsBy40(pageIndex, allReservations, totalCount);
}
