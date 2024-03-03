import Card from "./Card";

export default function Column() {
  return (
    <div className="column">
      <h2 className="column__title">Column title</h2>
      <Card></Card>
      <Card></Card>
    </div>
  );
}
