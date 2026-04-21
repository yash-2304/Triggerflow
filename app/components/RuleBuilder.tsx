"use client";


import { useState } from "react";

type Rule = {
  id: string;
  trigger: string;
  condition?: (state: { counter: number; color: string; message?: string }) => boolean;
  conditionText?: string;
  actionText: string;
  action: (
    state: { counter: number; color: string; message?: string },
    emit?: (event: string) => void
  ) => { counter?: number; color?: string; message?: string };
};

type RuleBuilderProps = {
  addRule: (rule: Rule) => void;
};

export default function RuleBuilder({ addRule }: RuleBuilderProps) {
  const [trigger, setTrigger] = useState("BUTTON_CLICK");
  const [action, setAction] = useState("INCREMENT");
  const [condition, setCondition] = useState("NONE");

  const handleAddRule = () => {
    const newRule = {
      id: Date.now().toString(),
      trigger,

      condition:
        condition === "GT3"
          ? (state: { counter: number }) => state.counter > 3
          : condition === "GT5"
          ? (state: { counter: number }) => state.counter > 5
          : undefined,

      conditionText:
        condition === "GT3"
          ? "Counter > 3"
          : condition === "GT5"
          ? "Counter > 5"
          : undefined,

      actionText:
        action === "INCREMENT"
          ? "Increase Counter"
          : action === "RED"
          ? "Turn Red"
          : action === "MESSAGE"
          ? "Show Message"
          : "",

      action: (
        state: { counter: number; color: string; message?: string },
        emit?: (event: string) => void
      ) => {
        if (action === "INCREMENT") {
          emit && emit("COUNTER_UPDATED");
          return { counter: state.counter + 1 };
        }
        if (action === "RED") {
          emit && emit("COLOR_CHANGED");
          return { color: "red" };
        }
        if (action === "MESSAGE") {
          return { message: "Rule triggered" };
        }

        return {};
      },
    };

    addRule(newRule);
  };

  return (
    <div className="p-4 border rounded-xl space-y-3">
      <h2 className="font-bold">Create Rule</h2>

      <select
        className="w-full p-2 bg-black border"
        value={trigger}
        onChange={(e) => setTrigger(e.target.value)}
      >
        <option value="BUTTON_CLICK">Button Click</option>
        <option value="COUNTER_UPDATED">Counter Updated</option>
        <option value="COLOR_CHANGED">Color Changed</option>
      </select>

      <select
        className="w-full p-2 bg-black border"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      >
        <option value="INCREMENT">Increase Counter</option>
        <option value="RED">Turn Red</option>
        <option value="MESSAGE">Show Message</option>
      </select>

      <select
        className="w-full p-2 bg-black border"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="NONE">No Condition</option>
        <option value="GT3">Counter &gt; 3</option>
        <option value="GT5">Counter &gt; 5</option>
      </select>

      <button
        className="px-4 py-2 bg-green-600 rounded"
        onClick={handleAddRule}
      >
        Add Rule
      </button>
    </div>
  );
}