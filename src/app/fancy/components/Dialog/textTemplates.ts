import { RecordsOfAddress } from '@/lib/DataStore';

export const invitationText = `Good you came to me, I can tell you a great wisdom about crypto investments.

Do you know how much money you lost by not using automatic yield? Give me your wallet address and I will tell you.`;

export const nothingTemplate = `Typical annual gain is 10-20% in reputable tokens.

Multiply it by your typical holding amount. You can do the math yourself. I'm not a calculator. Dude.
`;

export const successTemplate = (profits: RecordsOfAddress) => {
  const lines = profits.records.map(record => `  -$${record.profit.toFixed(2)} in ${record.tokenName}`).join('\n');

  return `Last year you could possibly earn:
${lines} 
It's not a financial advice but check wallchain.xyz for more info. Dude.`;
};

export const notAnAddress = `It's not an address, dude. Sorry to disappoint you.`;
