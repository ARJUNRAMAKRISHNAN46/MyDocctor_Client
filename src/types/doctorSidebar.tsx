export interface DataItem {
  logo: React.ReactNode;
  value: string;
  component: string;
  // component: JSX.Element;
}

export interface SidePanelProps {
  data: DataItem[]; 
  onItemClick: (item: JSX.Element) => void;
}

export interface Data {
  data: DataItem[];
}