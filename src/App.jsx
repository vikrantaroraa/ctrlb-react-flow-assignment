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

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Node-1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Node-2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

let nodeId = 2;

const Flow = () => {
  const textAreaRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [textAreaContent, setTextAreaContent] = useState("");

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

  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", border: "2px dotted" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <button onClick={onClick} className="btn-add">
        add node
      </button>
      <textarea
        id="yamlFile"
        name="yamlConfig"
        rows="4"
        cols="50"
        ref={textAreaRef}
      />
    </div>
  );
};

export default function App() {
  // const addNewNodeAndEdge = () => {
  //   const newNode = {
  //     id: "3",
  //     position: { x: 0, y: 300 },
  //     data: { label: "3" },
  //   };
  //   setNodes((prevNodes) => {
  //     prevNodes, newNode;
  //   });
  // };

  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
