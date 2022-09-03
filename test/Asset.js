const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Asset Contract", () => {

    let ipoAmount;
    let currentPrice;

    /**
     * Fixture
     */
    async function deployContractFixture() {

        const Asset = await ethers.getContractFactory("Asset");

        const [owner, addr1, addr2] = await ethers.getSigners();

        ipoAmount = 1000;
        currentPrice = 10;

        const contract = await Asset.deploy(ipoAmount, currentPrice);

        await contract.deployed();

        return { contract, owner, addr1, addr2 };
    }

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {

        it("verifies the default token values", async () => {
            const { contract, owner } = await loadFixture(deployContractFixture);
            expect(await contract.totalSupply()).to.equal(ipoAmount); 
            expect(await contract.lastPrice()).to.equal(currentPrice); 
            expect(await contract.decimals()).to.equal(18);
        });
    });

    describe("Transactions", function () {

        it("places an order", async () => {

            const { contract, owner, addr1, addr2 } = await loadFixture(deployContractFixture);

            // Place an ask and a bid offers
            await contract.placeOrder(addr1.address, 10, 90, true);
            await contract.placeOrder(addr2.address, 10, 100, true);
            await contract.placeOrder(addr1.address, 10, 110, false);
            await contract.placeOrder(addr2.address, 10, 120, false);

            expect(await contract.ordersLength()).to.equal(4);
            expect(await contract.tradesLength()).to.equal(0);

            await contract.placeOrder(addr1.address, 10, 100, false);

            expect(await contract.ordersLength()).to.equal(3);
            expect(await contract.tradesLength()).to.equal(1);
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