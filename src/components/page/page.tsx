import { PageAlertContext } from '@contexts/pageAlertContext';

type PageProps = {
    children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
    return (
        <PageAlertContext.Consumer>
            {context => {
                const hasPageAlertClass = context?.alertContent ? 'has-alert' : '';
                return (
                    <div id="primary-content" className={`w-full relative ml-auto ${hasPageAlertClass ? "mt-2": ""}`}>
                        {children}
                    </div>
                )
            }}
        </PageAlertContext.Consumer>
    );
}

export default Page;
