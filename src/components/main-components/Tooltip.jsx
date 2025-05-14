import { Tooltip as ReactTooltip } from "react-tooltip";

const Tooltip = ({ children, tooltipId, tooltipText }) => {
  return (
    <div>
      <div data-tooltip-id={tooltipId} className="inline-block">
        {children}
      </div>

      <ReactTooltip
        id={tooltipId}
        delayShow={300}
        delayHide={200}
        className="bg-black text-white opacity-80 transition-opacity duration-300"
      >
        {tooltipText}
      </ReactTooltip>
    </div>
  );
};

export default Tooltip;
