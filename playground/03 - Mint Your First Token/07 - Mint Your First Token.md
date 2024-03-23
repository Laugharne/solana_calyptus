--------

```bash
anchor --version && solana --version
```

```
anchor-cli 0.29.0
solana-cli 1.17.4 (src:2e5a20f7; feat:2295605592, client:SolanaLabs)
```

---------

```bash
cargo add anchor-lang --features=init-if-needed
```

```bash
cargo add anchor-spl --features=metadata
```

---------

> If we may wish to be able to initialize an account and write data to it in one transaction to simplify things for the user.

> Anchor provides a handy **macro** called `init_if_needed` which, as the name suggests, will initialize the account if it does not exist.

```bash
solana-nft-anchor on  main [!] via 📦 v18.16.0 via 🦀 v1.76.0 ⚓ 0.29.0
X  cargo add anchor-lang --features=init-if-needed
	Updating crates.io index
	  Adding anchor-lang v0.29.0 to dependencies.
			 Features:
			 + init-if-needed
			 - allow-missing-optionals
			 - anchor-debug
			 - anchor-syn
			 - derive
			 - event-cpi
			 - idl-build
```

> Les métadonnées sont des informations supplémentaires associées aux données principales d'une application. Dans le cas de la blockchain Solana, les métadonnées sont souvent utilisées pour fournir des détails sur les actifs numériques, tels que des jetons non fongibles (NFT) ou d'autres actifs numériques uniques.

> L'activation de la fonctionnalité 'metadata' permet à votre application de bénéficier des fonctionnalités intégrées pour la gestion et la manipulation des métadonnées associées à vos actifs numériques sur la blockchain Solana. Cela peut inclure des fonctionnalités telles que la création, la modification, la suppression et la récupération des métadonnées, ainsi que leur association avec des actifs spécifiques.

> En activant la fonctionnalité 'metadata', vous pouvez tirer parti des capacités avancées de gestion des métadonnées dans vos applications Solana, ce qui peut être particulièrement utile lorsque vous travaillez avec des actifs numériques complexes ou des NFT nécessitant des informations supplémentaires pour être pleinement exploités.

```bash
solana-nft-anchor on  main [!] via 📦 v18.16.0 via 🦀 v1.76.0 ⚓ 0.29.0
❯ cargo add anchor-spl --features=metadata
	Updating crates.io index
	  Adding anchor-spl v0.29.0 to dependencies.
			 Features:
			 + associated_token
			 + metadata
			 + mint
			 + mpl-token-metadata
			 + spl-associated-token-account
			 + spl-token
			 + spl-token-2022
			 + token
			 + token_2022
			 - borsh
			 - devnet
			 - dex
			 - governance
			 - idl-build
			 - memo
			 - serum_dex
			 - shmem
			 - spl-memo
			 - stake

```

```bash
solana-nft-anchor on  main [!] via 📦 v18.16.0 via 🦀 v1.76.0 ⚓ 0.29.0
❯ anchb
	Finished release [optimized] target(s) in 0.16s

```

**File : `programs/solana-nft-anchor/Cargo.toml`**

```toml
[package]
name = "solana-nft-anchor"
version = "0.1.0"
description = "Created with Anchor"
edition = "2021"

[lib]
crate-type = ["cdylib", "lib"]
name = "solana_nft_anchor"

[features]
no-entrypoint = []
no-idl = []
no-log-ix-name = []
cpi = ["no-entrypoint"]
default = []

[dependencies]
anchor-lang = { version = "0.29.0", features = ["init-if-needed"] }
anchor-spl = { version = "0.29.0", features = ["metadata"] }
mpl-token-metadata = "4.0.0"
ahash = "=0.8.6"
```

--------

- [Token Metadata - Overview](https://developers.metaplex.com/token-metadata)
- [Program Derived Addresses (PDAs) | Solana Cookbook](https://solanacookbook.com/core-concepts/pdas.html)

--------