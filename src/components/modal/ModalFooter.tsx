export const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        {children}
      </div>
    </>
  );
};
