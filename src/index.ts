import Web3 from 'web3'

class EtherTools {
  private web3: Web3

  constructor(providerUrl: string) {
    this.web3 = new Web3(providerUrl)
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.web3.eth.getBalance(address)
    return this.web3.utils.fromWei(balance, 'ether')
  }

  async sendEther(senderPrivateKey: string, receiverAddress: string, amount: string): Promise<string> {
    const transaction = {
      to: receiverAddress,
      value: this.web3.utils.toWei(amount, 'ether'),
    }

    const account = this.web3.eth.accounts.privateKeyToAccount(senderPrivateKey)
    const signedTransaction = await account.signTransaction(transaction)
    const receipt = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction as string)

    return receipt.transactionHash.toString()
  }
}

export default EtherTools
