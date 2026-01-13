# Helios — Base AA Notes

Helios is read-only, but account abstraction (AA) concepts still matter because
addresses can be EOAs or smart accounts (contract accounts).

---

## Why AA Matters in a Read-only Tool

A read-only tool must not assume address type.

- EOA → `eth_getCode(address)` returns `0x`
- Smart account → `eth_getCode(address)` returns bytecode

This impacts:
- how you interpret “account” behavior
- whether contract events/logic may exist at the address

---

## Quick Glossary

### EOA (Externally Owned Account)
A regular wallet address controlled by a private key.
- No code at the address
- Signs transactions directly

### Smart Account (Contract Account)
A contract-based account with custom validation/execution logic.
- Code is present at the address
- May support batching, session keys, recovery, policy rules

### Bundler
Service that submits aggregated user intents (often user operations).
- Improves UX by handling submission overhead

### Paymaster
Gas sponsor / policy component for “gasless” flows.
- Requires careful security constraints

---

## Practical Checks Helios Should Do

- Always run `eth_getCode` before assuming an address is an EOA
- Keep RPC + chainId + explorer derived from config, not hardcoded

---

_Last updated: initial scaffold_
