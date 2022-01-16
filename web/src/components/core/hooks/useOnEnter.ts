export default function useOnEnter(
  callback: () => void,
  { requireModifier }: { requireModifier: boolean } = { requireModifier: false }
) {
  return (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter" && (!requireModifier || ev.ctrlKey || ev.shiftKey)) {
      callback();
      ev.preventDefault();
    }
  };
}
