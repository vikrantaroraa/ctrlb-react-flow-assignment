import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
const CylinderNode = ({ isConnectable }) => {
  const targetHandleStyle = {
    backgroundColor: "transparent",
  };

  const sourceHandleStyle = {
    backgroundColor: "transparent",
  };
  return (
    <div className="cylinder-wrapper">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={targetHandleStyle}
      />
      <div className="cylinder"></div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={sourceHandleStyle}
      />
    </div>
  );
};

export default CylinderNode;
