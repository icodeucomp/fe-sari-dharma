export interface DropdownProps {
  parentClassName: string;
  className: string;
  data: {
    label: string;
    value: string;
  }[];
  defaultValue: string;
  handleFiltered: (value: string) => void;
}
