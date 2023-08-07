export default function cx(...classNames: (string | false | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}
