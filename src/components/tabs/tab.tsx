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
        className={`inline-block w-full p-4 text-primary-label  ${tabIndex === index ? "bg-sidebar-select rounded-full" : ""} `}
        onClick={onClick}
        data-value={title}
      >
        {title}
      </button>
    </li>
  );
};
