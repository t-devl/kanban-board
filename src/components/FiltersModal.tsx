import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "./common/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  labels: Label[];
  filterTasks: (labelId: string, isChecked: boolean) => void;
  closeModal: () => void;
};

export default function FiltersModal(props: Props) {
  return (
    <div className="filter-modal">
      <div className="filter-modal__header">
        <h2 className="filter-modal__title">Filters</h2>
        <button className="filter-modal__button" onClick={props.closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <h3 className="filter-modal__heading">Labels</h3>
      <form className="filter-modal__form">
        {props.labels.map((option) => {
          return (
            <div className="filter-modal__item" key={option.id}>
              <input
                className="filter-modal__input"
                type="checkbox"
                id={option.id.toString()}
                name={option.id.toString()}
                onChange={(e) => props.filterTasks(option.id, e.target.checked)}
              />
              <label
                className="filter-modal__label"
                htmlFor={option.id.toString()}
                style={{ backgroundColor: `${option.colour}` }}
              >
                {option.title}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
}
