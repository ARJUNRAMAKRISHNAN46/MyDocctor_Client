export interface DataItem {
  logo: React.ReactNode;
  value: string;
  component: string;
}

export interface SidePanelProps {
  data: DataItem[]; 
  // onItemClick: (item: JSX.Element) => void;
}

export interface Data {
  data: DataItem[];
}