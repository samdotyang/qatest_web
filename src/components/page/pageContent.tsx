import React from 'react';

type PageContentProps = {
    children: React.ReactNode
}

export const PageContent = ({ children }: PageContentProps) => {
    return (
        <main id="primary-content" className='p-8 h-screen overflow-auto' tabIndex={-1} role="main">
            {children}
        </main>
    )
}