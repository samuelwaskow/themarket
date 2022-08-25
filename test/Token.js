const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", () => {


    async function deployContractFixture() {

        const Token = await ethers.getContractFactory("Token");

        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await Token.deploy();

        await contract.deployed();

        return { contract, owner, addr1, addr2 };
    }

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {

        it("Should set the right owner", async () => {

            const { contract, owner } = await loadFixture(deployContractFixture);
            expect(await contract.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async () => {
            const { contract, owner } = await loadFixture(deployContractFixture);
            const ownerBalance = await contract.balanceOf(owner.address);
            expect(await contract.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {

        it("Should transfer tokens between accounts", async () => {

            const { contract, owner, addr1, addr2 } = await loadFixture(deployContractFixture);

            // Transfer 50 tokens from owner to addr1
            await contract.transfer(addr1.address, 50);
            expect(await contract.balanceOf(addr1.address)).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            await contract.connect(addr1).transfer(addr2.address, 50);
            expect(await contract.balanceOf(addr2.address)).to.equal(50);
            expect(await contract.balanceOf(addr1.address)).to.equal(0);
        });

        it("should emit Transfer events", async function () {
            const { contract, owner, addr1, addr2 } = await loadFixture(deployContractFixture);

            // Transfer 50 tokens from owner to addr1
            await expect(contract.transfer(addr1.address, 50))
                .to.emit(contract, "Transfer")
                .withArgs(owner.address, addr1.address, 50);

            // Transfer 50 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await expect(contract.connect(addr1).transfer(addr2.address, 50))
                .to.emit(contract, "Transfer")
                .withArgs(addr1.address, addr2.address, 50);
        });

        it("Should fail if sender doesn't have enough tokens", async function () {
            const { contract, owner, addr1 } = await loadFixture(
                deployContractFixture
            );
            const initialOwnerBalance = await contract.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                contract.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("Not enough tokens");

            // Owner balance shouldn't have changed.
            expect(await contract.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

    });

});