const { expect } = require("chai");

describe("Token contract", () => {

    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const contract = await Token.deploy();

        const ownerBalance = await contract.balanceOf(owner.address);
        
        expect(await contract.totalSupply()).to.equal(ownerBalance);
    });

});