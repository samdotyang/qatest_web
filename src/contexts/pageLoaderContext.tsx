import {
    ReactElement,
    createContext,
    useState,
} from "react";

type PageLoaderContextProviderProps = {
    children: React.ReactNode;
}

type PageLoaderContextType = {
    percent: number;
    setPercent: any;
    loadPage: () => void;
}

export const PageLoaderContext = createContext<PageLoaderContextType | null>(null);

export const PageLoaderContextProvider = (props: PageLoaderContextProviderProps): ReactElement => {
    const [percent, setPercent] = useState(0);
    const loadPage = () => {
        setPercent(value => value=1)
        setTimeout(() => {
            setPercent(value => value=5)
        }, 500);
        setTimeout(() => {
            setPercent(value => value=10)
        }, 1000);
        setTimeout(() => {
            setPercent(value => value=12)
        }, 1500);
        setTimeout(() => {
            setPercent(value => value=20)
        }, 2000);
        setTimeout(() => {
            setPercent(value => value=100)
        }, 2500);
    }
    return <PageLoaderContext.Provider value={{ percent, setPercent, loadPage}}>
        {props.children}
    </PageLoaderContext.Provider>
}