import { icons } from "lucide-react";

export default function Icon({ icon_name }: { icon_name: string }) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <Icon className="opacity-40 hover:opacity-100 transition-opacity duration-200 ease-in" />
  );
}
