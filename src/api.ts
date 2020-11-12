import {
  SigningCosmosClient,
  CosmosClient,
  Secp256k1HdWallet,
  coins,
} from '@cosmjs/launchpad';

export const registerTransaction = async (
  mnemonic: string,
  senderAddress: string,
  recipientAddress: string,
  transferAmount: number
) => {
  const httpUrl = 'http://localhost:1317';
  try {
    // const senderAddress = 'cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6';
    // const recipientAddress = 'cosmos17yg9mssjenmc3jkqth6ulcwj9cxujrxxzezwta';
    const convertedTransferAmount = coins(transferAmount, 'ucosm');

    // const mnemonic =
    //   'economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone';
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);

    const client = new SigningCosmosClient(httpUrl, senderAddress, wallet);

    const result = await client.sendTokens(
      recipientAddress,
      convertedTransferAmount
    );

    console.log(result.transactionHash);
  } catch (err) {
    console.log(err);
  }
};

export const findTransaction = async () => {
  const httpUrl = 'http://localhost:1317';
  const client = new CosmosClient(httpUrl);
  const query = {
    id: 'F76F6DFE48743DD2120EE294647DDD81CFA75CF8C48E8841C65F9196B34EFD38',
  };
  const result = await client.searchTx(query);
  console.log(result);
  try {
    const result = await fetch(`${httpUrl}/txs?message.module=bank`);
    const data = await result.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
