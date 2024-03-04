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
import { CardProps, ColumnProps } from "./common/types";
import { createPortal } from "react-dom";
import Card from "./Card";
import { useMemo } from "react";

export default function Board() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Ticket title 1", columnId: "toDo" },
    { id: 2, title: "Ticket title 2", columnId: "toDo" },
    { id: 3, title: "Ticket title 3", columnId: "inProgress" },
    { id: 4, title: "Ticket title 4", columnId: "inProgress" },
    { id: 5, title: "Ticket title 5", columnId: "inQA" },
    { id: 6, title: "Ticket title 6", columnId: "inQA" },
    { id: 7, title: "Ticket title 7", columnId: "done" },
    { id: 8, title: "Ticket title 8", columnId: "done" },
  ]);
  const [columns, setColumns] = useState([
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

  const [activeTask, setActiveTask] = useState<CardProps | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);

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

  function addTask(columnId: string) {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: "Insert title here",
        columnId: columnId,
      },
    ]);
  }

  function updateTask(id: number, title: string) {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, title } : task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }

  return (
    <div className="board">
      <h1 className="board__title">Board</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="columns">
          <SortableContext items={columnIds}>
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                addTask={addTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              ></Column>
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                id={activeColumn.id}
                title={activeColumn.title}
                tasks={activeColumn.tasks}
                addTask={addTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              ></Column>
            )}
            {activeTask && (
              <Card
                id={activeTask.id}
                title={activeTask.title}
                updateTask={updateTask}
                deleteTask={deleteTask}
              ></Card>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active.data.current?.column)
      setActiveColumn(active.data.current?.column);
    else setActiveTask(active.data.current?.task);
    setActiveTask(active.data.current?.task);
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
    setActiveTask(null);
    setActiveColumn(null);

    if (!over) return;

    if (activeColumn?.id === over.id) return;

    setColumns((columns) => {
      const activeIndex = columns.findIndex(
        (column) => column.id === active.id
      );

      const overIndex = columns.findIndex((column) => column.id === over.id);

      return arrayMove(columns, activeIndex, overIndex);
    });
  }
}
