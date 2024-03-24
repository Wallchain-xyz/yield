/* eslint-disable import/no-unused-modules */
import axios from 'axios';
import { Address, PublicClient, createPublicClient, encodeFunctionData, formatEther, http } from 'viem';
import { base } from 'viem/chains';

import erc20abi from './erc20abi.json';

async function getTokenPrice(token: Address) {
  const response = await axios.get('https://wallet.wallchains.com/b/v2/tokens/by_addr', {
    params: {
      token,
      chainId: 8453,
      includePrices: true,
    },
  });

  return response.data[0];
}

async function getERC20Balance(client: PublicClient, owner: Address, token: Address) {
  const data = encodeFunctionData({
    abi: erc20abi,
    functionName: 'balanceOf',
    args: [owner],
  });

  const response = await client.call({
    to: token,
    data,
  });

  return response.data;
}

const WETH_ADDRESS = '0x4200000000000000000000000000000000000006';

export async function checkBaseBalances(address: `0x${string}`) {
  try {
    const client = createPublicClient({
      chain: base,
      transport: http(),
    });

    const ethBalances = await client.getBalance({ address });
    // @ts-expect-error @TODO: fix types
    const wethBalances = await getERC20Balance(client, address, WETH_ADDRESS);

    const wethPrices = await getTokenPrice(WETH_ADDRESS);

    const ethValue = (wethPrices.price.usdPrice as number) * parseFloat(formatEther(ethBalances));
    const wethValue =
      (wethPrices.price.usdPrice as number) * parseFloat(formatEther(BigInt(wethBalances as `0x${string}`)));

    return (ethValue + wethValue) * 0.062;
  } catch (error) {
    return 0;
  }
}
