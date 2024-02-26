import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
function PipelineNode({ data }) {
  return (
    <div className="pipeline-node">
      <Handle type="target" position={Position.Left} className="targetHandle" />
      <div className="custom-node__header">
        This is a <strong>custom node</strong>
      </div>
      <div className="custom-node__body">
        <span>
          Custom Node: <strong>{data.label}</strong>
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="sourceHandle"
      />
    </div>
  );
}

export default PipelineNode;
