export default function WhySort({ onBack }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Why Sort?</h2>
      <p className="text-slate-700 mb-2">Sorting waste reduces plastic pollution and prevents clogged drains that cause flooding in Saigon.</p>
      <ul className="list-disc ml-6 space-y-1 text-slate-700">
        <li>Recycling keeps plastics and metals out of landfills.</li>
        <li>Composting cuts methane emissions and keeps drains clear.</li>
        <li>E‑waste contains hazardous chemicals — separate batteries and electronics.</li>
        <li>Small actions by many people make streets cleaner and safer.</li>
      </ul>
      <button className="mt-3 inline-flex items-center px-4 py-2 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50" onClick={onBack}>← Back</button>
    </div>
  )
}
