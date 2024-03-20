import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { ColumnProps } from "./common/types";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Column(props: ColumnProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    data: {
      column: {
        id: props.id,
        title: props.title,
        tasks: props.tasks,
      },
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const taskIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  function toggleEditing() {
    if (!errorMessage) {
      setIsEditing(!isEditing);
    }
  }

  function handleKeyDown(key: string) {
    if (key === "Enter") {
      toggleEditing();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setErrorMessage("Title cannot be empty");
    } else if (errorMessage) {
      setErrorMessage("");
    }

    props.updateColumn(props.id, e.target.value);
  }

  return (
    <div
      className={`column ${isDragging ? "column--dragging" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div className="column__header">
        {isEditing ? (
          <>
            <input
              className="column__title column__title--edit"
              value={props.title}
              autoFocus
              onBlur={toggleEditing}
              onKeyDown={(e) => handleKeyDown(e.key)}
              onChange={(e) => handleChange(e)}
            ></input>
            <button
              className="column__button column__button--delete"
              title="Delete column"
              onMouseDown={() => {
                props.deleteColumn(props.id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        ) : (
          <>
            <h2 className="column__title" onClick={toggleEditing}>
              {props.title}
            </h2>
            <FontAwesomeIcon
              className="column__icon"
              icon={faGripVertical}
              {...attributes}
              {...listeners}
            />
          </>
        )}
      </div>
      {errorMessage && <p className="column__error">{errorMessage}</p>}
      <div className="column__main">
        <SortableContext items={taskIds}>
          {props.tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              selectTask={props.selectTask}
            ></Card>
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => props.toggleModal(props.id)}
        className="column__button"
      >
        + Create task
      </button>
    </div>
  );
}
