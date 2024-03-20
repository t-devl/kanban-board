import { useState } from "react";
import Column from "./Column";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CardProps, ColumnProps, Task } from "./common/types";
import { createPortal } from "react-dom";
import Card from "./Card";
import { useMemo } from "react";
import BinColumn from "./BinColumn";
import CardCreateModal from "./CardCreateModal";
import CardModal from "./CardModal";

export default function Board() {
  const [title, setTitle] = useState("Board");
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Ticket title 1", description: "", columnId: "toDo" },
    { id: 2, title: "Ticket title 2", description: "", columnId: "toDo" },
    { id: 3, title: "Ticket title 3", description: "", columnId: "inProgress" },
    { id: 4, title: "Ticket title 4", description: "", columnId: "inProgress" },
    { id: 5, title: "Ticket title 5", description: "", columnId: "inQA" },
    { id: 6, title: "Ticket title 6", description: "", columnId: "inQA" },
    { id: 7, title: "Ticket title 7", description: "", columnId: "done" },
    { id: 8, title: "Ticket title 8", description: "", columnId: "done" },
  ]);
  const [columns, setColumns] = useState<{ id: string; title: string }[]>([
    {
      id: "toDo",
      title: "To do",
    },
    {
      id: "inProgress",
      title: "In progress",
    },
    {
      id: "inQA",
      title: "In QA",
    },
    {
      id: "done",
      title: "Done",
    },
  ]);
  const taskCount = tasks.length + 1;
  const columnCount = columns.length + 1;

  const [draggedTask, setDraggedTask] = useState<CardProps | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<ColumnProps | null>(null);

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const columnIds = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  function toggleCreateModal(columnId: string | null) {
    setSelectedColumnId(columnId);
  }

  function selectTask(taskId: number | null) {
    setSelectedTaskId(taskId);
  }

  function addTask(task: {
    columnId: string;
    title: string;
    description: string;
  }) {
    setTasks([
      ...tasks,
      {
        id: taskCount,
        ...task,
      },
    ]);
  }

  function updateTask(id: number, text: { [key: string]: string }) {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, ...text } : task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }

  function addColumn() {
    setColumns([
      ...columns,
      {
        id: `column${columnCount}`,
        title: "Insert title here",
      },
    ]);
  }

  function updateColumn(id: string, title: string) {
    const updatedColumns = columns.map((column) => {
      return column.id === id ? { ...column, title } : column;
    });

    setColumns(updatedColumns);
  }

  function deleteColumn(id: string) {
    const updatedColumns = columns.filter((column) => column.id !== id);
    const updatedTasks = tasks.filter((task) => task.columnId !== id);

    setColumns(updatedColumns);
    setTasks(updatedTasks);
  }

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleKeyDown(key: string) {
    if (key === "Enter") {
      toggleEditing();
    }
  }

  return (
    <div className="board">
      {isEditing ? (
        <input
          className="board__title board__title--edit"
          value={title}
          autoFocus
          onBlur={toggleEditing}
          onKeyDown={(e) => handleKeyDown(e.key)}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      ) : (
        <h1 className="board__title" onClick={toggleEditing}>
          {title}
        </h1>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="board__main">
          <div className="board__columns">
            <SortableContext items={columnIds}>
              {columns.map((column) => (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  selectTask={selectTask}
                  toggleModal={toggleCreateModal}
                ></Column>
              ))}
            </SortableContext>
          </div>

          {draggedColumn || draggedTask ? (
            <BinColumn></BinColumn>
          ) : (
            <button className="board__button" onClick={addColumn}>
              Create column
            </button>
          )}
        </div>

        {createPortal(
          <DragOverlay>
            {draggedColumn && (
              <Column
                id={draggedColumn.id}
                title={draggedColumn.title}
                tasks={draggedColumn.tasks}
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                selectTask={selectTask}
                toggleModal={toggleCreateModal}
              ></Column>
            )}
            {draggedTask && (
              <Card
                id={draggedTask.id}
                title={draggedTask.title}
                selectTask={selectTask}
              ></Card>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      {selectedColumnId && (
        <CardCreateModal
          columnId={selectedColumnId}
          columns={columns}
          createTask={addTask}
          closeModal={() => toggleCreateModal(null)}
        ></CardCreateModal>
      )}
      {selectedTask && (
        <CardModal
          task={selectedTask}
          columnName={
            columns.find((column) => column.id === selectedTask.columnId)
              ?.title || ""
          }
          columns={columns}
          selectTask={selectTask}
          toggleModal={toggleEditing}
          updateTask={updateTask}
          deleteTask={deleteTask}
        ></CardModal>
      )}
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active.data.current?.column)
      setDraggedColumn(active.data.current?.column);
    else setDraggedTask(active.data.current?.task);
    setDraggedTask(active.data.current?.task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.data.current?.column) return;

    // Over a column
    if (over.data.current?.column) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);

        tasks[activeIndex].columnId = over.id as string;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
    // Over a task
    else {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);
        const overIndex = tasks.findIndex((task) => task.id === over.id);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setDraggedTask(null);
    setDraggedColumn(null);

    if (!over) return;

    if (over.id === "bin") {
      if (active.data.current?.column) {
        deleteColumn(active.id as string);
        return;
      } else {
        deleteTask(active.id as number);
        return;
      }
    }

    if (active.data.current?.column) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex(
          (column) => column.id === active.id
        );

        const overIndex = columns.findIndex((column) => column.id === over.id);

        return arrayMove(columns, activeIndex, overIndex);
      });
    }
  }
}
