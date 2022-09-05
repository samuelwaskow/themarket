const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Asset Contract", () => {


    /**
     * Fixture
     */
    async function deployContractFixture() {

        const Exchange = await ethers.getContractFactory("Exchange");

        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await Exchange.deploy();

        await contract.deployed();

        return { contract, owner, addr1, addr2 };
    }

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {

        it("verifies the default token values", async () => {
            const { contract, owner } = await loadFixture(deployContractFixture);
            // expect(await contract.totalSupply()).to.equal(ipoAmount); 
            // expect(await contract.lastPrice()).to.equal(currentPrice); 
            // expect(await contract.decimals()).to.equal(18);
        });
    });

    describe("Transactions", function () {

        it("places an order", async () => {

            const { contract, owner, addr1, addr2 } = await loadFixture(deployContractFixture)

            let assetSymbol = "";
            // Invalid Symbol
            await  expect(contract.placeOrder(assetSymbol, addr1.address, 10, 90, true)).to.be.reverted

            assetSymbol = "WINFT"
            await contract.createAsset(owner.address, assetSymbol, "Ibovespa Index", 1, 1000)

            // Place an ask and a bid offers
            await contract.placeOrder(assetSymbol, addr1.address, 10, 90, true);
            await contract.placeOrder(assetSymbol, addr2.address, 10, 100, true);
            await contract.placeOrder(assetSymbol, addr1.address, 10, 110, false);
            await contract.placeOrder(assetSymbol, addr2.address, 10, 120, false);

            expect(await contract.ordersLength(assetSymbol)).to.equal(4);
            expect(await contract.tradesLength(assetSymbol)).to.equal(0);

            await contract.placeOrder(assetSymbol, addr1.address, 10, 100, false);

            expect(await contract.ordersLength(assetSymbol)).to.equal(3);
            expect(await contract.tradesLength(assetSymbol)).to.equal(1);
        });

    //     it("emits Transfer events", async function () {
    //         const { contract, owner, addr1, addr2 } = await loadFixture(deployContractFixture);

    //         // Transfer 50 tokens from owner to addr1
    //         await expect(contract.transfer(addr1.address, 50))
    //             .to.emit(contract, "Transfer")
    //             .withArgs(owner.address, addr1.address, 50);

    //         // Transfer 50 tokens from addr1 to addr2
    //         // We use .connect(signer) to send a transaction from another account
    //         await expect(contract.connect(addr1).transfer(addr2.address, 50))
    //             .to.emit(contract, "Transfer")
    //             .withArgs(addr1.address, addr2.address, 50);
    //     });

    //     it("fails if sender doesn't have enough tokens", async function () {
    //         const { contract, owner, addr1 } = await loadFixture(
    //             deployContractFixture
    //         );
    //         const initialOwnerBalance = await contract.balanceOf(owner.address);

    //         // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
    //         // `require` will evaluate false and revert the transaction.
    //         await expect(
    //             contract.connect(addr1).transfer(owner.address, 1)
    //         ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    //         // Owner balance shouldn't have changed.
    //         expect(await contract.balanceOf(owner.address)).to.equal(
    //             initialOwnerBalance
    //         );
    //     });

    });

});