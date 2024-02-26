import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
const BytesIngested = ({ isConnectable }) => {
  const sourceHandleStyle = {
    left: 0,
    top: 18,
    backgroundColor: "transparent",
  };
  const targetHandleStyle = {
    left: 63,
    top: 18,
    backgroundColor: "transparent",
  };
  return (
    <div className="bytes-ingested-wrapper">
      <Handle
        type="source"
        position={Position.Top}
        style={targetHandleStyle}
        isConnectable={isConnectable}
      />
      <div className="parallelogram">
        <span className="label">0 GB</span>
      </div>
      <Handle
        type="target"
        position={Position.Bottom}
        style={sourceHandleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default BytesIngested;
