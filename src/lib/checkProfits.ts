import { ProfitsResponse } from '@/app/api/profits/route';

export async function checkProfits(address: string) {
  const url = new URL('/api/profits', window.location.href);
  url.searchParams.set('address', address);
  return (await fetch(url)).json() as Promise<ProfitsResponse>;
}
