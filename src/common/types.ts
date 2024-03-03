export type CardProps = {
  id: number;
  title: string;
  columnId: string;
};

export type ColumnProps = {
  id: string;
  title: string;
  tasks: CardProps[];
};
