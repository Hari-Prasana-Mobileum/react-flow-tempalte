import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
];
const initialEdges = [
  // { id: "e1-2", source: "1", target: "2" }
];
export default function Draw() {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const [nodeCount, setNodeCount] = useState(1);
  const [groupCount, setGroupCount] = useState(0);

  const [parentNode, setParentNode] = useState();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback((changes) => {
    console.log(1);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);
  const onConnect = useCallback(
    (params) => {
      console.log(2);

      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  function nextChar() {
    return String.fromCharCode("A".charCodeAt(0) + groupCount);
  }

  // console.log(nodes, edges);

  return (
    <div>
      <div style={{ width: "90vw", height: "80vh", margin: "5vw" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{
            backgroundColor: "#d6cfe8",
          }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <button
          onClick={() => {
            reactFlowInstance.addNodes({
              id: `${nodeCount + 1}`,
              position: { x: 0, y: 200 },
              data: { label: `${nodeCount + 1}` },
              width: 150,
              height: 39,
            });
            setNodeCount((c) => c + 1);
          }}
        >
          Add Node
        </button>
        <button
          onClick={() => {
            const char = nextChar();
            reactFlowInstance.addNodes({
              id: char,
              position: { x: 10, y: 100 },
              data: { label: "Group " + char },
              style: {
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                width: 170,
                height: 140,
              },
            });

            setGroupCount((g) => g + 1);
          }}
        >
          Add Group
        </button>
        parent node :
        <input
          value={parentNode}
          onChange={(e) => setParentNode(e.target.value)}
        />
        <button
          onClick={() => {
            const parent = nodes.find((n) => n.id === parentNode);
            console.log(parent);
            if (parent) {
              reactFlowInstance.addNodes({
                id: `${nodeCount + 1}`,
                position: {
                  x: parent.position.x,
                  y: parent.position.y,
                },
                data: { label: `${nodeCount + 1}` },
                width: 150,
                height: 39,
                zIndex: 1,

                parentNode,
                extent: "parent",
              });
              setNodeCount((c) => c + 1);
            }
          }}
        >
          Add Child Node
        </button>
      </div>
    </div>
  );
}
