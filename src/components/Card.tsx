import { useState } from "react";

type CardProps = {
  id: number;
  title: string;
  updateTask: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
};

export default function Card(props: CardProps) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleKeyDown(key: string) {
    if (key === "Enter") {
      toggleEditing();
    }
  }

  return (
    <div className="card">
      {isEditing ? (
        <>
          <textarea
            className="card__title card__title--edit"
            value={props.title}
            autoFocus
            onClick={toggleEditing}
            onBlur={toggleEditing}
            onKeyDown={(e) => handleKeyDown(e.key)}
            onChange={(e) => props.updateTask(props.id, e.target.value)}
          ></textarea>

          <button
            className="card__button card__button--delete"
            onMouseDown={() => {
              props.deleteTask(props.id);
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <h3
          className="card__title"
          onClick={toggleEditing}
          onBlur={toggleEditing}
        >
          {props.title}
        </h3>
      )}
    </div>
  );
}
