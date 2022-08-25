const { expect } = require("chai");

describe("Migrations contract", () => {

    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const [owner] = await ethers.getSigners();

        const Migrations = await ethers.getContractFactory("Migrations");

        const contract = await Migrations.deploy();

        const last_completed_migration = 100;

        expect(await contract.last_completed_migration()).to.equal(0);

        await contract.setCompleted(last_completed_migration);
        
        expect(await contract.last_completed_migration()).to.equal(last_completed_migration);
    });

});