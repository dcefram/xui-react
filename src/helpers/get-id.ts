// Inspired by fabric UI's handling of unique IDs
function getWindow() {
  return typeof window === 'undefined' ? global : window;
}

// Need to attach to window for totally unique IDs.
const NAMESPACE = '__xui_current_id__';
let _global = getWindow();

if (_global[NAMESPACE] === undefined) {
  _global[NAMESPACE] = 0;
}

export function getId(prefix?: string): string {
  let index = _global[NAMESPACE]++;

  return `${prefix || 'id__'}_${index}`;
}

export function resetIds(counter: number = 0): void {
  _global[NAMESPACE] = counter;
}
