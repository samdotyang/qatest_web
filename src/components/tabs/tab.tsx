interface TabProps {
  index: number;
  tabIndex: number;
  title: string;
  onClick: any;
}

export const Tab = (props: TabProps) => {
  const { title, tabIndex, index, onClick } = props;
  return (
    <li className="flex-1 p-1">
      <button
        className={`inline-block w-full p-4 text-primary-label dark:text-dark-primary-label ${tabIndex === index ? "bg-mac-sidebar-light-select dark:bg-mac-sidebar-dark-select rounded-full" : ""} `}
        onClick={onClick}
        data-value={title}
      >
        {title}
      </button>
    </li>
  );
};
