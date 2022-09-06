
const path = require("path");
const fs = require("fs");
const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

/**
 * Main deployer
 */
async function main() {
    
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Exchange = await ethers.getContractFactory("Exchange");
    const exchange = await Exchange.deploy();
    await exchange.deployed();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    console.log("Exchange address:", exchange.address);
    console.log("Token address:", token.address);

    saveFrontendFiles(exchange, token);
}

/**
 * We also save the contract's artifacts and address in the frontend directory
 * @param {*} exchange 
 */
function saveFrontendFiles(exchange, token) {

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),
        JSON.stringify({ Exchange: exchange.address, Token: token.address }, undefined, 2)
    );

    const ExchangeArtifact = artifacts.readArtifactSync("Exchange");

    fs.writeFileSync(
        path.join(contractsDir, "Exchange.json"),
        JSON.stringify(ExchangeArtifact, null, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("Token");

    fs.writeFileSync(
        path.join(contractsDir, "Token.json"),
        JSON.stringify(TokenArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });