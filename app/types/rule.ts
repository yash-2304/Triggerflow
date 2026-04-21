export type EventType =
  | "BUTTON_CLICK"
  | "COUNTER_CHANGE"
  | "COLOR_CHANGE";

export type Rule = {
  id: string;
  trigger: EventType;
  condition?: (state: any) => boolean;
  action: (state: any, dispatch: (event: EventType) => void) => any;
};