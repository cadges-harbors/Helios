// app/helios.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  createPublicClient,
  http,
  formatEther,
  isAddress,
  getAddress,
} from "viem";
import { baseSepolia } from "viem/chains";

const NETWORK = {
  name: "Base Sepolia",
  chainId: 84532,
  rpcUrl: "https://sepolia.base.org",
  explorer: "https://sepolia.basescan.org",
};

type Addr = `0x${string}`;

const sdk = new CoinbaseWalletSDK({
  appName: "Helios (Built for Base)",
});

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(NETWORK.rpcUrl),
});

function normalize(addr: string): Addr {
  if (!isAddress(addr)) throw new Error("Invalid address");
  return getAddress(addr) as Addr;
}

async function connectWallet(): Promise<Addr> {
  const provider = sdk.makeWeb3Provider(NETWORK.rpcUrl, NETWORK.chainId);
  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];
  return normalize(accounts[0]);
}

async function networkSnapshot() {
  const [block, gasPrice] = await Promise.all([
    client.getBlock(),
    client.getGasPrice(),
  ]);

  return {
    blockNumber: block.number,
    timestamp: block.timestamp,
    gasUsed: block.gasUsed,
    gasLimit: block.gasLimit,
    gasPrice,
  };
}

async function inspectAddress(address: Addr) {
  const [balance, nonce, code] = await Promise.all([
    client.getBalance({ address }),
    client.getTransactionCount({ address }),
    client.getBytecode({ address }),
  ]);

  return {
    address,
    balanceEth: formatEther(balance),
    nonce,
    isContract: !!code,
    explorerUrl: `${NETWORK.explorer}/address/${address}`,
  };
}

async function run() {
  console.log("Helios — read-only session");
  console.log("Network:", NETWORK.name);
  console.log("chainId:", NETWORK.chainId);

  const wallet = await connectWallet();
  const [snap, report] = await Promise.all([
    networkSnapshot(),
    inspectAddress(wallet),
  ]);

  console.log("Wallet:", report.address);
  console.log("Balance:", report.balanceEth, "ETH");
  console.log("Nonce:", report.nonce);
  console.log("Is contract:", report.isContract ? "yes" : "no");
  console.log("Explorer:", report.explorerUrl);

  console.log("Latest block:", snap.blockNumber);
  console.log("Gas used / limit:", snap.gasUsed.toString(), "/", snap.gasLimit.toString());
  console.log("Gas price:", snap.gasPrice.toString());

  const probes: Addr[] = [
    "0x1111111111111111111111111111111111111111",
    "0x2222222222222222222222222222222222222222",
    "0x3333333333333333333333333333333333333333",
  ].map(normalize);

  for (const p of probes) {
    const r = await inspectAddress(p);
    console.log("Probe:", r.address, "| contract:", r.isContract ? "yes" : "no");
    console.log("Verify:", `${NETWORK.explorer}/address/${r.address}`);
  }

  console.log("Done. No transactions were signed or broadcast.");
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exitCode = 1;
});
