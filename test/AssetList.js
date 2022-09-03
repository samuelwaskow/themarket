const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("AssetList Contract", () => {

    async function deployContractFixture() {

        const AssetList = await ethers.getContractFactory("AssetList");

        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await AssetList.deploy();

        await contract.deployed();

        return { contract, owner, addr1, addr2 };
    }

    it("assigns to the list of assets", async () => {

        const { contract, owner } = await loadFixture(deployContractFixture);

        await contract.createAsset(owner.address, "WINBF", "Bovespa Index-mini Futures", 100, 10);
        
        expect(await contract.assetCount()).to.equal(1);
    });

});