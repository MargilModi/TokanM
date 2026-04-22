import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import artifact from "./abi/TokanM.json";
import "./styles.css";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const RPC_URL = "http://127.0.0.1:8545";
const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export default function App() {
  const [account, setAccount] = useState("");
  const [token, setToken] = useState(null);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [owner, setOwner] = useState("");
  const [totalSupply, setTotalSupply] = useState("0");
  const [balance, setBalance] = useState("0");
  const [paused, setPaused] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const [burnAmount, setBurnAmount] = useState("");

  const [mintTo, setMintTo] = useState("");
  const [mintAmount, setMintAmount] = useState("");

  const [status, setStatus] = useState("Click connect to load the local Hardhat account.");
  const [loading, setLoading] = useState(false);

  const abi = useMemo(() => artifact.abi || artifact, []);

  async function connectLocal() {
    try {
      setStatus("Connecting...");
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const signer = new ethers.Wallet(PRIVATE_KEY, provider);
      const address = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      setAccount(address);
      setToken(contract);
      setStatus("Connected successfully.");
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Connection failed.");
    }
  }

  async function loadData(contractArg = token, accountArg = account) {
    if (!contractArg || !accountArg) return;

    try {
      const [name, symbol, contractOwner, supply, userBalance, isPaused] =
        await Promise.all([
          contractArg.name(),
          contractArg.symbol(),
          contractArg.owner(),
          contractArg.totalSupply(),
          contractArg.balanceOf(accountArg),
          contractArg.paused(),
        ]);

      setTokenName(name);
      setTokenSymbol(symbol);
      setOwner(contractOwner);
      setTotalSupply(ethers.utils.formatUnits(supply, 18));
      setBalance(ethers.utils.formatUnits(userBalance, 18));
      setPaused(isPaused);
      setIsOwner(accountArg.toLowerCase() === contractOwner.toLowerCase());
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Failed to load contract data.");
    }
  }

  async function handleTransfer(e) {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      setStatus("Sending transfer...");
      const tx = await token.transfer(
        transferTo,
        ethers.utils.parseUnits(transferAmount, 18)
      );
      await tx.wait();

      setStatus("Transfer successful.");
      setTransferTo("");
      setTransferAmount("");
      await loadData();
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBurn(e) {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      setStatus("Burning tokens...");
      const tx = await token.burn(ethers.utils.parseUnits(burnAmount, 18));
      await tx.wait();

      setStatus("Burn successful.");
      setBurnAmount("");
      await loadData();
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Burn failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMint(e) {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      setStatus("Minting tokens...");
      const tx = await token.mint(
        mintTo,
        ethers.utils.parseUnits(mintAmount, 18)
      );
      await tx.wait();

      setStatus("Mint successful.");
      setMintTo("");
      setMintAmount("");
      await loadData();
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Mint failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePause() {
    if (!token) return;

    try {
      setLoading(true);
      setStatus("Pausing contract...");
      const tx = await token.pause();
      await tx.wait();

      setStatus("Contract paused.");
      await loadData();
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Pause failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnpause() {
    if (!token) return;

    try {
      setLoading(true);
      setStatus("Unpausing contract...");
      const tx = await token.unpause();
      await tx.wait();

      setStatus("Contract unpaused.");
      await loadData();
    } catch (error) {
      console.error(error);
      setStatus(error.reason || error.message || "Unpause failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && account) {
      loadData(token, account);
    }
  }, [token, account]);

  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <div className="hero-brand">
            <div className="token-logo">
              <span>TM</span>
            </div>
            <div>
              <h1>TokanM Dashboard</h1>
              <p className="subtitle">Smart Token Management Platform</p>
            </div>
          </div>
        </section>

        <div className="status-card card">
          <div className="status-panel">
            <div className="status-label">Live Status</div>
            <p className="status-line">
              <span className="status-dot"></span>
              {status}
            </p>

            <div className="connect-wrap">
              <button onClick={connectLocal} disabled={loading}>
                {account ? "Connected" : "Connect Local Account"}
              </button>
            </div>
          </div>

          <div className="account-panel">
            <div className="meta-list">
              <div className="meta-item">
                <strong>Account</strong>
                <span>{account || "-"}</span>
              </div>
              <div className="meta-item">
                <strong>Contract</strong>
                <span>{CONTRACT_ADDRESS}</span>
              </div>
              <div className="meta-item">
                <strong>Network</strong>
                <span>Hardhat Local</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="card token-overview">
            <div className="token-header">
              <div className="token-icon">{tokenSymbol || "TM"}</div>
              <div>
                <h2>{tokenName || "TokanM Token"}</h2>
                <p className="token-symbol">Live token overview</p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-label">Symbol</div>
                <div className="stat-value">{tokenSymbol || "-"}</div>
              </div>

              <div className="stat-box">
                <div className="stat-label">Total Supply</div>
                <div className="stat-value">{totalSupply}</div>
              </div>

              <div className="stat-box">
                <div className="stat-label">Your Balance</div>
                <div className="stat-value live-balance">{balance}</div>
              </div>

              <div className="stat-box">
                <div className="stat-label">Owner</div>
                <div className="stat-value small-text">{owner || "-"}</div>
              </div>
            </div>

            <div className="badge-row">
              <span className={`badge ${paused ? "danger" : "success"}`}>
                {paused ? "Paused" : "Active"}
              </span>
              <span className={`badge ${isOwner ? "warning" : "success"}`}>
                {isOwner ? "Owner Access" : "User Access"}
              </span>
            </div>
          </div>

          <div className="card">
            <h2>Transfer Tokens</h2>
            <form className="form" onSubmit={handleTransfer}>
              <div className="form-row">
                <label className="label">Recipient address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label className="label">Amount</label>
                <input
                  type="number"
                  step="any"
                  placeholder="50"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  required
                />
              </div>

              <button type="submit" disabled={loading || !token}>
                Transfer
              </button>
            </form>
            <p className="section-note">
              Use another Hardhat wallet address as recipient for testing.
            </p>
          </div>

          <div className="card">
            <h2>Burn Tokens</h2>
            <form className="form" onSubmit={handleBurn}>
              <div className="form-row">
                <label className="label">Amount to burn</label>
                <input
                  type="number"
                  step="any"
                  placeholder="25"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  required
                />
              </div>

              <button className="button-danger" type="submit" disabled={loading || !token}>
                Burn
              </button>
            </form>
            <p className="section-note">
              Burning permanently reduces your token balance and total supply.
            </p>
          </div>

          <div className="card">
            <h2>Owner Controls</h2>

            <div className="button-row">
              <button
                className="button-secondary"
                type="button"
                onClick={handlePause}
                disabled={loading || !isOwner}
              >
                Pause
              </button>

              <button
                className="button-secondary"
                type="button"
                onClick={handleUnpause}
                disabled={loading || !isOwner}
              >
                Unpause
              </button>
            </div>

            <form className="form" onSubmit={handleMint}>
              <div className="form-row">
                <label className="label">Mint to address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={mintTo}
                  onChange={(e) => setMintTo(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label className="label">Amount to mint</label>
                <input
                  type="number"
                  step="any"
                  placeholder="500"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  required
                />
              </div>

              <button type="submit" disabled={loading || !isOwner}>
                Mint
              </button>
            </form>

            <p className="section-note">
              Owner-only controls are enabled because this frontend uses Account #0.
            </p>
          </div>
        </div>

        <p className="footer-note">
          Local demo only. This frontend is connected to a Hardhat test account.
        </p>
      </div>
    </div>
  );
}