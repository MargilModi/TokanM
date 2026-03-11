const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokanM", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  const INITIAL_SUPPLY = ethers.parseEther("1000000"); // 1,000,000 TM

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const TokanM = await ethers.getContractFactory("TokanM");
    token = await TokanM.deploy(owner.address);
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      expect(await token.name()).to.equal("TokanM Token");
      expect(await token.symbol()).to.equal("TM");
    });

    it("Should have 18 decimals", async function () {
      expect(await token.decimals()).to.equal(18);
    });

    it("Should mint the full initial supply to the owner", async function () {
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("Should set the correct owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.parseEther("100");
      await token.transfer(addr1.address, amount);
      expect(await token.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const amount = ethers.parseEther("100");
      await expect(
        token.connect(addr1).transfer(addr2.address, amount)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });

    it("Should update balances after transfers", async function () {
      const amount = ethers.parseEther("500");
      await token.transfer(addr1.address, amount);
      await token.connect(addr1).transfer(addr2.address, ethers.parseEther("200"));

      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("300"));
      expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseEther("200"));
    });
  });

  describe("Allowances", function () {
    it("Should approve and transferFrom tokens", async function () {
      const amount = ethers.parseEther("250");
      await token.approve(addr1.address, amount);
      await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should fail transferFrom if allowance is exceeded", async function () {
      const amount = ethers.parseEther("100");
      await token.approve(addr1.address, amount);
      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseEther("200"))
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
    });
  });
});
