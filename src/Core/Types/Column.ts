export interface Column {
    id: string;
    label: string;
    align: 'center' | 'left' | 'right';
    render?: (rowData: any) => JSX.Element;
  }