const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokanM", function () {
  let tokanM;
  let owner;
  let addr1;
  let addr2;

  const INITIAL_SUPPLY = ethers.parseUnits("1000000", 18);

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const TokanM = await ethers.getContractFactory("TokanM");
    tokanM = await TokanM.deploy();
  });

  describe("Deployment", function () {
    it("Should set the correct token name and symbol", async function () {
      expect(await tokanM.name()).to.equal("TokanM Token");
      expect(await tokanM.symbol()).to.equal("TM");
    });

    it("Should set decimals to 18", async function () {
      expect(await tokanM.decimals()).to.equal(18);
    });

    it("Should mint the total supply to the owner", async function () {
      expect(await tokanM.totalSupply()).to.equal(INITIAL_SUPPLY);
      expect(await tokanM.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("Should set the correct owner", async function () {
      expect(await tokanM.owner()).to.equal(owner.address);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.parseUnits("100", 18);
      await tokanM.transfer(addr1.address, amount);
      expect(await tokanM.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should fail when sender has insufficient balance", async function () {
      const amount = ethers.parseUnits("100", 18);
      await expect(
        tokanM.connect(addr1).transfer(addr2.address, amount)
      ).to.be.revertedWithCustomError(tokanM, "ERC20InsufficientBalance");
    });

    it("Should update balances after transfer", async function () {
      const amount = ethers.parseUnits("500", 18);
      await tokanM.transfer(addr1.address, amount);
      const ownerBalance = await tokanM.balanceOf(owner.address);
      expect(ownerBalance).to.equal(INITIAL_SUPPLY - amount);
    });
  });

  describe("Allowances", function () {
    it("Should approve tokens for spending", async function () {
      const amount = ethers.parseUnits("200", 18);
      await tokanM.approve(addr1.address, amount);
      expect(await tokanM.allowance(owner.address, addr1.address)).to.equal(amount);
    });

    it("Should transfer tokens using transferFrom", async function () {
      const amount = ethers.parseUnits("200", 18);
      await tokanM.approve(addr1.address, amount);
      await tokanM.connect(addr1).transferFrom(owner.address, addr2.address, amount);
      expect(await tokanM.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should fail transferFrom when allowance is insufficient", async function () {
      const amount = ethers.parseUnits("200", 18);
      await expect(
        tokanM.connect(addr1).transferFrom(owner.address, addr2.address, amount)
      ).to.be.revertedWithCustomError(tokanM, "ERC20InsufficientAllowance");
    });
  });
});
