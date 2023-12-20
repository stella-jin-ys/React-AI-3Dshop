import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";
import PropTypes from "prop-types";

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);
  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CustomButton;
