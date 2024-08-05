interface TabPanelProps {
  index: number;
  value: number;
  children: React.ReactNode;
}

export const TabPanel = ({ index, value, children }: TabPanelProps) => {
  return <>{value === index && <div className="px-4">{children}</div>}</>;
};
