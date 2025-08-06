import { mdiStethoscope } from "@mdi/js";

import * as MDIIcons from "@mdi/js";

export const getIconPath = (iconName: string) => {
  return (MDIIcons as { [key: string]: string })[iconName] || mdiStethoscope;
};
