export type CardProps = {
  id: number;
  title: string;
  updateTask: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
};

export type ColumnProps = {
  id: string;
  title: string;
  tasks: {
    id: number;
    title: string;
    columnId: string;
  }[];
  addTask: (columnId: string) => void;
  updateTask: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
};
