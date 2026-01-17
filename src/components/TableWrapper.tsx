import React, { ReactHTMLElement } from "react"

export interface TableWrapperParam {
    children: ReactHTMLElement<any>;
}

export function TableWrapper({ children }: TableWrapperParam) {
    return React.cloneElement(children, {className: `sortable`});
}

export default TableWrapper;
