import { getPublicClient } from 'wagmi/actions';
import { config as wagmiConfig } from 'app/wagmi';
import { contractAbi } from 'entities/game/model/contracts/contractAbi';
import { readContract } from 'viem/actions';
import { Hex } from 'viem';

export const getContractData = async (contractAddress: string) => {
  const publicClient = await getPublicClient(wagmiConfig);
  const contractData = { abi: contractAbi, address: contractAddress as Hex };

  const [host, client, clientMove, lastActionTime, stake] = await Promise.all([
    readContract(publicClient, { ...contractData, functionName: 'j1' }) as Promise<string>,
    readContract(publicClient, { ...contractData, functionName: 'j2' }) as Promise<string>,
    readContract(publicClient, { ...contractData, functionName: 'c2' }) as Promise<number>,
    readContract(publicClient, { ...contractData, functionName: 'lastAction' }) as Promise<bigint>,
    readContract(publicClient, { ...contractData, functionName: 'stake' }) as Promise<bigint>,
  ]);

  return {
    host,
    client,
    clientMove,
    lastActionTime,
    stake,
  };
};
