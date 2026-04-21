"use client";

export default function Playground({ state, dispatch }) {
  return (
    <div className="p-6 space-y-4 border rounded-xl">
      <h2 className="text-xl font-bold">Playground</h2>

      <div>Counter: {state.counter}</div>

      <div
        className="w-20 h-20 rounded"
        style={{ background: state.color }}
      />

      <button
        className="px-4 py-2 bg-black text-white rounded"
        onClick={() => dispatch("BUTTON_CLICK")}
      >
        Click Me
      </button>

      {state.message && <p>{state.message}</p>}
    </div>
  );
}