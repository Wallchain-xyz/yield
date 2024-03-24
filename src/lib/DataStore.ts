/* eslint-disable no-console */
import fs from 'fs';

import { parse } from 'csv-parse';

import { checkBaseBalances } from './checkBaseBalances';

interface Record {
  tokenName: string;
  profit: number;
}

export interface RecordsOfAddress {
  owner: string;
  records: Record[];
}

const profitCoefficients = {
  USDT: 1.886,
  USDC: 1.67,
  WBTC: 0.124,
  WETH: 1.175,
};

class DataStore {
  data: { [key: string]: RecordsOfAddress } = {};

  playableIDs: string[] = [];

  constructor() {
    console.log('DataStore created');
    this.loadData().then(() => {
      console.log('Data loaded');
    });
  }

  loadData() {
    return new Promise<void>((resolve, reject) => {
      fs.createReadStream('data/js_data.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', values => {
          if (!Array.isArray(values)) return;
          const tokenName = values[2].toLowerCase();
          if (tokenName === 'token_name') return;

          const owner = values[0].toLowerCase();
          const duration = parseFloat(values[1]);
          const profit = parseFloat(values[3]);

          if (profit > 100) this.playableIDs.push(owner);

          this.data[owner] = this.data[owner] || { owner, records: [] };
          this.data[owner].records.push({
            tokenName: this.normalizeTokenName(tokenName),
            profit: this.upscaleProfit(tokenName, profit, duration),
          });
        })
        .on('end', () => {
          resolve();
        })
        .on('error', reject);
    });
  }

  async getRecords(owner: string) {
    const ethValue = await checkBaseBalances(owner as `0x${string}`);
    const record = this.data[owner.toLowerCase()];
    if (!record && !ethValue) return undefined;

    const result = {
      owner,
      records: [
        ...(record?.records ?? []),
        {
          tokenName: 'ETH',
          profit: ethValue,
        },
      ],
    };
    console.log(result);

    return result;
  }

  async getRandom() {
    let profile = null;
    const keys = this.playableIDs;

    while (!profile) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      // eslint-disable-next-line no-await-in-loop
      const profits = await this.getProfits(randomKey);
      if (profits && profits > 100) {
        profile = {
          address: randomKey,
          amount: profits,
        };
      }
    }

    return profile;
  }

  async getProfits(owner: string) {
    const records = await this.getRecords(owner);
    if (!records) return null;
    return (records?.records.map(record => record.profit) ?? []).reduce((acc, val) => acc + val, 0);
  }

  normalizeTokenName(tokenName: string) {
    return tokenName.replace(' bridged', '').toUpperCase();
  }

  upscaleProfit(tokenName: string, profit: number, duration: number) {
    const actualName = this.normalizeTokenName(tokenName);
    const profitCoefficient = profitCoefficients[actualName as keyof typeof profitCoefficients] ?? 1;
    const durationCoefficient = 365 / duration;
    return profit * profitCoefficient * durationCoefficient;
  }
}

export const dataStore = new DataStore();
