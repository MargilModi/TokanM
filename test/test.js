const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokanM", function () {
  const INITIAL_SUPPLY = 1_000_000n;

  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const TokanM = await ethers.getContractFactory("TokanM");
    token = await TokanM.deploy(INITIAL_SUPPLY);
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should have correct name and symbol", async function () {
      expect(await token.name()).to.equal("TokanM Token");
      expect(await token.symbol()).to.equal("TM");
    });

    it("should have 18 decimals", async function () {
      expect(await token.decimals()).to.equal(18n);
    });

    it("should mint the initial supply to the owner", async function () {
      const decimals = await token.decimals();
      const expected = INITIAL_SUPPLY * 10n ** decimals;
      expect(await token.totalSupply()).to.equal(expected);
      expect(await token.balanceOf(owner.address)).to.equal(expected);
    });

    it("should set the deployer as owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Transfers", function () {
    it("should transfer tokens between accounts", async function () {
      const decimals = await token.decimals();
      const amount = 100n * 10n ** decimals;

      await token.transfer(addr1.address, amount);
      expect(await token.balanceOf(addr1.address)).to.equal(amount);
    });

    it("should fail when sender has insufficient balance", async function () {
      await expect(
        token.connect(addr1).transfer(addr2.address, 1n)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  describe("Minting", function () {
    it("should allow owner to mint tokens", async function () {
      const decimals = await token.decimals();
      const mintAmount = 500n;
      const mintAmountWei = mintAmount * 10n ** decimals;
      const supplyBefore = await token.totalSupply();

      await token.mint(addr1.address, mintAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(mintAmountWei);
      expect(await token.totalSupply()).to.equal(supplyBefore + mintAmountWei);
    });

    it("should revert when non-owner tries to mint", async function () {
      await expect(
        token.connect(addr1).mint(addr1.address, 100n)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });

  describe("Burning", function () {
    it("should allow token holders to burn their own tokens", async function () {
      const decimals = await token.decimals();
      const burnAmount = 1000n * 10n ** decimals;
      const supplyBefore = await token.totalSupply();

      await token.burn(burnAmount);

      expect(await token.totalSupply()).to.equal(supplyBefore - burnAmount);
      expect(await token.balanceOf(owner.address)).to.equal(
        supplyBefore - burnAmount
      );
    });
  });

  describe("Allowances", function () {
    it("should handle approvals and transferFrom correctly", async function () {
      const decimals = await token.decimals();
      const amount = 200n * 10n ** decimals;

      await token.approve(addr1.address, amount);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(amount);

      await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(0n);
    });
  });
});
