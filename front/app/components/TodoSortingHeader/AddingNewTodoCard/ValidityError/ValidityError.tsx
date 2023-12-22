export default function ValidityError({ text }: { text: string }) {
  return <div className="text-xs font-bold text-red-500 mt-2">{text}</div>;
}
