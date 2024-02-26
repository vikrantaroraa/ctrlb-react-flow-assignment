import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
const BytesStreamed = ({ isConnectable }) => {
  const sourceHandleStyle = {
    left: 0,
    top: 30,
  };
  const targetHandleStyle = {
    left: 103,
    top: 30,
  };
  return (
    <div className="bytes-streamed-wrapper">
      <Handle
        type="source"
        position={Position.Top}
        style={targetHandleStyle}
        isConnectable={isConnectable}
      />
      <div className="parallelogram"></div>
      <Handle
        type="target"
        position={Position.Bottom}
        style={sourceHandleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default BytesStreamed;
