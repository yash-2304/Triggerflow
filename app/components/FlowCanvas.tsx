"use client";


import { useEffect, useState } from "react";

type Rule = {
  id: string;
  trigger: string;
  condition?: string;
  actionText: string;
};

type FlowCanvasProps = {
  rules: Rule[];
  executionSteps: string[];
};

export default function FlowCanvas({ rules, executionSteps }: FlowCanvasProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const grouped = rules.reduce<Record<string, Rule[]>>((acc, rule) => {
    if (!acc[rule.trigger]) acc[rule.trigger] = [];
    acc[rule.trigger].push(rule);
    return acc;
  }, {});

  const triggers = Object.keys(grouped);

  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  useEffect(() => {
    if (!executionSteps || executionSteps.length === 0) return;

    executionSteps.forEach((step, index) => {
      const groupIndex = triggers.findIndex((t) =>
        grouped[t].some((r) => r.id === step)
      );

      setTimeout(() => {
        setActiveNode(step);
        setActiveGroup(groupIndex);

        setTimeout(() => {
          setActiveNode(null);
        }, 500);
      }, index * 700);
    });
  }, [executionSteps]);

  return (
    <div className="mt-10 w-full overflow-x-auto">
      <div className="flex items-center gap-10 px-4">
        {Object.entries(grouped).map(([trigger, group], groupIndex, arr) => (
          <div key={trigger} className="flex items-center gap-10">

            {/* Trigger Column */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-gray-400 text-sm">{trigger}</div>

              {group.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 border rounded-lg bg-gray-900 min-w-[200px] text-center transition-all duration-300 ${
                    activeNode === rule.id
                      ? "border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.7)] scale-105"
                      : "border-gray-600"
                  }`}
                >
                  {rule.condition && (
                    <div className="text-yellow-400 text-sm mb-1">
                      IF: {rule.condition}
                    </div>
                  )}
                  <div className="text-red-400">THEN: {rule.actionText}</div>
                </div>
              ))}
            </div>

            {/* Arrow to next group */}
            {groupIndex < arr.length - 1 && (
              <div className="flex items-center">
                <div
                  className={`h-[2px] w-10 transition-all duration-300 ${
                    activeGroup === groupIndex
                      ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                      : "bg-gradient-to-r from-gray-500 to-transparent"
                  }`}
                ></div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}