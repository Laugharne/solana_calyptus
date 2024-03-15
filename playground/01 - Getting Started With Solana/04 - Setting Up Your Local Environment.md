```bash
rustc --version
cargo --version
solana --version
solana-keygen --version
```

```
rustc 1.76.0 (07dca489a 2024-02-04)
cargo 1.76.0 (c84b36747 2024-01-18)
solana-cli 1.17.4 (src:2e5a20f7; feat:2295605592, client:SolanaLabs)
solana-keygen 1.17.4 (src:2e5a20f7; feat:2295605592, client:SolanaLabs)
```

```bash
solana-keygen new # --force
```

```
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none): 
Enter same passphrase again: 

Wrote new keypair to /home/franck/.config/solana/id.json

...
```

```bash
solana config get
```

```
Config File: /home/franck/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com 
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/franck/.config/solana/id.json 
Commitment: confirmed 
```


```bash
solana config set --url mainnet-beta
```

```
Config File: /home/franck/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com 
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /home/franck/.config/solana/id.json 
Commitment: confirmed 
```

```bash
solana config set --url devnet
```
```
Config File: /home/franck/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com 
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/franck/.config/solana/id.json 
Commitment: confirmed 
```


```bash
solana airdrop 2
```

```
Config File: /home/franck/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com 
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /home/franck/.config/solana/id.json 
Commitment: confirmed 
```

solana airdrop 1 2mcDUMsXbfzeiyr8cNd4XrTp2uwKySC6ujGmCVfBfQ3j --url devnet

[Solana Faucet for Devnet by QuickNode](https://faucet.quicknode.com/solana/devnet)


solana config set --url localhost
solana airdrop 1


```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

```bash
avm install latest
avm use latest
```
> **warning:** be sure to add `/home/franck/.avm/bin` to your **PATH** to be able to run the installed binaries

Add to .profile
```bash
PATH=$PATH:/home/franck/.avm/bin
```


[Solana Playground | Solana IDE](https://beta.solpg.io/)
