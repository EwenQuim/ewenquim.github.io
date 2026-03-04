import { useEffect, useState } from "react";
import type { Repeatability } from "./shared";

type Listener = (v: Repeatability) => void;
let current: Repeatability = "unique";
const listeners = new Set<Listener>();

export const repeatabilityStore = {
  get: () => current,
  set: (v: Repeatability) => { current = v; listeners.forEach(l => l(v)); },
  subscribe: (l: Listener) => { listeners.add(l); return () => listeners.delete(l); },
};

export function useRepeatability(): [Repeatability, (v: Repeatability) => void] {
  const [value, setValue] = useState<Repeatability>(repeatabilityStore.get);
  useEffect(() => repeatabilityStore.subscribe(setValue), []);
  return [value, repeatabilityStore.set];
}
