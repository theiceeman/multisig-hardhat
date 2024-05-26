const { expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { assert } = require("console");


describe('MultiSigWallet', () => {
    let wallet;
    let MultiSigWallet;
    let accounts;

    before(async () => {
        accounts = await ethers.getSigners();
        MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        // console.log({accounts})
        wallet = await MultiSigWallet.deploy([accounts[0].address, accounts[1].address, accounts[2].address], 2);
        console.log("wallet deployed to:", wallet.target);
        // console.log({wallet});return;
        await web3.eth.sendTransaction({ from: accounts[0].address, to: wallet.address, value: 1000 });
    });

    it('should have correct approvers and quorum', async () => {
        // store approvers / qorum

        console.log({wallet})
        const approvers = await wallet.getApprovers();
        const quorum = await wallet.quorum();
        // check accounts 
        assert(approvers.length === 3);
        assert(approvers[0] === accounts[0].address);
        assert(approvers[1] === accounts[1].address);
        assert(approvers[2] === accounts[2].address);
        assert(Number(quorum) === 2);
    });
    // test createTransfer
    it('should created transfer', async () => {
        await wallet.connect(accounts[0]).createTransfer(100, accounts[2].address);
        const transfers = await wallet.getTransfers();

        // there should be one transacation in the transactions array 
        assert(transfers.length === 1);
        // is the id of the first transaction === 0
        assert(Number(transfers[0].id) === 0);
        // is the transfer ammount 1000? 
        assert(Number(transfers[0].amount) === 100);
        // is the transfer from account 0 - account 5 actually real?
        assert(transfers[0].to === accounts[2].address);
        // is the transfers approval count 0?
        assert(Number(transfers[0].approvals) === 0);
        // has the transfer been sent before ?
        assert(transfers[0].sent === false);

    });

    /* it('should NOT transfer an amount of money for a non-approved ', async () => {
        await expectRevert(
            wallet.createTransfer(100, accounts[5], { from: accounts[4] }),
            'only approver allowed'
        );
    }); */

    // // approve transfer - happy path 1
    /* it('should increment appr0vals', async () => {
        await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
        await wallet.approveTransfer(0, { from: accounts[0] });
        // created constants
        const transfers = await wallet.getTransfers();
        const balance = await web3.eth.getBalance(wallet.address);
        // assert constants 
        assert(transfers[0].approvals === '1');
        assert(transfers[0].sent === false);
        assert(balance === '1000');
    }); */

    // // approve transfer - happy path 2
    it('should approve & send transfer, if quorum reached', async () => {
        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[6].address));
        await wallet.connect(accounts[0]).createTransfer(100, accounts[0].address);
        // two account approvals
        await wallet.connect(accounts[0]).approveTransfer(1);
        await wallet.connect(accounts[1]).approveTransfer(1);
        // check if tbe new balance for account 6 recieved the 100 tokens
        // const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
        // assert(balanceAfter.sub(balanceBefore).toNumber() === 100);

    });

    // Unhappy Path 
    /*  it('should NOT approve transfer if sender is not approved ', async () => {
         await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
         await expectRevert(
             wallet.approveTransfer(0, { from: accounts[4] }),
             'only approver allowed'
         );
     });
 
     it('should NOT approve transfer if sender is already sent', async () => {
         await wallet.createTransfer(100, accounts[6], { from: accounts[0] });
         // two account approvals
         await wallet.approveTransfer(0, { from: accounts[0] });
         await wallet.approveTransfer(0, { from: accounts[1] });
         await expectRevert(
             wallet.approveTransfer(0, { from: accounts[2] }),
             'Transfer has already been sent'
         );
     });
 
 
     it('should NOT approve transfer twice', async () => {
         await wallet.createTransfer(100, accounts[6], { from: accounts[0] });
         await wallet.approveTransfer(0, { from: accounts[0] });
         await expectRevert(
             wallet.approveTransfer(0, { from: accounts[0] }),
             'cannot approve transfer twice'
         );
     }); */

});