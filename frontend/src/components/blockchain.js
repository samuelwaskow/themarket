
/**
 * This is the Hardhat Network id that we set in our hardhat.config.js.
 * Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
 * to use when deploying to other networks.
 */
const HARDHAT_NETWORK_ID = '1337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;


/**
 * This method checks if Metamask selected network is Localhost:8545 
 * @returns Connection flag
 */
export function checkNetwork() {
    return window.ethereum.networkVersion === HARDHAT_NETWORK_ID;
}