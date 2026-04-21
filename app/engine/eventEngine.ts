import { Rule, EventType } from "@/types/rule";

export class EventEngine {
  private rules: Rule[] = [];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  dispatch(event: EventType, state: any, setState: any) {
    let currentState = state;
    const queue: EventType[] = [event];
    const executed: { id: string; event: EventType }[] = [];
    const steps: string[] = [];

    while (queue.length > 0) {
      const currentEvent = queue.shift() as EventType;

      this.rules.forEach((rule) => {
        if (rule.trigger !== currentEvent) return;

        if (rule.condition && !rule.condition(currentState)) return;

        const result = rule.action(currentState, (newEvent: EventType) => {
          queue.push(newEvent);
        });

        if (result) {
          currentState = { ...currentState, ...result };
        }

        executed.push({ id: rule.id, event: currentEvent });
        steps.push(rule.id);
      });
    }

    // Apply final state once
    setState((prev: any) => ({
      ...prev,
      ...currentState,
      logs: [
        ...prev.logs,
        ...executed.map((e) => `Rule ${e.id} triggered on ${e.event}`)
      ],
      executionSteps: steps,
      activeRule: null,
    }));
  }
}