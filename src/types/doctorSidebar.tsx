export interface DataItem<P = any> {
  logo: React.ReactNode;
  value: string;
  component: React.ComponentType<P>;
}

export interface SidePanelProps {
  data: DataItem<any>[]; 
  onItemClick: (item: DataItem<any>) => void;
}
