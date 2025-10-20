export default function HowTo({ onBack }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
      <ul className="list-disc ml-6 space-y-1 text-slate-700">
        <li>Drag items into the correct bin: Recycle, Compost, Landfill, or E‑waste.</li>
        <li>Correct sort gives points and community trust.</li>
        <li>Wrong or expired items increase pollution. At 50% drains clog; at 100% streets flood.</li>
        <li>Each day runs on a timer. After it ends, pick an upgrade and continue.</li>
        <li>Play with Daily or Custom seeds for repeatable runs.</li>
      </ul>
      <button className="mt-3 inline-flex items-center px-4 py-2 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50" onClick={onBack}>← Back</button>
    </div>
  )
}
