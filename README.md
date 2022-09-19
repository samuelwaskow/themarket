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

![Orders flow](https://user-images.githubusercontent.com/350404/191040507-97db8a6d-156b-410c-8c9a-34697e99b7df.jpg)

## The Application

### Connect Your Wallet

![TheMarket1](https://user-images.githubusercontent.com/350404/191079237-4d3d6387-2afa-4821-96a2-395bf9a9bc4d.png)

### List Of Assets

![TheMarket2](https://user-images.githubusercontent.com/350404/191079348-73c25844-a649-4eba-9886-173c2da7c8e8.png)

### List Of Orders

![TheMarket3](https://user-images.githubusercontent.com/350404/191079648-60617b8e-101e-4b42-b41e-63235782cfd1.png)

### Adding a new Order

![TheMarket4](https://user-images.githubusercontent.com/350404/191079501-b88f3e61-bea4-429c-93ab-3dfeb46f278f.png)

### Confirming the transaction order on Metamask

![TheMarket5](https://user-images.githubusercontent.com/350404/191079806-3d6b584b-31de-4a07-a732-bb5c2224e860.png)

### New order added to the list

![TheMarket6](https://user-images.githubusercontent.com/350404/191079968-b5889d70-d88c-47ca-85bd-05a4756363f5.png)

### If the order already existed on the book, move it to the Trades list

![TheMarket7](https://user-images.githubusercontent.com/350404/191080082-55534108-27b8-49fc-a462-2a07a8f45dd6.png)


