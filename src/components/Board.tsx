import Column from "./Column";

export default function Board() {
  return (
    <div className="board">
      <h1 className="board__title">Board</h1>
      <div className="columns">
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column></Column>
      </div>
    </div>
  );
}
