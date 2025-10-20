export default function WhySort({ onBack }) {
  return (
    <div className="content">
      <h2>Why Sort?</h2>
      <p>Sorting waste reduces plastic pollution and prevents clogged drains that cause flooding in Saigon.</p>
      <ul className="list">
        <li>Recycling keeps plastics and metals out of landfills.</li>
        <li>Composting cuts methane emissions and keeps drains clear.</li>
        <li>E‑waste contains hazardous chemicals — separate batteries and electronics.</li>
        <li>Small actions by many people make streets cleaner and safer.</li>
      </ul>
      <button className="btn" onClick={onBack}>← Back</button>
    </div>
  )
}

