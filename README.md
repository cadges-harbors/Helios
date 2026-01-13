# Helios

## Overview

Helios is a compact, read-only inspection tool built for the Base ecosystem. It helps developers validate Base Sepolia connectivity, inspect wallet and contract state, and generate verifiable onchain references through Basescan—without modifying blockchain state.

---

## Built for Base

- Designed for Base Sepolia testnet workflows  
- Uses official Coinbase and Base SDKs  
- References chainId 84532 throughout execution  
- Explorer-first output using Basescan  

All operations are non-mutating.

---

## Capabilities

### Network Context
- Confirms active connection to Base Sepolia  
- Displays chainId, latest block, and gas metrics  

### Wallet Inspection
- Connects via Coinbase Wallet SDK  
- Reads balance and transaction count  
- Detects presence of contract bytecode  

### Contract Probing
- Checks known testnet addresses for deployed code  
- Emits direct Basescan deployment and code links  

---

## Internal Flow

Helios establishes a wallet connection using the Coinbase Wallet SDK and communicates with Base Sepolia through `viem`. It collects wallet data, block metadata, and bytecode presence in parallel for efficiency. No transactions are signed or sent.

---

## Repository Structure

- **app/helios.ts**  
  Main executable script performing all read-only inspection logic.

- **contracts/**  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - `arrays.sol`  
  - `storage.sol`  
  
- **config/**  
  Network configuration files:
  - `base.sepolia.json`  

- **snapshots/**  
  Example outputs from inspection runs:
  - `latest.snapshot.json`  

- **reports/**  
  Human-readable summaries generated during validation:
  - `summary.md`  

- **docs/**  
  Supporting documentation:
  - `usage.md`  
  - `base-aa-notes.md`  

- **package.json**  
  Dependency manifest.

- **README.md**  
  Project documentation.

---

## Usage Notes

- Intended for inspection and validation only  
- Safe to run repeatedly  
- Suitable for validating Base tooling and account abstraction concepts  
- All outputs include Basescan links for independent verification  

---

## Author

GitHub: https://github.com/cadges-harbors 

Email: cadges.harbors-0t@icloud.com	

Twitter(X): https://x.com/broderlars8290
---

## License

MIT License

---

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract arrays.sol address:  
0x77ca95D9bDB13Fde4F4ff2062C353dF9a6915FAA

Deployment and verification:
- https://sepolia.basescan.org/address/0x77ca95D9bDB13Fde4F4ff2062C353dF9a6915FAA
- https://sepolia.basescan.org/0x77ca95D9bDB13Fde4F4ff2062C353dF9a6915FAA/0#code  

Contract storage.sol address:  
0x0477B2eFDF777fff689A06165D624A7b7e8b9806

Deployment and verification:
- https://sepolia.basescan.org/address/0x0477B2eFDF777fff689A06165D624A7b7e8b9806
- https://sepolia.basescan.org/0x0477B2eFDF777fff689A06165D624A7b7e8b9806/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
