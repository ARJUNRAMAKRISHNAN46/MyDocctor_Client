export interface DataItem {
  logo: React.ReactNode;
  value: string;
  component: JSX.Element;
}

export interface SidePanelProps {
  data: DataItem[]; 
  onItemClick: (item: JSX.Element) => void;
}
