[Creating Your First Token - Calyptus](https://calyptus.co/lessons/creating-your-first-token/)

# Creating Your First Token

##### October 10, 2023

### **Project Checklist!** 

Are you familiar with blockchain technology? If not, click [here](https://calyptus.co/lessons/blockchain-101/)  

Are you familiar with smart contracts and how they work? If not, click [here](https://calyptus.co/lessons/smart-contracts-101-3/)

Feel like you know why Solana is great for builders? If not, click [here](https://calyptus.co/lessons/intro-to-solana/(opens in a new tab))

First time setting up your local environment? Click [here](https://calyptus.co/lessons/intro-to-rust-programming/)

First time programming with Rust? Click [here](https://calyptus.co/lessons/setting-up-your-local-environment/(opens in a new tab))

**Getting Started**

Before we dive in, there’s one small request we’d like to make:

- **Submit Public GitHub repo:** To ensure accurate tracking of your tutorial completions, please provide your GitHub URL **publicly**. Private URLs may result in a 404 error, and we won’t be able to register your completion. Thank you!
- **Contribute:** We encourage you to contribute to this project! If you find errors, have suggestions for improvements, or want to expand upon the tutorial, please submit pull requests. Let’s learn together and make this resource even better.

### **Project Intro**

In this project, we are going to be building our own token on Solana. If you’re an absolute beginner in the Solana ecosystem, then marvellous! This is a very simple tutorial to get you going. By the end of the tutorial, you will understand how tokens function in Solana and what token accounts essentially are. 

(P.s. if you’re familiar with the Ethereum Ecosystem, this is like spinning up your own ERC20 token)

#### **Recap: how tokens work on Solana**

As discussed in the Solana 101 module ([here](https://calyptus.co/lessons/intro-to-solana/)), Solana has a unique architecture where the logic and state are stored in separate accounts. Since the logic is the same for every token, a single Program Account can be used for all the tokens on Solana, unlike Ethereum where every token has to create and deploy a new copy of ERC-20 contract. 

Therefore, the current token standard on Solana is to use the same Program known as SPL Token Program to create tokens and a different program from Metaplex known as Token Metadata Program to create data accounts for the token to store the token details and metadata respectively. The token Account stores data such as the balance and each one is owned and managed by the **SPL Token Program.**

![](https://lh5.googleusercontent.com/5m_k4S3jP3ydpkFKmoIDDj_AXmeHiq1iQiQ5oMJppxCta2X8qKjRYi0BojEgIw8CfLb-U50PduStI7rrgaXKTpN_puK42d0UEdMmBwWxNUR4TI-uZKKXkz5SzWNAbe_FylgXAyneUYV2IfpAlsRiIeo)

For any given token, the first account created is _Mint Account (see above)_. This account holds the basic information about the token such as its supply, decimals, authority, etc. It acts as the basic identity account for the token.

However, the mint account doesn’t hold the meta information about the token. For this purpose, the standard is to use the _Token Metadata Program_. This program creates another account known as _Metadata Account_ which holds additional information about the token such as its name, symbol, logo, etc. (Note: The creation of a Metadata account is optional, a token can operate without the metadata account)

After the mint account is created, the authority of the token can mint the supply. To hold the new created tokens, another type of account is needed i.e. _Token Account_. Let’s say, the authority has minted 100 units of Token X to Mr. A’s address then Mr. A will need a token account to hold these units. 

Every token holder will need a token account. If we say that the Token X has 100 holders, it means that there are 100 different token accounts with active balance. Similarly, if we say that Mr. A holds 50 different tokens then he needs to have the 50 different token accounts with active balance. 

By the way, the term ‘active’ here means that the token account has a balance greater than zero. A token account remains on-chain even with a zero balance unless the owner of the token account decides to close it.  
  
The final account we will briefly mention is the associated token account. It is a token account that is mapped to the user’s address. It is managed by the Associated Token Program and one major advantage is that it is automatically created when a token is transferred to a user that does not have a token account for the token. More of this is discussed at the end.

**Now… let’s begin!**

We shall split this tutorial into _two parts_: one for creating a token using the spl-token CLI to introduce you to the spl-token program and understand how tokens work on Solana. The second part shall focus on understanding the token metadata program. We shall be creating a typescript script and using the umi library from Metaplex that includes the metadata.

**Creating a spl token using the spl-token CLI**

#### **Tools required**

- Rust and Cargo Installed
- Solana CLI installed
- Solana Program Library (SPL ) CLI

#### **Installation**

If you have been following the Local Development Environment setup, you’ll already have installed Rust, Cargo and Solana CLI, if not, it’s a bunch of simple commands, here is the [link](https://calyptus.co/lessons/setting-up-your-local-environment/).

Installing spl-token-cli is easy, just write the following command in the terminal.

- `cargo install spl-token-cli`

Once installed, you can check if everything is correctly done by running

- `spl-token --version`

![](https://lh3.googleusercontent.com/9k4gUdXor0Iwa0vOXoOdlF60QwhEeMsGvN5_EBjjO-7b4GCyXBbq9mOdQNJIXQEycn41Vkex-Qic7JHbkLXiTjSJYhsaIVmKN_W-io98H1RdP2sqg2-Ux8pNLg-_XmJemyWfaBuw8RAKa0KSzw12qyk)

**Setup**

We are deploying our token on the Devnet as of now, but the steps would be the exact same for deploying on Mainnet. All you need to do to change the network is to point to the right cluster.

The command for that is

- `solana config set --url mainnet-beta` ⇒ For interacting with the Mainnet
- `solana config set --url devnet` ⇒ For interacting with the Devnet

You can use the following command to know what cluster you are currently pointing to.

- `solana config get`

If you do not have any funds in your wallet on devnet, you can just airdrop them using

- `solana airdrop`

![](https://lh3.googleusercontent.com/gC4lyYkL31Lq-7ehlDDNxV-LQlF4hTaYonS9gvxXItHSjqW93nZ6-xFM7UAF64zbUlSHoi9L4QlZlc6_IsNtR4cikfW25l2zeUHF1C0Wprznnvzf_TjNSnSnCb0Zjh6W6wkzWmV4okYq8k2WM20JlxI)

If you do not enter the address it would airdrop it to the default keypair we made while setting up our local dev environment.

> solana config set --url devnet
> solana airdrop 1 2mcDUMsXbfzeiyr8cNd4XrTp2uwKySC6ujGmCVfBfQ3j --url devnet

> solana config set --url testnet
> solana airdrop 1 2mcDUMsXbfzeiyr8cNd4XrTp2uwKySC6ujGmCVfBfQ3j --url testnet

```
Requesting airdrop of 1 SOL

Signature: 5GrdBZuLU3FUqgxxpGo5pYCAc641uKSoj89meH5MsVe88B8RZkbhCQ2bpeqWzHnQJ6v8krSEBfyTMMMQMi7AYwPL

1 SOL
```
  
- [Solana Devnet | Explorer by Triangle](https://explorer.triangleplatform.com/solana/devnet)
- [Explorer | Solana](https://explorer.solana.com/?cluster=testnet)

#### **Create Token**

Now that we are set up with a wallet and some funds, let’s create our token. Run the following command.

- `spl-token create-token`

![](https://lh4.googleusercontent.com/FATYIyx4lHoLHkDZM3Gb8bneTEvxJIfDxLUUnK0LDWik2JNHm9Ican1wtm7yzdJYQmhNhM-gyxZtY4hvmo9fO_Dw5LGp_Oh8Z8zJXc2iCVAzpBXjc8gqo3XnEA32R9fp70Az4NWrY3kyARJNXBEwc1A)

It created a mint account for us with the following address, you would notice that by default it gave decimals 9. This is how many decimals your token can be broken into. Different tokens have different decimals depending upon the use case. You can set a custom one as well by adding a simple flag.

- `spl-token create-token --decimals`

![](https://lh3.googleusercontent.com/DPfddlt1h5jeOofNjLw_sNEK076l5C5jvEZTsHTemMV5q27nS_ZqgQwwaAgpTv4C5mZr_oC6Efia8J_Efgp_XWn1X1T2l2Y3RsKQJRdYI-KGRHdA1ysfR7F8P7c3iY9K_3pugNeXC9uNvVmz-A46hEQ)

You can always run –help flag with almost all the commands to know more about the extra options you get to play around with.

Let’s move forward, now to some interesting parts. As discussed previously, each wallet has separate token accounts under it to handle balances for each and every different SPL token. See below!

![](https://lh3.googleusercontent.com/STsg-vCa-hmIiXuV_UZg71fou6trz_f7rZ0_pndBBDbT8lqbGwC-PNcLSBw7SKLogzO42_YCQLdc02j_hbq5cqQJBtMo7OcBs2_FAPApXwAXusDMfoDR-P-s7JUoTVXVyytC-uqVe55XwYLtDANYmuk)

Each of the token accounts manage the balance of different tokens. This way the Accounts Model of Solana helps in processing parallel transactions.

So now that we have created a mint account, we would also need to create a token account for handling the balances for this token, right? So, let’s do it!

- `spl-token create-account <token-address>`

![](https://lh6.googleusercontent.com/JLbwbwx8OP8SRxelfQcr5TSCWOG6MO9AOdHhLqrLJ5aE1zaFOdpsazDMvkfEjECCv664Hoq1svgVTTgygYSKuw9_XHqIFdq0pxpYQs4sg_MI5mSwYXlln_xwtrIW5NlKP1m0XgLndt2sKH9vR6OdBKg)

Now we have a token account, let’s mint some tokens! Since, our wallet has initialized the mint account, we own the mint authority of the token. So, we can go on and run the following command which will create new tokens to our token account.

- `spl-token mint <token-address<amount-to-mint>`

![](https://lh6.googleusercontent.com/s-ksNRn5AXXVwExpWYRjYpoyODaZRbwqDRLtOY88LyK6MNet_M7FzR3NKhWFMVzBLeCmXzLLki9wYZhUH9E31wyPhdqFOgdUCZ47w0sN8NpogCqSobV8cXhBKbrQMx7mbEYZpHY_-QZEOGDgAGnIj14)

If we want to mint the new tokens to someone else’s account, we can provide the token account of the user in the above command as following:

- `spl-token mint <token-address<amount-to-mint<user-token-account>`

There are a bunch of more commands you can play with:

- `spl-token supply`

![](https://lh6.googleusercontent.com/I5Eaj2PRcUbHHxx2KgNJ3EtrX0nYbIt3oCH7qjlj7O1yGWBPGVM9vfzX2PHfwnSOSWCB4q2tE9nRii5UVRqfpc5bgugIhNTETF7FXC1I52_sVZkoiWA-FrrhMgAfjHBDpEIPv7Jb6oY2qReAKGn4Igw)

The above command gives us the supply of the token. In the overview, we discussed that the supply being one of the basic information of the token is saved in the mint account. So, we have to provide the mint account in the above command to get the current supply of our token.

You can view all the spl-token accounts under your wallet using the command

- `spl-token accounts`

![](https://lh6.googleusercontent.com/WkmQ-9ZEPkH7LjsXh3HKGaG7drwA6II8BHEv4G3mOex-vzyioicyZt8tIFyDFGans65mv6FhhVEAIF6RizF2ETjwFEGsepeqdjMQXaFOyywCs1E7hchPH3UYawCK0TWtQ3c-DfoAvzitgbAElODEIZo)

Okay enough chit-chat, let’s send out our newly minted token to our friends…

- `spl-token transfer <token-address<amount<recipient-address--allow-unfunded-recipient --fund-recipient`

![](https://lh4.googleusercontent.com/iuChoYavss_-NG43o1U5yUivF5UJLRBhO3YZWbi3251dWNqz4ApznfT118fI09SlDoPmLuQWuFSUer1wyk7viORuoZ3mZ9qJHl6xWry_KovfcZJxJJ45KD4QJh71DHVszel58y2ViOpk6WlNnYxRx6A)

#### **Awesome Work!**

See that we have added the flag –allow-unfunded-recipient to complete the transfer, and we are also adding the flag –fund-recipient because this is a new token and your friend won’t have an associated token account for your token account. 

The command will first create an associated token account for the recipient and then transfer the amount from the sender’s token account to the recipient’s associated token account.

Have you also noticed that we were using the term \`token account\` so far but now we have used the term \`associated token account\`? So, what does an associated token account or ATA mean? We touched upon this at the start of the tutorial, but let’s dig a little deeper…

#### **Associated Token Account (ATA)**

So far, you’ve got to grips with this crucial concept: a user needs a token account for every token they hold. But when we are sending a token to someone, we can’t be sure that the person has a token account for that particular token or whether we’ll have to create one for them…

To solve this issue, a standard way of deriving token accounts exists using the _Associated Token Program_. This program provides us with the standard way of deriving a token account for a user and such an account is known as an Associated Token Account or ATA.

ATA is in fact a program-derived-address (PDA) account. If you complete our: **Create Your First dApp** tutorial, we cover PDAs and all Anchor Theory. The seeds of an ATA’s PDA comprise the user’s address, the mint account’s address and the Associated Token Program’s address. Since we have all three variables available to us, we can easily derive the ATA address for any user and check if such an ATA exists or not. 

The transfer command we looked at in the last section does exactly this under the hood. First of all, it derives PDA using the given token address and recipient address. If such PDA exists on-chain then the recipient’s ATA exists so it sends the token to such ATA. If not, then it first creates an ATA for the recipient and then sends tokens to it.

### **\*Take a breather\*… it’s now time for Part 2**

### **Creating an spl token using the umi library**

For this section we will be working with Typescript, and UMI – _A Solana Framework for JavaScript clients._ 

Make sure that you have [typescript](https://www.typescriptlang.org/download), [ts-node](https://www.npmjs.com/package/ts-node) installed and your Solana env is set up properly.

Start off by creating an empty directory, initializing and setting up an empty TypeScript project.
```bash
    mkdir ts-token-solana  && cd ts-token-solana && npm init -y && tsc --init && mkdir src && touch src/main.ts
```

We are now ready to get started working on our src/main.ts file. We will be using the umi library to make the process of creating our token easier. It is a library from Metaplex, the same team that created the token metadata program, that enables us to quickly build and use TS clients for Solana programs such as the token metadata program.

Let’s go ahead and install the packages,

```bash
    npm install \
      @metaplex-foundation/umi \
      @metaplex-foundation/umi-bundle-defaults \
      @metaplex-foundation/mpl-token-metadata \
      @solana/web3.js \ 
      @types/node \
```

We shall be using your system wallet and thus let’s create a new touch src/helpers.ts that extracts your paper wallet keypair. 

Populate it with:

```javascript
    import { readFileSync } from 'fs';
    import { homedir } from 'os';
    import { Keypair } from '@solana/web3.js';
    
    const USER_KEYPAIR_PATH = homedir() + "/.config/solana/id.json";
    export const userKeypair = Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(USER_KEYPAIR_PATH, "utf-8")))
    );
```

Let’s import this function into our src/main.ts and instantiate a new instance of our umi client running on the devnet cluster. 

We will do this using the createUmi function from the default bundle package `@metaplex-foundation/umi-bundle-defaults`.

```javascript
    import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
    import { userKeypair } from "./helpers";
    
    const umi = createUmi('https://api.devnet.solana.com');
```

Next, we will register our keypair to be used as the default signer when making any and all transactions, using the use method. It is a method that will allow us to inject plugins to our umi instance such as programs, signers and payers for transactions. 

Let’s register our paper wallet keypair as the signer for all our transactions and register the `mplMetadataProgram` which we will be calling to create our token.You will notice that directly using the \``userKeypair`\` with the \``keypairIdentity`\` interface will result in an error. This is because umi’s public key interface is defined differently from the one that @solana/web3.js uses. The fix is quite easy as we only need to wrap our keypair around umi’s eddsa interface,

```javascript
    import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
    import { keypairIdentity } from "@metaplex-foundation/umi";
    import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
    import { userKeypair } from "./helpers";
    
    const umi = createUmi('https://api.devnet.solana.com');
    
    const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);
    
    umi.use(keypairIdentity(keypair))
        .use(mplTokenMetadata())
```

The minting process involves three steps:

1.  Uploading our asset metadata to an off-chain or centralised storage provider. We will not carry out this process and shall be using a URI we uploaded earlier.
2.  Creating the on-chain metadata account that will hold our asset data such as the off-chain URI, mint, symbol …
3.  Finally, we mint our token with the associated accounts.

Let’s start off with 1 and create the metadata account, for this, we shall be using the CreateV1 method.
```javascript
    const metadata = {
        name: "Solana Gold",
        symbol: "GOLDSOL",
        uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
    };
    
    const mint = generateSigner(umi);
    async function createMetadataDetails() {
        await createV1(umi, {
            mint,
            authority: umi.identity,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            sellerFeeBasisPoints: percentAmount(0),
            decimals: 9,
            tokenStandard: TokenStandard.Fungible,
        }).sendAndConfirm(umi)
    }
```

Using the CreateV1 method we here define the metadata and behaviour of our token such as the number of decimals… 

Because CreateV1 is a generic function that can also be used to create a token that’s Non-Fungible, we use the tokenStandard field to declare our token as Fungible.

It’s worth also noting that if the Mint account does not exist, it will be automatically created for us. If you pass a mint account that exists, then this function is able to determine the type of token(tokenStandard) and thus you can omit the field if you already have a mint account already initialized. To finish off our build, We will need to call the instruction to mint our tokens using the Mintv1 function.
```javascript
    async function mintToken() {
        await mintV1(umi, {
            mint: mint.publicKey,
            authority: umi.identity,
            amount: 10_000,
            tokenOwner: umi.identity.publicKey,
            tokenStandard: TokenStandard.Fungible,
        }).sendAndConfirm(umi)
    }
```

To make the process of creating tokens easier, umi also provides methods that abstract creating tokens into a two-step process and into one function. Using the createFungible method, we are able to easily reduce the number of functions we are writing.

```javascript
    createFungible(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
    }).sendAndConfirm(umi);
```

We will use this method to make the process easier.

Let’s go ahead and call our TS script using ts-node.

```bash
    ts-node main.ts
```
And Boom, you’ve created your token with metadata on Solana!

**Congratulations!**

Well done for officially minting, and transferring your first token to your friends! We hope you’ve enjoyed learning about tokens and token accounts in Solana. We’ve only just scratched the surface so see you for another project very soon.

Now you’ve completed the tutorial we encourage you to contribute to this tutorial’s repository. Did you find an error? Have an idea to enhance the content? Want to share additional resources or examples? Your contributions are valuable, and they’ll help improve this tutorial for others.

**What’s Next?**

- **Submit Pull Requests:** If you have improvements or fixes, please submit a pull request. We welcome your contributions and feedback.
- **Share Your Fork:** We’d love to see how many people are using this tutorial. Please share the link to your forked repository below and on your social media or in developer networks. It’s a great way to show your support and encourage others to learn Solana as well. 
- **Important Note:** Make sure that the repository visibility is set to public. Private forked repositories may result in a 404 error, and we won’t be able to register your completion. Thank you!
- **Earn Your Trophy:** At the end of the month, we will send you an NFT certificate to your Solana wallet address proving you’ve completed the tutorial. Just put in your Solana wallet address below.

**Extra resources:** 

If you want to see how far this rabbit hole goes, check out the Solana Program Library Docs below! Discover how to: wrap sol around your token, mint with multisig authority, sign offline with multisig authority, freeze accounts from transferring your token and much, much more!

[https://spl.solana.com/token#example-wrapping-sol-in-a-token](https://spl.solana.com/token#example-wrapping-sol-in-a-token)

[https://spl.solana.com/token#example-mint-with-multisig-authority](https://spl.solana.com/token#example-mint-with-multisig-authority)