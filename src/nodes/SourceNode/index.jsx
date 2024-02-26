import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
const SourceNode = ({ isConnectable }) => {
  const targethandleStyle = {
    left: 65,
    backgroundColor: "transparent",
  };

  return (
    <div className="source-node-wrapper">
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        style={targethandleStyle}
      />
      <div className="source-node">
        <p className="label">Sources</p>
      </div>
    </div>
  );
};

export default SourceNode;
