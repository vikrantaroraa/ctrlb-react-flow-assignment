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

const flowKey = "current-flow";

const Flow = () => {
  const textAreaRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [count, setCount] = useState(0);
  // const [textAreaContent, setTextAreaContent] = useState("");
  const reactFlowInstance = useReactFlow();

  const { setViewport } = reactFlowInstance;

  const countNodes = useCallback(() => {
    setCount(reactFlowInstance.getNodes().length);
  }, [reactFlowInstance]);

  const onSave = useCallback(() => {
    console.log(reactFlowInstance);
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log("flow saved: ", flow);
      console.log("typeof flow saved: ", typeof flow);
      console.log("flow nodes saved: ", flow.nodes);
      console.log("typeof flow.nodes saved: ", typeof flow.nodes);
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      console.log("restore fn running");
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log("typeof flow: ", typeof flow);
      console.log("typeof flow.nodes: ", typeof flow.nodes);
      console.log("flow nodes restored: ", flow.nodes);

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

  const getNodeId = () => `randomnode_${+new Date()}`;

  const addSimpleNode = useCallback(() => {
    let newNodeId = getNodeId();
    const newNode = {
      id: newNodeId,
      data: {
        label: `Node ${newNodeId}`,
      },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      // position: {
      //   x: 0,
      //   y: (newNodeId - 1) * 100,
      // },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

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
          <button onClick={addSimpleNode} className="btn-add">
            Add Simple Node
          </button>
          <button onClick={updateNodes}>Update Nodes</button>
          <button onClick={countNodes}>Update count</button>
          <p>There are {count} nodes in the flow.</p>
          <button onClick={onSave}>Save Flow</button>
          <button onClick={onRestore}>restore</button>
        </div>
      </div>
      <div className="flowContainer">
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
      </div>
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
