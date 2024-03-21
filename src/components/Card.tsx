import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardProps } from "./common/types";

export default function Card(props: CardProps) {
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
      task: {
        id: props.id,
        title: props.title,
        labels: props.labels,
      },
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // const tags = [
  //   { title: "Front end", colour: "#7feaaf", active: false },
  //   { title: "Back end", colour: "#7fc3ea", active: false },
  // ];

  return (
    <div className="card-container">
      <div
        className={`card ${isDragging ? "card--dragging" : ""}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="card__labels">
          {props.labels.map((label) => (
            <div
              key={label.title}
              className="card__label"
              style={{ backgroundColor: label.colour }}
              title={label.title}
            ></div>
          ))}
        </div>
        <h3 className="card__title" onClick={() => props.selectTask(props.id)}>
          {props.title}
        </h3>
      </div>
    </div>
  );
}
