"use client";

export default function RulesPanel({ rules, activeRule }) {
  return (
    <div className="p-6 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Active Rules</h2>

      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div key={rule.id}>
            <div
              className={`p-4 border rounded-lg ${
                activeRule === rule.id
                  ? "bg-yellow-500 border-yellow-300"
                  : "bg-gray-900 border-gray-700"
              }`}
            >
              <div className="text-blue-400">
                WHEN: {rule.trigger}
              </div>

              {rule.condition && (
                <div className="text-yellow-400">
                  IF: {rule.conditionText}
                </div>
              )}

              <div className="text-red-400">
                THEN: {rule.actionText}
              </div>
            </div>

            {index < rules.length - 1 && (
              <div className="flex justify-center py-2 text-gray-500">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}