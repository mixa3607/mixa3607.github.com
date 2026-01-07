import { PropSidebarItem, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';
import { useCurrentSidebarSiblings, useDocsSidebar } from '@docusaurus/plugin-content-docs/client';

export const useCurrentSidebarSiblingsContainsName = (name: string): PropSidebarItem[] => {
    return useCurrentSidebarSiblings()
        .filter(x => (x as PropSidebarItemLink)?.docId?.includes(name)
        );
}

export const useCurrentSidebarContainsName = (name: string): PropSidebarItem[] => {
    const allItems: PropSidebarItem[] = [];
    useDocsSidebar().items.forEach(x => collectAllSidebarItems(x, allItems));
    return allItems.filter(x => (x as PropSidebarItemLink)?.docId?.includes(name));
}

function collectAllSidebarItems(parent: PropSidebarItem, acc: PropSidebarItem[]) {
    acc.push(parent);
    if (parent.type == 'category') {
        parent.items.forEach(x => collectAllSidebarItems(x, acc));
    }
}


export default { useCurrentSidebarSiblingsContainsName, useCurrentSidebarContainsName };