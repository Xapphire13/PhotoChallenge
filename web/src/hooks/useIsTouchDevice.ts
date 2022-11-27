export default function useIsTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
