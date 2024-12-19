import { ReactNode } from 'react';
declare const PrivateRoute: ({ children }: {
    children: ReactNode;
}, { ...rest }: {
    [x: string]: any;
}) => import("react/jsx-runtime").JSX.Element;
export default PrivateRoute;
