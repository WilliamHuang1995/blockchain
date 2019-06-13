const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "6d5ebd4f57e1c7c85796254b6993afedf4bcf440aaefd05ab008428ff789cedd"
);
const myWalletAddress = myKey.getPublic("hex");

let coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 69);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log("\nStarting the miner...");
coin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of xavier is",
  coin.getBalanceOfAddress(myWalletAddress)
);

coin.chain[1].transactions[0].amount = 1;
console.log("Is chain valid?", coin.isChainValid());
