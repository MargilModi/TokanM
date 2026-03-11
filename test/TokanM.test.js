const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokanM", function () {
  let tokanM;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const TokanM = await ethers.getContractFactory("TokanM");
    tokanM = await TokanM.deploy();
    await tokanM.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct token name and symbol", async function () {
      expect(await tokanM.name()).to.equal("TokanM Token");
      expect(await tokanM.symbol()).to.equal("TM");
    });

    it("Should mint the total supply to the owner", async function () {
      const totalSupply = await tokanM.totalSupply();
      expect(await tokanM.balanceOf(owner.address)).to.equal(totalSupply);
    });

    it("Should have an initial supply of 1,000,000 TM", async function () {
      const expected = ethers.utils.parseUnits("1000000", 18);
      expect(await tokanM.totalSupply()).to.equal(expected);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.utils.parseUnits("100", 18);
      await tokanM.transfer(addr1.address, amount);
      expect(await tokanM.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const amount = ethers.utils.parseUnits("1", 18);
      await expect(
        tokanM.connect(addr1).transfer(addr2.address, amount)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("Should update balances after transfers", async function () {
      const amount = ethers.utils.parseUnits("50", 18);
      const initialOwnerBalance = await tokanM.balanceOf(owner.address);

      await tokanM.transfer(addr1.address, amount);
      await tokanM.connect(addr1).transfer(addr2.address, amount);

      expect(await tokanM.balanceOf(owner.address)).to.equal(
        initialOwnerBalance.sub(amount)
      );
      expect(await tokanM.balanceOf(addr1.address)).to.equal(0);
      expect(await tokanM.balanceOf(addr2.address)).to.equal(amount);
    });
  });
});
