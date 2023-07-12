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
import { server1, server2, server3 } from "./nodeValue";
import { Box, Dialog, TextField } from "@mui/material";

const initialNodes = [...server1, ...server2, ...server3];
const initialEdges = [
  // { id: "e1-2", source: "1", target: "2" }
];

const groupWithTitle = ({ data }) => {
  return (
    <div className="react-flow__node custom-node">
      <div className="custom-node-title">{data.label}</div>
      {/* Add any other content or components for your custom node */}
    </div>
  );
};

const nodeTypes = {
  groupWithTitle, // Register your custom node component
};
export default function Internal() {
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
  const [open, setOpen] = useState(false);

  const onEdgesChange = useCallback((changes) => {
    console.log(1);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);
  const onConnect = useCallback(
    (params) => {
      setOpen(true);
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds));
    },
    [setEdges]
  );

  function nextChar() {
    return String.fromCharCode("A".charCodeAt(0) + groupCount);
  }

  // console.log(nodes, edges);

  return (
    <div style={{ backgroundColor: "#d6cfe8" }}>
      <div style={{ width: "90vw", height: "80vh", padding: "5vw" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{
            backgroundColor: "white",
          }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <Dialog
            //   selectedValue={selectedValue}
            open={open}
            onClose={() => setOpen(false)}
          >
            <Box sx={{ p: 2 }}>
              <TextField label="port" size="small" sx={{ mb: 1 }} />
              <br />
              <TextField label="ip" size="small" />
            </Box>
          </Dialog>
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
