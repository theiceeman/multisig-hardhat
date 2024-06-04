
const hre = require("hardhat");

async function main() {
    provider = hre.ethers.provider;
    const [deployer] = await ethers.getSigners();
    // console.log({deployer, user1, user2});return

    const RWAStakingNative = await ethers.getContractFactory("RWAStakingNative");
    const rwaStakingNative = await RWAStakingNative.deploy('27500000000000000000000');
    console.log({rwaStakingNative})
    console.log("rwaStakingNative deployed to:", rwaStakingNative.target);

    // const EventWise = await ethers.getContractFactory("EventWise");
    // const eventWise = await EventWise.deploy(WETH.address);
    // console.log("eventWise deployed to:", eventWise.address);


    /*   const Greeter = await hre.ethers.getContractFactory("Greeter");
      const greeter = await Greeter.deploy("Hello, Hardhat!");
    
      await greeter.deployed();
    
      console.log("Greeter deployed to:", greeter.address); */
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
