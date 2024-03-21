export type Label = {
  id: string;
  title: string;
  colour: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  columnId: string;
  labels: Label[];
};

export type CardProps = {
  id: number;
  title: string;
  labels: Label[];
  selectTask: (taskId: number | null) => void;
};

export type ColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
  updateColumn: (id: string, text: string) => void;
  deleteColumn: (id: string) => void;
  selectTask: (taskId: number | null) => void;
  toggleModal: (columnId: string | null) => void;
};
