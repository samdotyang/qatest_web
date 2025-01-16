interface TabsProps {
    children: React.ReactNode
}

export const Tabs = ( {children}: TabsProps ) => {
  return (
    <div className="mb-4 mx-auto w-2/5 min-w-1/5 border-gray-200 px-4">
      <ul className="flex flex-nowrap text-sm font-medium text-center rounded-full bg-sidebar">
        {children}
      </ul>      
    </div>
  );
};
