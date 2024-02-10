[Setting Up Your Local Environment - Calyptus](https://calyptus.co/lessons/setting-up-your-local-environment/)

# Setting Up Your Local Environment

##### October 10, 2023

Okay, let’s set up your computer so you’re ready to start interacting with Solana!

(And by the way, // Installation Commands are in drag down)

Let’s do it.

#### **Rust and Cargo**

Installation command

**Linux and MacOS can just use this Command:**

curl https://sh.rustup.rs -sSf | sh

**For Windows users:**

You will need to install WSL [here](https://learn.microsoft.com/en-us/windows/wsl/install) as Anchor currently doesn’t support Windows. 

After installing WSL, go forward to install the other software listed below. 

Install Rust via downloading and running rustup-init.exe

Downloading Link: [https://win.rustup.rs/](https://win.rustup.rs/)

Then reopen your terminal, and everything should be good to go.

You can check once it’s done by using the following commands:

- `rustc --version`
- `cargo --version`

![](https://lh6.googleusercontent.com/V9iF3oomkFUhKp1h8Bt8_Zk7GXRimcKF983gvE5EfcbYSFXvTIMIJcGq1gYxN_auy6hDRrs0BSrG7fxcwSVF7htPD1wv1duK0q8GV5aaE61Qs_GU4sv9To6REPQHV9pS-VsjQbi9aX4WZ9aIiBefcSU)

Official Rust Docs: [https://doc.rust-lang.org/cargo/getting-started/installation.html](https://doc.rust-lang.org/cargo/getting-started/installation.html)

**Solana CLI**

For Mac OS and Linux

`sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`

You can replace the term “stable” with a particular version like v1.15.2 or also use symbolic channel names such as “beta” and “edge”

![](https://lh4.googleusercontent.com/v_JkXaKy3BHTPCjHNA37MKaYQWl1jSCoPLcjkurSA7GD3w3vJ_t_YbO8RNlEVsW9Y28Uz7tMsAkAr2gySgmBrIHwHqyu9aXAl1adtkP6ejmdaUH8GraGvXRBeMJFe6U7gfGXYmgRtLo2redBaBYAQB4)

Either run the “export” command as shown or restart the terminal Run “\`solana –version“\` to check if everything is correctly installed

![](https://lh5.googleusercontent.com/K_dJm1gMCicrfesuCkQ-92zAHRq_q5ypBNw7BPECdHeWKvr3SFu9_WRAt0I7FdUdoAihDL_-gHX0tvO6WNnhHD3vIJpVEcFvHfi9QaE5Fs9oGLf4Jn2TAjRKAkWlx6_AURHfxySic5xpjvpu5O9_8qc)

Check if Solana keygen is running correctly using:

- `solana-keygen --version`

![](https://lh4.googleusercontent.com/E1SswbNOiLB5pjZRuMs1rNvj2UFsL-XhhpqXIPoE7ihFC1FSF9Gcaw83kNqrxO7eCoJw-axcvMgctzUPVjl7JNVA5wSlaqy0aB2NsfbQ34hTseWwhzqWKaWthYAb-QqBRnx4WY5jwTQfucwHbItQrN8)

Next, make your first wallet using:

- `solana-keygen new`

This will create your wallet and give you a seed phrase etc. The private keys get stored locally on your machine.

You can add a passphrase which would be an extra layer of security to the seed phrase.

![](https://lh3.googleusercontent.com/laO_hL9wLqzpV_BQSVSX7Leo6ZE1e84pCE0mTlyMeRTm7ZOaQ-BePjkRTuT5mBo04Mfo0ASYHLTCanbHC1u133n0YCoWG8uEeLcPK1BOFb2s0qCaABHf0UF1Wp5J9hTglhnj3B4ESXj7whXdHHg1Wlk)

You can access the location of the keypair using:

- `solana config get`

![](https://lh4.googleusercontent.com/yFgjnQbzae-jHVLNXRWRAgHIWfnbC4jCZU-2cF0CJUj26kbyEh3xL2MAdzP3pXdtfmmjbZDULqsfIEdb-438aPA-kPLhLBcb8EPmODGAIX75aVph1an6iL7eM2kY-moRikS6K_PR-N8vb2jNgs0NZKA)

The keypair path is displayed here, it also showcases which network you are currently pointing to. Network options are mainnet-beta, testnet and devnet.

You can change your network very easily using the command

- `solana config set --url mainnet-beta`

Instead of mainnet-beta, you can replace it with devnet and testnet. This will use the general RPC URL which is public.

![](https://lh6.googleusercontent.com/cBcWA5FTrWYdckdUTqMUUfgSxcWuorCQrmntw3G1GZAxDPglw_IrePKOJuv4lCKQ-aVvVMh-kEGtXLSVtp170UBCxp8eN1v0CjQriSidzvpv740984jGuG4suqApPzBaHP1VmqNx2LkJnOwI7juqHgA)

You can also use a custom RPC URL of your choice using the same command

- `solana config set --url`

_Fun Fact: You can create a wallet starting or ending with particular letters. Lots of protocols do it for adding that fancy rizz._

The command to do it is:

`solana-keygen grind --starts-with:`

You can play a lot with creating a custom wallet, use `solana-keygen grind --help` to explore more options

![](https://lh6.googleusercontent.com/CxiLTV9hLAisu5ZaY3BgE9R-eXcYihzkV2yWAPu_rgCWCALljbvgjuzZGuXEKIKgx74j3TTxZBoYtwdlmDPwt3rSjzzvqaeGp6VyLNYXG25pDd9sLh74djovtXZJm6DfydY1zwuso16Wf8okJWI-h0s)

Command to get funds on Devnet:

- `solana airdrop`

![](https://lh4.googleusercontent.com/VXxVU2OpZ9k-QeCDG2BO-Me1RsEycYcaYzInZbcB81e8FtwRcngtLPbKnu8BnfHfADMOYMaji6jfbpwy1TlpUdDv8nhOh7MGSjyHlOolkhKrTyzSkBkK7eFqOea1n9AKfHF34t6tuCXqRwJmIPBNlZY)

Funds go to your default wallet if no address is provided.

(Try requesting an airdrop on mainnet-beta 😉)

**Wallets**

There are lots of Wallets and as we would be using Solana Wallet Adapter in building stuff, you can choose the one you like. 

Our favourite Wallets are: 

- [https://www.backpack.app/](https://www.backpack.app/)
- [https://phantom.app/](https://phantom.app/) 

Some more popular Wallets are: 

- [https://glow.app/](https://glow.app/) 
- [https://solflare.com/](https://solflare.com/)

Each wallet has a Chrome extension and mobile app (Backpack Mobile app is not out whilst this is written). Each Wallet setup should be fairly simple:

Download → Setup your seed phrase, Store it somewhere safe → Change networks to devnet → Airdrop some funds to your address.

You can import the wallet you generated in your CLI in your Chrome extension wallet. Just import the private key from your local storage in the extension wallet.

#### **Anchor**

Anchor is a massive framework used to write safe, secure, and high-level programs on Solana. We recommend starting the curriculum at: **Create Your First Token**. However, if you choose to jump in at any other Basic Tutorial like **Create Your First dApp**, this setup will be necessary to get you going.

Install AVM ( recommended method )

- `cargo install --git https://github.com/coral-xyz/anchor avm --locked --force`

Use AVM to manage Anchor versions

- `avm install latest`
- `avm use latest`

Docs get updated regularly, so the commands above might fail in future.

Refer to the docs here [https://www.anchor-lang.com/docs/installation](https://www.anchor-lang.com/docs/installation)

We also have Remix of Solana for deploying stuff from your Web IDE itself: [https://beta.solpg.io/](https://beta.solpg.io/)


**Awesome!**

You’re now all setup and ready to go for building your first smart contract. If you are new to Rust development, there is just one last lesson to go to make sure you’re fully briefed on how to get BUIDL-ing. If you’re not, then you can jump into your first tutorial (we recommend: Create Your First Token). Catch you in **Introduction to Rust** or at your first build!