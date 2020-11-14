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

export const findTransaction = async (id: string) => {
  const client = new CosmosClient(httpUrl);
  const query = {
    id: id,
  };
  try {
    const result = await client.searchTx(query);
    // console.log(result);
    const {
      from_address,
      to_address,
      amount,
    } = result[0].tx.value.msg[0].value;
    const details = { from_address, to_address, amount: amount[0] };
    return { error: false, result: details };
  } catch (err) {
    console.log(err);
    return { error: true, result: err.message };
  }
};
