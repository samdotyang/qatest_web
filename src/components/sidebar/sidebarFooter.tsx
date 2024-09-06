import classNames from "classnames";


interface FooterProps {
  collapsed: boolean;
  children: React.ReactNode;
}

const SidebarFooter = ({ collapsed, children }: FooterProps) => {
  return (
    <div className="flex gap-2 items-center h-11 overflow-hidden">
      <div
        className={classNames({
          "flex flex-col": true,
		  "rounded-md py-2 px-1": !collapsed,
          "rounded-full py-2 px-1 w-10 h-10": collapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarFooter;
