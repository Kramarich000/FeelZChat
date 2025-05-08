import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const CustomCheckbox = ({
  disabled = false,
  checkedCookie = false,
  onChange,
  className = "",
}) => {
  const [checked, setChecked] = useState(checkedCookie);

  const handleChange = () => {
    if (!disabled) {
      const newChecked = !checked;
      setChecked(newChecked);

      if (onChange) {
        onChange({ checked: newChecked });
      }
    }
  };

  return (
    <div
      onClick={handleChange}
      className={`flex items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}
    >
      <div
        className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
          checked ? "bg-primary" : "bg-white"
        } border-primary`}
      >
        {checked && <IoMdCheckmark size={20} color="white" />}
      </div>
    </div>
  );
};

export default CustomCheckbox;
