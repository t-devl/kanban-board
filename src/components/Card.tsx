import { CardProps } from "../common/types";

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <h3 className="card__title">{props.title}</h3>
    </div>
  );
}
