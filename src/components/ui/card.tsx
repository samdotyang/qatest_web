
type CardProps = {
    children: React.ReactNode;
}


const Card = ({ children }: CardProps) => {
    return <div className="space-y-2 rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
        {children}
    </div>
}


const SmallCard = ({ children }: CardProps) => {
    return <div className="space-y-2 max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label">
        {children}
    </div>
}

const MediumCard = ( props:any ) => {
    return <div className="space-y-2 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label" {...props}>
        {props.children}
    </div>
}


export { Card, SmallCard, MediumCard };