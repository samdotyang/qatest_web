interface FooterProps {
    collapsed: boolean,
    children: React.ReactNode
}


const SidebarFooter = ( {collapsed, children}: FooterProps ) => {
	return (
		<div className="flex gap-4 items-center h-11 overflow-hidden">
			{!collapsed && (
				<div className="flex flex-col">
					{children}
				</div>
			)}
		</div>
	)
}

export default SidebarFooter;