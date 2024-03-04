import { useState } from "react";

type CardProps = {
  id: number;
  title: string;
  updateTask: (id: number, text: string) => void;
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
        <textarea
          className="card__title"
          value={props.title}
          autoFocus
          onClick={toggleEditing}
          onBlur={toggleEditing}
          onKeyDown={(e) => handleKeyDown(e.key)}
          onChange={(e) => props.updateTask(props.id, e.target.value)}
        ></textarea>
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
