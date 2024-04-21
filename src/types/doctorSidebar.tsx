export interface DataItem<P = any> {
  logo: React.ReactNode;
  value: string;
  component: React.ComponentType<P>;
}

export interface SidePanelProps {
  data: DataItem[];
  onItemClick: (item: DataItem) => void;
}
