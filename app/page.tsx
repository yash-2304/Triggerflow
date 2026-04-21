"use client";

import React, { useState } from "react";

interface Rule {
  id: string;
  trigger: string;
  condition?: string;
  actions: string[];
  priority: number;
}

const FlowCanvas = ({
  rules,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  executedRuleIds,
}: {
  rules: Rule[];
  onDelete: (id: string) => void;
  onEdit: (rule: Rule) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  executedRuleIds: string[];
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-20">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className={`p-5 border rounded-xl bg-gray-900 min-w-[220px] transition-all ${
            executedRuleIds.includes(rule.id)
              ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              : "border-gray-700 hover:border-blue-500"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-blue-400 font-semibold">
              WHEN: {rule.trigger}
            </div>
            <div className="text-xs text-gray-400">Priority: {rule.priority}</div>
            <div className="flex gap-1">
              <button
                onClick={() => onMoveUp(rule.id)}
                className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                ↑
              </button>
              <button
                onClick={() => onMoveDown(rule.id)}
                className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                ↓
              </button>
              <button
                onClick={() => onEdit(rule)}
                className="text-xs px-2 py-1 bg-blue-600 rounded hover:bg-blue-500"
              >
                Edit
              </button>
            </div>
          </div>

          {rule.condition && (
            <div className="text-yellow-400 text-sm mb-2">
              IF: {rule.condition}
            </div>
          )}

          <div className="text-red-400 font-medium mt-2 space-y-1">
            THEN:
            {rule.actions?.map((a, i) => (
              <div key={i}>{a}</div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(rule.id);
            }}
            className="mt-3 px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const ExplanationPanel = ({
  rules,
}: {
  rules: Rule[];
}) => {
  if (rules.length === 0) {
    return (
      <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-800 max-w-xl mx-auto text-left text-white">
        <h2 className="text-lg mb-3 text-green-400">Rule Explanation</h2>
        <p className="text-gray-400">No rules defined.</p>
      </div>
    );
  }

  const buttonRules = rules.filter(r => r.trigger === "BUTTON_CLICK");
  const colorRules = rules.filter(r => r.trigger === "COLOR_CHANGED");

  return (
    <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-800 max-w-xl mx-auto text-left text-white space-y-4">
      <h2 className="text-lg text-green-400">Execution Logic</h2>

      <div className="text-sm text-gray-300 space-y-1">
        <div>1. User clicks the button</div>

        {buttonRules.length > 0 && (
          <>
            <div>2. System evaluates all BUTTON_CLICK rules</div>

            {buttonRules.map((rule, i) => (
              <div key={rule.id} className="ml-4 text-gray-400">
                {`→ Rule ${i + 1}: ${
                  rule.condition
                    ? `checks "${rule.condition}" and ${
                        rule.condition === "Counter > 5"
                          ? "only runs if true"
                          : ""
                      }`
                    : "runs immediately"
                }`}
              </div>
            ))}

            <div>3. Matching rules execute their actions</div>
          </>
        )}

        {buttonRules.some(r => r.actions.includes("Turn Red")) && (
          <>
            <div>4. "Turn Red" changes state → triggers COLOR_CHANGED</div>

            {colorRules.length > 0 && (
              <>
                <div>5. System evaluates COLOR_CHANGED rules</div>

                {colorRules.map((rule, i) => (
                  <div key={rule.id} className="ml-4 text-gray-400">
                    {`→ Color Rule ${i + 1}: runs ${rule.actions.join(", ")}`}
                  </div>
                ))}

                <div>6. Chained actions execute</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FlowDiagram = ({ rules, executedRuleIds }: { rules: Rule[]; executedRuleIds: string[] }) => {
  const buttonRules = rules.filter(r => r.trigger === "BUTTON_CLICK");
  const colorRules = rules.filter(r => r.trigger === "COLOR_CHANGED");

  return (
    <div className="mt-10 p-4 border border-gray-700 rounded-lg bg-gray-900 max-w-xl mx-auto text-white">
      <h2 className="text-lg mb-4 text-purple-400">Execution Flow</h2>

      <div className="flex flex-col items-center space-y-2 text-sm text-center">

        <div className="px-3 py-1 border border-gray-600 rounded">
          User Click
        </div>

        {buttonRules.length > 0 && (
          <>
            <div className="h-4 w-px bg-gray-500"></div>

            <div className="px-3 py-1 border border-gray-600 rounded">
              Evaluate BUTTON_CLICK Rules
            </div>

            {buttonRules.map((rule) => (
              <React.Fragment key={rule.id}>
                <div className="h-3 w-px bg-gray-500"></div>

                <div
                  className={`px-3 py-1 border rounded ${
                    executedRuleIds.includes(rule.id)
                      ? "border-green-500 text-green-400"
                      : "border-yellow-500 text-yellow-400"
                  }`}
                >
                  {rule.condition ? `IF ${rule.condition}` : "No Condition"}
                </div>

                <div className="h-3 w-px bg-gray-500"></div>

                <div
                  className={`px-3 py-1 border rounded ${
                    executedRuleIds.includes(rule.id)
                      ? "border-green-500 text-green-400"
                      : "border-red-500 text-red-400"
                  }`}
                >
                  {rule.actions.join(" + ")}
                </div>
              </React.Fragment>
            ))}

            {buttonRules.some(r => r.actions.includes("Turn Red")) && (
              <>
                <div className="h-4 w-px bg-gray-500"></div>

                <div className="px-3 py-1 border border-blue-500 rounded text-blue-400">
                  Trigger COLOR_CHANGED
                </div>
              </>
            )}
          </>
        )}

        {colorRules.length > 0 && (
          <>
            <div className="h-4 w-px bg-gray-500"></div>

            <div className="px-3 py-1 border border-gray-600 rounded">
              Evaluate COLOR_CHANGED Rules
            </div>

            {colorRules.map((rule) => (
              <React.Fragment key={rule.id}>
                <div className="h-3 w-px bg-gray-500"></div>

                <div
                  className={`px-3 py-1 border rounded ${
                    executedRuleIds.includes(rule.id)
                      ? "border-green-500 text-green-400"
                      : "border-red-400 text-red-300"
                  }`}
                >
                  {rule.actions.join(" + ")}
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [color, setColor] = useState<"blue" | "red">("blue");
  const [rules, setRules] = useState<Rule[]>([
    {
      id: "1",
      trigger: "BUTTON_CLICK",
      actions: ["Increase Counter"],
      priority: 1,
    },
    {
      id: "2",
      trigger: "BUTTON_CLICK",
      condition: "Counter > 5",
      actions: ["Turn Red"],
      priority: 2,
    },
    {
      id: "3",
      trigger: "COLOR_CHANGED",
      actions: ["Increase Counter"],
      priority: 3,
    },
  ]);
  const [trigger, setTrigger] = useState("BUTTON_CLICK");
  const [condition, setCondition] = useState("NONE");
  const [actions, setActions] = useState<string[]>([]);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [priority, setPriority] = useState<number>(1);
  const [executedRuleIds, setExecutedRuleIds] = useState<string[]>([]);

  React.useEffect(() => {
    if (editingRule) {
      setTrigger(editingRule.trigger);
      setCondition(
        editingRule.condition === "Counter > 5" ? "GT5" : "NONE"
      );
      setActions(editingRule.actions || []);
      setPriority(editingRule.priority);
    }
  }, [editingRule]);

  // Helper to animate sequential rule execution
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleEvent = async () => {
    let newCounter = counter;
    const executedEvents = new Set<string>();
    const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

    // STEP 1: BUTTON_CLICK rules
    for (const rule of sortedRules) {
      if (rule.trigger === "BUTTON_CLICK") {
        const conditionMet =
          !rule.condition ||
          (rule.condition === "Counter > 5" && newCounter > 5);

        if (conditionMet) {
          setExecutedRuleIds([rule.id]);
          await delay(400);

          for (const act of rule.actions) {
            if (act === "Increase Counter") {
              newCounter += 1;
              setCounter(newCounter);
            }

            if (act === "Turn Red") {
              setColor("red");

              // STEP 2: COLOR_CHANGED chain
              const sortedColorRules = [...rules].sort((a, b) => b.priority - a.priority);

              for (const r of sortedColorRules) {
                if (r.trigger === "COLOR_CHANGED" && !executedEvents.has("COLOR_CHANGED")) {
                  executedEvents.add("COLOR_CHANGED");

                  setExecutedRuleIds(prev => [...prev, r.id]);
                  await delay(400);

                  for (const a2 of r.actions) {
                    if (a2 === "Increase Counter") {
                      newCounter += 1;
                      setCounter(newCounter);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // clear highlights after sequence
    await delay(500);
    setExecutedRuleIds([]);
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));

    // if the deleted rule was being edited, reset edit mode
    setEditingRule((prev) => (prev?.id === id ? null : prev));
  };

  const startEdit = (rule: Rule) => {
    setEditingRule(rule);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-2xl mt-6 mb-4">Flow Builder</h1>
      <p className="max-w-2xl text-center text-sm text-gray-400 mb-6">
        Build and test event-driven logic using simple rules. Define triggers, optional conditions, and multiple actions to see how state changes and chained events execute in real time. Use the panels below to create, visualize, explain, and debug your workflow.
      </p>

      <div className="w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">

        {/* LEFT SIDE */}
        <div className="space-y-6 text-center">

          <div>
            <div className="text-lg mb-2">Counter: {counter}</div>

            <div
              className={`w-20 h-20 mx-auto mb-4 rounded-lg ${
                color === "red" ? "bg-red-500" : "bg-blue-500"
              }`}
            />

            <div className="flex justify-center gap-3">
              <button
                onClick={handleEvent}
                className="px-4 py-2 bg-white text-black rounded"
              >
                Click Me
              </button>

              <button
                onClick={() => {
                  setCounter(0);
                  setColor("blue");
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="border border-gray-700 p-4 rounded-lg space-y-3">
            <div className="text-sm mb-2">Create Rule</div>

            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full p-2 bg-black border border-gray-600"
            >
              <option value="BUTTON_CLICK">Button Click</option>
              <option value="COLOR_CHANGED">Color Changed</option>
            </select>

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2 bg-black border border-gray-600"
            >
              <option value="NONE">No Condition</option>
              <option value="GT5">Counter &gt; 5</option>
            </select>

            <div className="space-y-2 text-left">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={actions.includes("Increase Counter")}
                  onChange={() =>
                    setActions((prev) =>
                      prev.includes("Increase Counter")
                        ? prev.filter((a) => a !== "Increase Counter")
                        : [...prev, "Increase Counter"]
                    )
                  }
                />
                Increase Counter
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={actions.includes("Turn Red")}
                  onChange={() =>
                    setActions((prev) =>
                      prev.includes("Turn Red")
                        ? prev.filter((a) => a !== "Turn Red")
                        : [...prev, "Turn Red"]
                    )
                  }
                />
                Turn Red
              </label>
            </div>

            <div className="text-left space-y-1">
              <label className="text-xs text-gray-400">
                Priority (higher runs first)
              </label>
              <input
                type="number"
                min={1}
                value={priority}
                onChange={(e) => setPriority(Math.max(1, Number(e.target.value)))}
                className="w-full p-2 bg-black border border-gray-600"
              />
            </div>

            <button
              onClick={() =>
                setRules((prev) => {
                  if (actions.length === 0) {
                    alert("Select at least one action");
                    return prev;
                  }
                  const newRule = {
                    id: editingRule ? editingRule.id : Date.now().toString(),
                    trigger,
                    condition: condition === "GT5" ? "Counter > 5" : undefined,
                    actions,
                    priority,
                  };

                  if (editingRule) {
                    setEditingRule(null);
                    setPriority(1);
                    return prev.map((r) => (r.id === newRule.id ? newRule : r));
                  }

                  const exists = prev.some(
                    (r) =>
                      r.trigger === newRule.trigger &&
                      r.condition === newRule.condition &&
                      JSON.stringify(r.actions) === JSON.stringify(newRule.actions)
                  );

                  if (exists) {
                    alert("Rule already exists");
                    return prev;
                  }

                  setPriority(1);
                  return [...prev, newRule];
                })
              }
              className="px-3 py-1 bg-green-500 rounded text-sm"
            >
              {editingRule ? "Update Rule" : "Add Rule"}
            </button>
          </div>

          <FlowCanvas
            rules={rules}
            executedRuleIds={executedRuleIds}
            onDelete={deleteRule}
            onEdit={startEdit}
            onMoveUp={(id) => {
              setRules((prev) => {
                const idx = prev.findIndex(r => r.id === id);
                if (idx <= 0) return prev;

                const newRules = [...prev];
                [newRules[idx - 1], newRules[idx]] = [newRules[idx], newRules[idx - 1]];

                return newRules.map((r, i) => ({ ...r, priority: newRules.length - i }));
              });
            }}
            onMoveDown={(id) => {
              setRules((prev) => {
                const idx = prev.findIndex(r => r.id === id);
                if (idx === -1 || idx === prev.length - 1) return prev;

                const newRules = [...prev];
                [newRules[idx], newRules[idx + 1]] = [newRules[idx + 1], newRules[idx]];

                return newRules.map((r, i) => ({ ...r, priority: newRules.length - i }));
              });
            }}
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ExplanationPanel rules={rules} />
          <FlowDiagram rules={rules} executedRuleIds={executedRuleIds} />
        </div>

      </div>
    </div>
  );
}