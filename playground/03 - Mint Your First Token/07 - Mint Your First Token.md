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
**Overview**

> _Solana was one of the first few chains to support parallel transaction execution (not just signature verification) in a single shard_.(A **shard** refers to a single processing unit that supports parallel transaction execution).

> To put it in a sentence: Solana is a **`proof-of-stake`** blockchain plus some extra stuff **(PoS++)**.

> The most important extra shit is a mechanism they call **`proof-of-history` (PoH)**:
> - Validators are constantly hashing the previous output of a hash and periodically publishing one of those hashes plus the number of iterations required to reproduce it.
> - This is cool because you must produce new hashes in serial, but you can verify a collection of hash checkpoints in parallel.

> The hash chain is canonical across validators:
> - But validators can produce them independently **without needing to wait** for committed blocks.
> - These **hashes are used** as a rudimentary **clock**, to be able to prove things happened in a certain order, and that some arbitrary amount of time elapsed between them.
> - Sharing a clock simplifies some of the woefully complex coordination problems inherent in blockchains.

> Most of the other extra shit is straightforward optimizations, i'll just summarize:
> - Validators **don't need to wait** for all the pieces to presume correctness.
> - They also claim to offload data to Not Filecoin, so **validators can run light clients**.
> - Instead of **flood filling the mempool**, there's deterministic leader selection and nodes forward transactions to future leaders.
> - The client declares what memory locations it needs beforehand so the **runtime can prefetch** and map it.
> - They run multiple transactions on the same program in parallel with **SIMD instructions**.
> - They offload **signature verification** to **GPUs**.

> Solana uses **ed25519** for encryption and **sha256** for hashing.
> - They chose sha256 specifically because all the effort put into **BTC Asics** means its unlikely to have a surprise optimization that would trivialize proof of history.
> - **`pubkeys`** are used as **addresses** without truncation.
> - There's an easter egg that you can use **base64** for supposed perf improvement but everyone uses **base58** anyway.

--------
**Programs and Accounts**

> **Programs are stateless contracts**. theres nothing like class variables or globals or whatever you get in solidity, all data is explicit pass by reference from the outside

> You write **programs in Rust** with the **`solana-sdk` library**.
> - There's a thing called `xargo` to **cross-compile to ebpf**, you just need an extra config file for that (see: `Xargo.toml` file).
> - `cargo build-bpf` and the `deploy` command will be displayed to you after. Theres a built-in program upgrade feature

> **Accounts are buffers**:
> - They call them accounts it confuses the shit out of everyone.
> - Theres a function `create_account`. It's just a `calloc` on the blockchain.

> You create an account with a **declared size** in bytes.
> - You can store **arbitrary binary data** in it.
> - Accounts cannot be realloced. (but now that i think of it i havent checked yet if you can recreate them after freeing them thats a interesting question.)

> **Accounts can also store lamports**:
> - It's the kawaii name for the **Solana coin smallest unit**
> - In theory you **pay rent for storage** but if you put **two years** worth of rent in the account, then they **let you be exempt** so everyone just does that.

> **An account is owned by the system program by default**:
> - The system program has basic functions for creating more accounts and sending lamports and such and such.
> - Accounts can be assigned a **new owner** once and **only once**.
> - **This owner is always a program**, which has permission to deduct lamports from the account and modify its data however it wishes

> **Account addresses are ed25519 pubkeys**:
> - The corresponding **`privkey`** is retained by the user for signatures.
> - Solana devs like to call this **"*authority*"** to avoid adding a confusing second meaning to **"*owner*"**

> **Programs are not special**: they are also data, stored in accounts.
> - These accounts are **flagged as executable** and **ownership** is transferred to an **eBPF loader program**.
> - Program accounts are required to have **enough lamps** to qualify for **rent exemption** and i think you cant dealloc them either.
> - Various places refer to a **program id**, this is just the **address of the account** its stored in.

> One advantage of the **program/account model** is you can have one generic program that operates on various data. The **best example** of this is the **SPL Token Program**.
> - To **create a new token**, you don't need to deploy code like you do on ethereum. you create an account that can mint tokens, and more accounts that can receive them.
> - The **mint address** uniquely determines the **token type**, and these are all passed as arguments to one static program instance

--------
**Transactions and Instructions**

> **The basic operational unit on solana is an instruction**:
> - An instruction is **one call** into a program.
> - One or more instructions can be bundled into a message.
> - A message plus an array of signatures constitutes a transaction

> This is very important for ethereum devs to understand: end users can construct atomic transactions that call multiple programs. I don't think anyone really appreciates the security implications of this fact yet but it will adorn many an exploit writeup introductory paragraph someday.

> The important thing is **you must forward-declare every account** you intend to **read** from or **write** to. That may include:
> - The system program
> - The token program
> - Your account
> - Your token accounts
> - Any necessary program accounts, etc.
> - This also includes **special addresses** called **`sysvars`** if the program needs to know facts like:
>   - How much is rent.
>   - What time is it.

> This is the cost of their **prefetching and parallel execution optimizations**.

> Writing to an account **requires the authority** to do so, which is proved by **signing the full message with the appropriate privkey**.
> - Non-signed accounts may also be writable, for instance if owned by the program your instruction calls.
> - A transaction is uniquely identified by its first message signature

> The last important thing a message contains is a **blockhash**:
> - I specifically say "message" to communicate that it is part of the signed data.
> - It serves the same purpose as **Ethereum nonces**

> The **blockhash** is also used as a **ttl** by requiring it be no more than **32 blocks old**.
> - This means if a transaction isn't confirmed in a certain **amount of time**, it can **never be confirmed**, and you can safely regard it as expired.

> Solana also provides a **nonce mode** for those who want it, to enable airgapped signing.


--------
**Program Derived Addresses**

> Theres a special kind of account which a program can sign for without a privkey.
> - Given a **seed of arbitrary bytes** plus a **program id**, you can generate what looks like an **ed25519 pubkey**.
> - As long as it' i's **not a valid key** **(*ie not on the curve*)** theres a mechanism for Solana to fake a signature for you.
> - The reason for the (in)validity check is to **ensure a `privkey` by definition cannot exist**.

> This ends up being kind of annoying because not every combination of seed and program id is usable. Theres special functions to take them and increment a nonce until you get a (in)valid pubkey tho

> Programs want to be able to sign accounts for **cross-program invocation**. eg, if you want your program to transfer lamps to a user account, you can have the program sign its own account and invoke_signed the system program with its account as the "from" address and the user account as "to"

> A common pattern is to use **addresses derived from** a **namespace** and a **user `pubkey`** for efficient key/value mappings, keyed off the user

--------
**Runtime**

> Solana really earns the **mainnet-beta** designation once you get into runtime constraints.
> - Every instruction has **fixed compute budgets** which cannot be exceeded.
> - There are **hardcoded limits** on:
>   - eBPF instructions,
>   - Log messages,
>   - Stack size,
>   - Call depth,
>   - And number of cross-program invokes.

> **Reentrancy** is banned except for self-reentrancy. You get:
> - 32kb of heap
> - No free or realloc.

> There is no mechanic to pay for more compute:
> - So if you cant fit in the budget you better make it fit.
> - I live in terror of writing a working program that calls another program, and later its devs change it to be more expensive, and now my program cant fit in budget anymore and breaks forever.

> There is also a **1232 byte limit on messages**, which is egregiously low.
> - Because of the very strict compute budgets, **CPI** is for in-and-out type of stuff, not for legos.
> - In theory, youd use **multi-instruction transactions** for that.
>
> **But...** in practice its hard to fit complex operations into the size limit because you need to list a bajillion addresses for everything.

> Theres talk of a new transaction format coming that may or may not improve this situation.

--------
**Client**

> Clients submit transactions and fetch data from **RPC nodes** using `jsonrpc` payloads sent to **8899**. Theres also a **pubsub websocket** at **8900** but i havent used it yet.

> Unlike solidity, **programs have no `read` interfaces**:
> - Write-only !
> - If you need to read, you have to pull the raw data by account address via rpc and deserialize it yourself.

> `solana-web3` doesnt have any documentation other than typescript types but theres enough stray **references to `wei`** in there, i think i might be **forked from the eth equivalent?**

> `sendAndConfirmTransaction()` is usually the function you want. this is not a programming tutorial but i will warn you that forming proper transactions is tricky, look up some examples and good luck.

> The most important debugging advice i know that no one ever told me:
> - Turn on preflight checks when testing client code
> - Turn them off when testing onchain programs.
>
> **Transactions are sanity checked on the client before they're submitted**
> - But the errors and logging you get from the chain are way better.
> - Theres a options object that you can pass into the send functions for this.
>
>Also for local testing you can turn commitment down to processed so you dont have to wait for confirmation to see a result.

--------
**cli**

> In contrast with the somewhat arcane client-side experience, the cli tools are really really good. curlshell the solana-install version manager and youre set up.

> `solana-test-validator` does exactly what it says and literally you just have to run that and it works, i love it.
> `solana logs` gives you logs which you can print to in programs with **`msg!()` macro** theres a lot more but seriously i have no complaints here and its all very straightforward.

--------
**Calling convention**

> This is my favorite part. All solana programs expose a **single entrypoint** that provides as arguments:
> - The program id
> - Accounts array
> - And instruction data.
>
> Whats instruction data? thats right baby, a `u8 array`

> **Serialization and dispatch are your problem**. If youre calling some one elses program, you have to rely on them giving you client code or documentation to be able to determine how to properly form an instruction because all interfaces are opaque and ad hoc

--------
**Links**

- [Using PDAs and SPL Token in Anchor](https://betterprogramming.pub/using-pdas-and-spl-token-in-anchor-and-solana-df05c57ccd04)
- [Développer un program (smart-contract) sur la blockchain Solana avec le framework Anchor ⚓️🧑‍💻](https://dev.to/sailorsnow/french-solana-dev-1-developper-un-program-smart-contract-sur-la-blockchain-solana-avec-le-framework-anchor-4il)
- [The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom - DEV Community](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
- [Programming on Solana - An Introduction | paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [Building a blog on Solana with Anchor - DEV Community](https://dev.to/findiglay/building-a-blog-on-solana-2pg8)
- [Accelerated Guide to Fullstack Web3 with ASS (Anchor, Solana, and Svelte) 🍑 - DEV Community](https://dev.to/0xmuse/accelerated-guide-to-fullstack-web3-with-ass-anchor-solana-and-svelte-1mg)
- [Solana Summer](https://www.notboring.co/p/solana-summer)
- [2501babe: solana 101](https://2501babe.github.io/posts/solana101.html)

----

- [**Sealevel — Parallel Processing Thousands of Smart Contracts**](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192)
  - [**Proof of History (POH)**](https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274) — a clock before consensus;
  - [**Tower BFT**](https://medium.com/solana-labs/wer-bft-solanas-high-performance-implementation-of-pbft-464725911e79) — a PoH-optimized version of PBFT;
  - [**Turbine**](https://medium.com/solana-labs/turbine-solanas-block-propagation-protocol-solves-the-scalability-trilemma-2ddba46a51db) — a block propagation protocol;
  - [**Gulf Stream**](https://medium.com/solana-labs/gulf-stream-solanas-mempool-less-transaction-forwarding-protocol-d342e72186ad) — Mempool-less transaction forwarding protocol;
  - [**Sealevel**](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) — Parallel smart contracts run-time;
  - [**Pipelining**](https://solana.com/pipelining-in-solana-the-transaction-processing-unit/) — a Transaction Processing Unit for validation optimization
  - [**Cloudbreak**](https://medium.com/solana-labs/cloudbreak-solanas-horizontally-scaled-state-architecture-9a86679dcbb1) — Horizontally-Scaled Accounts Database; and
  - [**Archivers**](https://solana.com/archivers/) — Distributed ledger store

----

**Tower BFT** est un algorithme de consensus conçu pour la blockchain Solana. Il s'agit d'une version optimisée de l'**algorithme PBFT adaptée à Solana**.

Tower BFT s'appuie à la fois sur PBFT pour parvenir à un consensus entre les validateurs et sur PoH pour garantir l'ordre temporel des transactions. Cela permet à Solana d'atteindre un consensus rapide et efficace, ce qui est essentiel pour les performances élevées de la blockchain.

1. **Practical Byzantine Fault Tolerance (PBFT)** : PBFT est un algorithme de consensus qui permet à un réseau décentralisé de parvenir à un accord sur l'ordre des transactions malgré la présence de nœuds défaillants ou malveillants.

2. **Proof of History (PoH)** : Il prend en compte les caractéristiques spécifiques de Solana. Dont la **Proof of History**, mécanisme qui garantit l'unicité de l'ordre des transactions dans Solana, permettant d'atteindre un consensus plus rapidement.

```mermaid
graph TD;
	A[Tower BFT] --> B["Practical Byzantine Fault Tolerance (PBFT)"];
	A --> C["Proof of History (PoH)"];
	B --> D[Consensus among validators];
	C --> D;
```


----

**Turbine** est un protocole de propagation de blocs conçu pour améliorer l'efficacité et la rapidité de la diffusion des blocs. Il utilise une approche de diffusion de type "push", dans laquelle les nœuds du réseau envoient activement les blocs aux nœuds voisins dès qu'ils sont produits.

Voici un bref aperçu du fonctionnement :

1. **Production du bloc :** Lorsqu'un nœud valide avec succès un nouveau bloc, il l'envoie immédiatement à ses pairs connectés.

2. **Propagation multi-flux :** Turbine utilise plusieurs flux de données pour envoyer simultanément le bloc à plusieurs nœuds voisins. Cela permet de maximiser la vitesse de propagation et de réduire les goulets d'étranglement potentiels.

3. **Relayeurs :** Certains nœuds spécifiques, appelés "relayeurs", sont désignés pour aider à relayer activement les blocs à travers le réseau. Ils sont choisis en fonction de leur capacité à propager efficacement les blocs.

4. **Gestion de la congestion :** Turbine est conçu pour s'adapter dynamiquement aux conditions du réseau, en ajustant la fréquence et la taille des flux de données en fonction de la congestion et des performances du réseau.

5. **Optimisation de la latence :** En utilisant une approche de diffusion proactive et en exploitant la parallélisation des flux de données, Turbine vise à minimiser la latence de propagation des blocs dans le réseau.

Voici un diagramme illustrant le processus de propagation des blocs avec Turbine :

```mermaid
graph LR
    A((Producteur de bloc)) --> B(Relayeur)
    A --> C(Relayeur)
    A --> D(Relayeur)
    B --> E((Noeud))
    C --> F((Noeud))
    D --> G((Noeud))
    E --> H((Noeud))
    F --> I((Noeud))
    G --> J((Noeud))
```

Dans ce diagramme :
- Le nœud A représente le producteur de bloc initial.
- Les nœuds B, C et D sont des relayeurs qui aident à propager le bloc.
- Les nœuds E, F, G, H, I et J sont des nœuds récepteurs qui reçoivent et valident le bloc.

```mermaid
graph LR
  l[[LEADER]] --> v1[VALIDATOR 1]
  l --> v2[VALIDATOR 2]

  v1 --> v3[VALIDATOR 3]
  v1 --> v4[VALIDATOR 4]

  v2 --> v5[VALIDATOR 5]
  v2 --> v6[VALIDATOR 6]

```

```mermaid
graph TB

  subgraph NEIGHBORHOOD-2
  v6 -.-> v5[VALIDATOR 5]
  v5 -.-> v6[VALIDATOR 6]
  end

  subgraph NEIGHBORHOOD-1
  v4 -.-> v3[VALIDATOR 3]
  v3 -.-> v4[VALIDATOR 4]
  end

  subgraph NEIGHBORHOOD-0
  v2[VALIDATOR 2] -.-> v1[VALIDATOR 1]
  v1 -.-> v2
  end

```

--------

**Gulfstream** est un protocole de transfert de transactions sans mémorisation tampon (mempool-less) conçu pour améliorer l'efficacité et la rapidité des transactions. Contrairement aux protocoles traditionnels qui stockent les transactions dans une file d'attente (mempool) avant de les valider, Gulfstream achemine directement les transactions aux validateurs pour traitement.

```mermaid
graph LR
    A[Client] --> B[Gulfstream Node]
    B --> C[Validator 1]
    B --> D[Validator 2]
    B --> E[Validator 3]
    C --> F[Block Creation]
    D --> F
    E --> F
    F --> G[Blockchain]
```

Dans ce schéma :
- Le client envoie une transaction au nœud Gulfstream.
- Le nœud Gulfstream relaie la transaction directement aux validateurs sans la stocker dans une mempool.
- Les validateurs reçoivent la transaction et la valident.
- Une fois validée, la transaction est incluse dans un bloc et ajoutée à la blockchain.

En éliminant la nécessité de stocker les transactions dans une mempool, Gulfstream réduit les délais de traitement et améliore l'efficacité du réseau, ce qui peut conduire à des transactions plus rapides et à une meilleure évolutivité globale du système.

--------

**Sealevel** est une couche d'exécution parallèle de contrats intelligents conçue spécifiquement pour la blockchain Solana. Elle permet à plusieurs contrats intelligents de s'exécuter simultanément, améliorant ainsi l'efficacité et les performances de la blockchain.

The reason why Solana is able to process transactions in parallel is that Solana transactions describe all the states a transaction will read or write while executing. This not only allows for non-overlapping transactions to execute concurrently, but also for transactions that are only reading the same state to execute concurrently as well.

**Cloudbreak** est une base de données d'adresses publiques associées à des comptes, où les comptes maintiennent des soldes et des données sous forme de vecteur d'octets. Les comptes ont un champ "owner", qui est la clé publique du programme gouvernant les transitions d'état pour le compte.

**Programmes :**
- Les programmes ne sont que du code sans états (ceuc-ci se trouve dans les "data account")
- Les programmes ne peuvent modifier que les données des comptes qu'ils possèdent et ne peuvent débiter que ces comptes.
- Tout programme peut créditer n'importe quel compte et lire n'importe quel compte.

**Programme-système (system program) :**
- Par défaut, tous les comptes sont initialement possédés par le `system program`.
- Le `system program` peut :
  - Assigner la propriété des comptes
  - Allouer des données initialisées à zéro
  - L'assignation de propriété de compte ne peut se produire qu'une seule fois dans la durée de vie d'un compte.

**Programme-chargeur (loader program)**
Un programme défini par l'utilisateur est chargé par le programme chargeur, qui peut le "marquer" comme exécutable.

Les transactions suivantes doivent être réalisées lors du chargement d'un programme :
- La création d'une nouvelle clé publique (`public key`)
- Le transfert de "SOL" vers cette clé
- L'allocation de mémoire par le `system program`
- L'assignation du compte au `loader`
- Le téléchargement du bytecode dans la mémoire par morceaux
- Le marquage de la mémoire comme exécutable par le programme chargeur.

À ce stade, le chargeur vérifie le bytecode, et le compte auquel le bytecode est chargé peut être utilisé comme programme exécutable. De nouveaux comptes peuvent être marqués comme appartenant au programme défini par l'utilisateur.

**Transactions :**


--------

**Pipelining**
Le pipelining est une technique d'optimisation de la validation des transactions sur la blockchain Solana. Il permet de diviser le processus de validation en plusieurs étapes distinctes, appelées "stades", qui peuvent être exécutées en parallèle. Chaque stade traite une partie spécifique de la transaction, ce qui permet d'accélérer le traitement global des transactions et d'augmenter le débit du réseau.

----

![](2024-03-26-17-09-09.png)


On the Solana network, the pipeline mechanism — Transaction Processing Unit — progresses through:
- **Data Fetching** at the kernel level
- **Signature Verification** at the GPU level
- **Banking** at the CPU level
- **Writing** at the kernel space.

By the time the TPU starts to send blocks out to the validators, it’s already fetched in the next set of packets, verified their signatures, and begun crediting tokens.

Imaginons 4 transactions successives (A, B, C, D) Elles seront décodées de la manière suivante :
- La transaction D sera à l'étape Writing
- La transaction C sera à l'étape Banking
- La transaction B à l'étape Signature Verification
- La transaction A au Fetching

```mermaid
graph TD;
    A --> fetch;
    B --> verif;
    C --> banking;
    D --> write;

    subgraph "Transactional Processing Unit (TPU)"
        fetch>Fetching]
        verif>"Sig Verify"]
        banking>Banking];
        write>Writing];
  
        subgraph GPU
            verif>"Sig Verify"]
        end
    
        subgraph CPU
            banking>Banking]
        end
    
        subgraph KERNEL
            fetch>Fetching]
            write>Writing]
        end
  
        subgraph "Transactions"
            A[Transaction A]
            B[Transaction B]
            C[Transaction C]
            D[Transaction D]
        end
    end
```

En résumé, le pipelining permet d'optimiser la validation des transactions en réduisant le temps nécessaire pour traiter chaque transaction individuelle, ce qui contribue à améliorer les performances et l'efficacité du réseau Solana.