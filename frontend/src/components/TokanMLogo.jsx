export default function TokanMLogo({ size = 72, showText = true }) {
  return (
    <div className="tokanm-logo-wrap">
      <div
        className="tokanm-logo"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div className="tokanm-logo-ring"></div>
        <span className="tokanm-logo-text">TM</span>
      </div>

      {showText && (
        <div className="tokanm-logo-labels">
          <h2>TokanM</h2>
          <p>ERC-20 Token</p>
        </div>
      )}
    </div>
  );
}