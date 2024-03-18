export type CardProps = {
  id: number;
  title: string;
  description: string;
  columnName: string;
  updateTask: (id: number, text: { [key: string]: string }) => void;
  deleteTask: (id: number) => void;
};

export type ColumnProps = {
  id: string;
  title: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    columnId: string;
  }[];
  updateColumn: (id: string, text: string) => void;
  deleteColumn: (id: string) => void;
  addTask: (task: {
    columnId: string;
    title: string;
    description: string;
  }) => void;
  updateTask: (id: number, text: { [key: string]: string }) => void;
  deleteTask: (id: number) => void;
  toggleModal: (columnId: string | null) => void;
};
