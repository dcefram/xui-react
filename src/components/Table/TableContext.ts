import { createContext } from 'react';

const TableContext = createContext({
  isSelectable: false,
  onSelect: (event: React.MouseEvent<HTMLTableRowElement>, id: string | number) => {},
  selected: '' as number | string
});

export default TableContext;
