import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "./common/types";

type Props = {
  options: { id: string; title: string; colour: string; active: boolean }[];
  updateLabels: (labels: Label[]) => void;
  toggleModal: () => void;
};

export default function LabelsModal(props: Props) {
  function handleChange(id: string, isChecked: boolean) {
    const option = props.options.find((option) => option.id === id);
    if (option) option.active = isChecked;

    const labels = props.options
      .filter((option) => option.active)
      .map((label) => {
        return {
          id: label.id,
          title: label.title,
          colour: label.colour,
        };
      });

    props.updateLabels(labels);
  }

  return (
    <div className="label-modal">
      <div className="label-modal__header">
        <h2 className="label-modal__title">Tags</h2>
        <button className="card-modal__button" onClick={props.toggleModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <form className="label-modal__form">
        {props.options.map((option) => {
          return (
            <div className="label-modal__item" key={option.id}>
              <input
                className="label-modal__input"
                type="checkbox"
                id={option.id.toString()}
                name={option.id.toString()}
                onChange={(e) => handleChange(option.id, e.target.checked)}
                checked={option.active}
              />
              <label
                className="label-modal__label"
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
