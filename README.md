# Getting Started

This project is a Decentralized Asset Exchange.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/samuelwaskow/themarket.git
cd themarket
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npm run node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npm run deployedev
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## Trades Flow

The diagram below shows how the negotiation is done. Once the user selects an asset it wants to trade, it is able to put an order to the book. If there is already an order that opposes the order that the user wants to place, the trade happens and it goes to the list of trades. If there isn't, the order goes to the book.

![OrdersFlow](https://user-images.githubusercontent.com/350404/191040232-444f9093-f942-4fc2-b794-2203e3672a2f.png)
