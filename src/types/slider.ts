export interface SliderProps {
  title: string;
  description: string;
  loading: boolean | undefined;
  totalPage: number;
  className: string;
  parentClassName: string;
  children: React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  linkButton?: string;
}
