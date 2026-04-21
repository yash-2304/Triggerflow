import { useState } from "react";

export const useStore = () => {
  const [state, setState] = useState({
    counter: 0,
    color: "blue",
    message: "",
    logs: [],
    activeRule: null,
  });

  return { state, setState };
};