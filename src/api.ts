import {
  SigningCosmosClient,
  CosmosClient,
  Secp256k1HdWallet,
  coins,
} from '@cosmjs/launchpad';

const httpUrl = 'http://localhost:1317';

export const registerTransaction = async (
  mnemonic: string,
  senderAddress: string,
  recipientAddress: string,
  transferAmount: number
) => {
  try {
    const convertedTransferAmount = coins(transferAmount, 'ucosm');
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);

    const client = new SigningCosmosClient(httpUrl, senderAddress, wallet);

    const result = await client.sendTokens(
      recipientAddress,
      convertedTransferAmount
    );

    return { error: false, result: result.transactionHash };
  } catch (err) {
    console.log(err.message);
    return { error: true, result: err.message };
  }
};

export const findTransaction = async () => {
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
