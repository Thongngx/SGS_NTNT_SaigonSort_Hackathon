export default function HowTo({ onBack }) {
  return (
    <div className="content">
      <h2>How to Play</h2>
      <ul className="list">
        <li>Drag items into the correct bin: Recycle, Compost, Landfill, or E‑waste.</li>
        <li>Correct sort gives points and community trust.</li>
        <li>Wrong or expired items increase pollution. At 50% drains clog; at 100% streets flood.</li>
        <li>Each day runs on a timer. After it ends, pick an upgrade and continue.</li>
        <li>Play with Daily or Custom seeds for repeatable runs.</li>
      </ul>
      <button className="btn" onClick={onBack}>← Back</button>
    </div>
  )
}

