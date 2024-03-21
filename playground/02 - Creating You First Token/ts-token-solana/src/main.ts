import { TokenStandard, createFungible, createV1, mintV1, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, keypairIdentity, percentAmount } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helpers";

const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
	.use(mplTokenMetadata())

const metadata = {
	name  : "Solana Gold",
	symbol: "GOLDSOL",
	uri   : "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
};

const mint = generateSigner(umi);


/*
Using the `CreateV1()` method we here define the metadata and behaviour of our token such as the number of decimals… 

Because `CreateV1()` is a generic function that can also be used to create a token that’s Non-Fungible,
we use the `tokenStandard` field to declare our token as Fungible.

It’s worth also noting that if the Mint account does not exist, it will be automatically created for us.

If you pass a mint account that exists, then this function is able to determine the type of token (`tokenStandard`) and thus you can omit the field if you already have a mint account already initialized.

*/
async function createMetadataDetails() {
	await createV1(umi, {
		mint,
		authority           : umi.identity,
		name                : metadata.name,
		symbol              : metadata.symbol,
		uri                 : metadata.uri,
		sellerFeeBasisPoints: percentAmount(0),
		decimals            : 9,
		tokenStandard       : TokenStandard.Fungible,
	}).sendAndConfirm(umi)
}


/*
To finish off our build, We will need to call the instruction to mint our tokens using the `Mintv1()` function.
*/
async function mintToken() {
	await mintV1(umi, {
		mint         : mint.publicKey,
		authority    : umi.identity,
		amount       : 10_000,
		tokenOwner   : umi.identity.publicKey,
		tokenStandard: TokenStandard.Fungible,
	}).sendAndConfirm(umi)
}


/*
To make the process of creating tokens easier, umi also provides methods that abstract creating tokens into a two-step process
and into one function. Using the `createFungible()` method, we are able to easily reduce the number of functions we are writing.
*/
async function asynCreateFungible() {
	createFungible(umi, {
		mint,
		authority           : umi.identity,
		name                : metadata.name,
		symbol              : metadata.symbol,
		uri                 : metadata.uri,
		sellerFeeBasisPoints: percentAmount(0),
		decimals            : 9,
	}).sendAndConfirm(umi);
}

createMetadataDetails()
	.then(()   => console.log('Success: Creating Metadata for Token'))
	.catch(err => console.error("Error: ", err))

mintToken()
	.then(()   => console.log("Success: Token minted"))
	.catch(err => console.error("error minting the tokens", err))

asynCreateFungible()
	.then(()   => console.log(`success: See https://explorer.solana.com/address/${mint.publicKey}?cluster=devnet`))
	.catch(err => console.error("error minting the tokens", err))

// https://explorer.solana.com/address/HCTrt5fxKVsUusjuXQHnafoWswbP6tqh6ubs46sKQQpZ?cluster=devnet	

