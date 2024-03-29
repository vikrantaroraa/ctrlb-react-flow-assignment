import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import "./App.css";
import TextUpdaterNode from "./nodes/TextUpdaterNode";
import CylinderNode from "./nodes/CylinderNode";
import SourceNode from "./nodes/SourceNode";
import DestinationNode from "./nodes/DestinationNode";
import BytesIngested from "./nodes/BytesIngested";
import BytesStreamed from "./nodes/BytesStreamed";
import PipelineSourceOnlyNode from "./nodes/PipelineSourceOnlyNode";
import PipelineSourceOnlyNode2 from "./nodes/PipelineSourceOnlyNode2";
import PipelineNode from "./nodes/PipelineNode";
import PipelineTargetOnlyNode from "./nodes/PipelineTargetOnlyNode";
import PipelineTargetOnlyNode2 from "./nodes/PipelineTargetOnlyNode2";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  textUpdater: TextUpdaterNode,
  cylinderNode: CylinderNode,
  sourceNode: SourceNode,
  destinationNode: DestinationNode,
  bytesIngested: BytesIngested,
  bytesStreamed: BytesStreamed,
  pipelineSourceOnlyNode: PipelineSourceOnlyNode,
  pipelineSourceOnlyNode2: PipelineSourceOnlyNode2,
  pipelineNode: PipelineNode,
  pipelineTargetOnlyNode: PipelineTargetOnlyNode,
  pipelineTargetOnlyNode2: PipelineTargetOnlyNode2,
};

const initialNodes = [
  {
    id: "node-1",
    type: "sourceNode",
    position: { x: -400, y: 0 },
    data: { label: "Source" },
  },
  {
    id: "node-2",
    type: "bytesIngested",
    position: { x: -220, y: 18 },
    data: { value: 123 },
  },
  {
    id: "node-3",
    type: "cylinderNode",
    position: { x: 0, y: -62 },
    data: { value: 123 },
  },
  {
    id: "node-4",
    type: "bytesStreamed",
    position: { x: 250, y: 18 },
    data: { value: 123 },
  },
  {
    id: "node-5",
    type: "destinationNode",
    position: { x: 450, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-6",
    type: "pipelineSourceOnlyNode",
    position: { x: -400, y: 200 },
    data: { label: "source-1" },
  },
  {
    id: "node-7",
    type: "pipelineSourceOnlyNode2",
    position: { x: -400, y: 400 },
    data: { label: "source-2" },
  },
  {
    id: "node-8",
    type: "pipelineNode",
    position: { x: 0, y: 300 },
    data: { label: "pipeline" },
  },
  {
    id: "node-9",
    type: "pipelineTargetOnlyNode",
    position: { x: 400, y: 200 },
    data: { label: "target-1" },
  },
  {
    id: "node-10",
    type: "pipelineTargetOnlyNode2",
    position: { x: 400, y: 400 },
    data: { label: "target-2" },
  },
  // {
  //   id: "node-1",
  //   type: "textUpdater",
  //   position: { x: 0, y: 100 },
  //   data: { value: 123 },
  // },
  // {
  //   id: "node-2",
  //   type: "output",
  //   targetPosition: "top",
  //   position: { x: 0, y: 200 },
  //   data: { label: "node 2" },
  // },
  // {
  //   id: "node-3",
  //   type: "output",
  //   targetPosition: "top",
  //   position: { x: 200, y: 200 },
  //   data: { label: "node 3" },
  // },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "node-1",
    target: "node-2",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "straight",
  },

  {
    id: "e2-3",
    source: "node-2",
    target: "node-3",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "straight",
  },
  {
    id: "e3-4",
    source: "node-3",
    target: "node-4",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "straight",
  },
  {
    id: "e4-5",
    source: "node-4",
    target: "node-5",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "straight",
  },
  {
    id: "e6-8",
    source: "node-6",
    target: "node-8",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "smoothstep",
  },
  {
    id: "e7-8",
    source: "node-7",
    target: "node-8",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "smoothstep",
  },
  {
    id: "e8-9",
    source: "node-8",
    target: "node-9",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "smoothstep",
  },
  {
    id: "e8-10",
    source: "node-8",
    target: "node-10",
    animated: true,
    style: { stroke: "#2c2c2c" },
    type: "smoothstep",
  },
];

const flowKey = "current-flow";

const Flow = () => {
  const textAreaRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const [count, setCount] = useState(0);
  // const [textAreaContent, setTextAreaContent] = useState("");
  const reactFlowInstance = useReactFlow();

  const { setViewport } = reactFlowInstance;

  // const countNodes = useCallback(() => {
  //   setCount(reactFlowInstance.getNodes().length);
  // }, [reactFlowInstance]);

  const onSave = useCallback(() => {
    console.log(reactFlowInstance);
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      // console.log("flow saved: ", flow);
      // console.log("typeof flow saved: ", typeof flow);
      // console.log("flow nodes saved: ", flow.nodes);
      // console.log("typeof flow.nodes saved: ", typeof flow.nodes);
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      // console.log("restore fn running");
      const flow = JSON.parse(localStorage.getItem(flowKey));
      // console.log("typeof flow: ", typeof flow);
      // console.log("typeof flow.nodes: ", typeof flow.nodes);
      // console.log("flow nodes restored: ", flow.nodes);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, setEdges]);

  const updateNodes = useCallback(() => {
    if (reactFlowInstance) {
      // getting current flow instance with nodes edges and viewport data
      const flow = reactFlowInstance.toObject();
      const newNodes = JSON.parse(textAreaRef.current.value);
      flow.nodes = newNodes;
      localStorage.setItem(flowKey, JSON.stringify(flow));
      setNodes(newNodes);
    }
  }, [setNodes, reactFlowInstance]);

  const onConnect = useCallback(
    (params) => {
      console.log(params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    textAreaRef.current.textContent = JSON.stringify(nodes);
  }, [nodes]);

  // const getNodeId = () => `randomnode_${+new Date()}`;

  // const addSimpleNode = useCallback(() => {
  //   let newNodeId = getNodeId();
  //   const newNode = {
  //     id: newNodeId,
  //     data: {
  //       label: `Node ${newNodeId}`,
  //     },
  //     position: {
  //       x: Math.random() * window.innerWidth - 100,
  //       y: Math.random() * window.innerHeight,
  //     },
  //   };
  //   setNodes((nds) => nds.concat(newNode));
  // }, [setNodes]);

  return (
    <div className="mainContainer">
      <div className="buttonAndtextAreaContainer">
        <div className="textAreaContainer">
          <textarea
            id="yamlFile"
            name="yamlConfig"
            rows="4"
            cols="50"
            ref={textAreaRef}
          />
        </div>
        <div className="buttonsContainer">
          {/* <button onClick={addSimpleNode} className="btn-add">
            Add Simple Node
          </button> */}
          <button onClick={updateNodes}>Update Nodes</button>
          {/* <button onClick={countNodes}>Update count</button> */}
          {/* <p>There are {count} nodes in the flow.</p> */}
          <button onClick={onSave}>Save Flow</button>
          <button onClick={onRestore}>Restore</button>
        </div>
      </div>
      <div className="flowContainer">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
