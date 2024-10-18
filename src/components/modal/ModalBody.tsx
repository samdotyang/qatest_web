export const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-6 space-y-6">
        <p className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-stretch text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {children}
        </p>
      </div>
    </>
  );
};
