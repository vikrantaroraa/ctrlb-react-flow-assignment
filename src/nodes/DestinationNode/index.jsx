import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
const DestinationNode = ({ isConnectable }) => {
  const targethandleStyle = {
    left: 0,
    backgroundColor: "transparent",
  };

  return (
    <div className="destination-node-wrapper">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={targethandleStyle}
      />
      <div className="destination-node">
        <p className="label">Destinations</p>
      </div>
    </div>
  );
};

export default DestinationNode;
