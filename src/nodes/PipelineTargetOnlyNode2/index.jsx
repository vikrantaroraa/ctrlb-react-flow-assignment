import { Handle, Position } from "reactflow";
import "./index.css";

// eslint-disable-next-line react/prop-types
function PipelineTargetOnlyNode2({ data }) {
  return (
    <div className="pipeline-target-only-node">
      <Handle type="target" position={Position.Left} className="targetHandle" />
      <div className="custom-node__header">
        This is a <strong>custom node</strong>
      </div>
      <div className="custom-node__body">
        <span>
          Custom Node: <strong>{data.label}</strong>
        </span>
      </div>
    </div>
  );
}

export default PipelineTargetOnlyNode2;
