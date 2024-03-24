/* eslint-disable import/no-default-export */
/* eslint-disable import/no-unused-modules */
import { RecordsOfAddress, dataStore } from '@/lib/DataStore';

export interface ProfitsResponse {
  found: boolean;
  data: RecordsOfAddress;
}

export async function GET(req: Request) {
  if (!req.url) {
    return Response.error();
  }

  const address = new URL(req.url).searchParams.get('address');
  const data = await dataStore.getRecords(address as string);

  const found = !!data;

  return Response.json({
    found,
    data,
  });
}
