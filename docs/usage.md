# Helios — Usage

Helios is a lightweight **read-only** inspection tool for Base Sepolia.
It focuses on repeatable checks: connectivity, block height, and basic address probes.

---

## What Helios Does

- Reads the latest block number/hash
- Performs safe address checks (balance + `eth_getCode`)
- Produces:
  - a machine-readable snapshot (`snapshots/latest.snapshot.json`)
  - a human summary (`reports/summary.md`)

Helios does **not** send transactions by default.

---

## Configuration

Helios reads network settings from:

- `config/base.sepolia.json`

Key fields:
- `chainId` must be `84532`
- `rpc.default` must be HTTPS
- `explorer.url` should be `https://sepolia.basescan.org`

---

## Typical Run Workflow

1. Load config
2. Connect to RPC and fetch latest block
3. Run probes against the sample addresses
4. Write snapshot + summary output

---

## Troubleshooting

- If RPC fails:
  - switch to a fallback RPC from config
  - re-run and compare `snapshots/latest.snapshot.json`
- If explorer links are wrong:
  - verify `explorer.url` matches the selected network

---

_Last updated: initial scaffold_
