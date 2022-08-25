const { expect } = require("chai");

describe("AssetList contract", () => {

    it("New asset should assigned to the list of assets", async () => {
        const [owner] = await ethers.getSigners();

        const AssetList = await ethers.getContractFactory("AssetList");

        const contract = await AssetList.deploy();

        await contract.createAsset(owner.address, "WIN", "Bovespa Index-mini Futures", 100, 10);
        
        expect(await contract.assetCount()).to.equal(1);
    });

});