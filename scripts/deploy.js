const hre = require("hardhat");

async function main() {
    // Lấy contract factory
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    // Deploy contract với tham số constructor
    const nftMarketplace = await NFTMarketplace.deploy();
    // Đợi contract được triển khai thành công
    await nftMarketplace.deployed();



    //Transferfunds
    const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
    const transferFunds = await TransferFunds.deploy();
    await transferFunds.deployed();

    // In ra địa chỉ contract đã deploy
    console.log(`Deployed contract Address: ${nftMarketplace.address}`);
    console.log(`Deployed contract Address: ${transferFunds.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
