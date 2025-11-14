import type { LucideIcon } from "lucide-react";
import * as icons from "lucide-react";

export const getIconComponent = (iconName: string): LucideIcon => {
  const iconComponent = icons[iconName as keyof typeof icons];
  if (!iconComponent) {
    return icons.HelpCircle;
  }
  return iconComponent as LucideIcon;
};
