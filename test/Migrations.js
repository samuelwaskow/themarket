const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Migrations contract", () => {

    async function deployContractFixture() {

        const Migrations = await ethers.getContractFactory("Migrations");

        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await Migrations.deploy();

        await contract.deployed();

        return { contract, owner, addr1, addr2 };
    }

    it("Should update the last completed migration variable", async () => {

        const { contract, owner } = await loadFixture(deployContractFixture);

        const last_completed_migration = 100;

        expect(await contract.last_completed_migration()).to.equal(0);

        await contract.setCompleted(last_completed_migration);
        
        expect(await contract.last_completed_migration()).to.equal(last_completed_migration);
    });

});