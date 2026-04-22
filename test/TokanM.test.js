const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokanM", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  const INITIAL_SUPPLY = ethers.utils.parseUnits("1000000", 18);

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const TokanM = await ethers.getContractFactory("TokanM");
    token = await TokanM.deploy();
    await token.deployed();
  });

  describe("Deployment", function () {
    it("sets the correct token name and symbol", async function () {
      expect(await token.name()).to.equal("TokanM Token");
      expect(await token.symbol()).to.equal("TM");
    });

    it("mints the initial supply to the deployer", async function () {
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("sets the deployer as owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Transfers", function () {
    it("transfers tokens between accounts", async function () {
      const amount = ethers.utils.parseUnits("100", 18);

      await token.transfer(addr1.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(amount);
      expect(await token.balanceOf(owner.address)).to.equal(
        INITIAL_SUPPLY.sub(amount)
      );
    });

    it("reverts when sender has insufficient balance", async function () {
      const amount = ethers.utils.parseUnits("1", 18);

      await expect(
        token.connect(addr1).transfer(addr2.address, amount)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("updates balances correctly after multiple transfers", async function () {
      const amount = ethers.utils.parseUnits("50", 18);

      await token.transfer(addr1.address, amount);
      await token.connect(addr1).transfer(addr2.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(0);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });
  });

  describe("Pause / Unpause", function () {
    it("allows only owner to pause", async function () {
      await expect(token.connect(addr1).pause()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("blocks transfers while paused", async function () {
      const amount = ethers.utils.parseUnits("10", 18);

      await token.pause();

      await expect(
        token.transfer(addr1.address, amount)
      ).to.be.revertedWith("ERC20Pausable: token transfer while paused");
    });

    it("allows transfers again after unpause", async function () {
      const amount = ethers.utils.parseUnits("10", 18);

      await token.pause();
      await token.unpause();
      await token.transfer(addr1.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(amount);
    });
  });

  describe("Burning", function () {
    it("allows token holders to burn their own tokens", async function () {
      const burnAmount = ethers.utils.parseUnits("100", 18);

      await token.burn(burnAmount);

      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY.sub(burnAmount));
      expect(await token.balanceOf(owner.address)).to.equal(
        INITIAL_SUPPLY.sub(burnAmount)
      );
    });
  });

  describe("Minting", function () {
    it("allows only owner to mint", async function () {
      const mintAmount = ethers.utils.parseUnits("500", 18);

      await token.mint(addr1.address, mintAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
      expect(await token.totalSupply()).to.equal(
        INITIAL_SUPPLY.add(mintAmount)
      );
    });

    it("reverts when non-owner tries to mint", async function () {
      const mintAmount = ethers.utils.parseUnits("500", 18);

      await expect(
        token.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});