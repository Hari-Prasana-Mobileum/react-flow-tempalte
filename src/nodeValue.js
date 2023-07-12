const server1 = [
  {
    id: "S1",
    data: { label: "Server 1" },
    position: { x: 10, y: 120 },
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 250, height: 300 },
    type: "groupWithTitle",
    draggable: false,
  },

  {
    id: "S1-N1",
    data: { label: "App 1" },
    position: { x: 20, y: 40 },
    style: { width: 200 },

    // type: "input",
    parentNode: "S1",
    extent: "parent",
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "S1-N2",
    data: { label: "App 2" },
    position: { x: 20, y: 90 },
    style: { width: 200 },

    // type: "input",
    parentNode: "S1",
    extent: "parent",
    sourcePosition: "right",
  },
  {
    id: "S1-N3",
    data: { label: "App 3" },
    position: { x: 20, y: 140 },
    style: { width: 200 },

    // type: "input",
    parentNode: "S1",
    extent: "parent",
    sourcePosition: "right",
  },
];

const createServers = (serverNum, apps) => {
  let arr = [
    {
      id: `S${serverNum}`,
      data: { label: `Server ${serverNum}` },
      position: { x: (serverNum - 1) * 400, y: 120 },
      style: {
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        width: 250,
        height: 300,
      },
      type: "groupWithTitle",
    },
  ];

  apps.forEach((name, index) => {
    arr.push({
      id: `S${serverNum}-A${index + 1}`,
      data: { label: name },
      position: { x: 20, y: 40 + index * 50 },
      style: { width: 200 },

      type: "output",
      parentNode: `S${serverNum}`,
      extent: "parent",
      targetPosition: "left",
    });
  });
  return arr;
};

const server2 = [
  {
    id: "S2",
    data: { label: "Server 2" },
    position: { x: 400, y: 120 },
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 250, height: 300 },
    type: "groupWithTitle",
  },

  {
    id: "S2-N1",
    data: { label: "App 1" },
    position: { x: 20, y: 40 },
    style: { width: 200 },

    type: "output",
    parentNode: "S2",
    extent: "parent",
    targetPosition: "left",
  },
  {
    id: "S2-N2",
    data: { label: "App 2" },
    position: { x: 20, y: 90 },
    style: { width: 200 },

    type: "output",
    parentNode: "S2",
    extent: "parent",
    targetPosition: "left",
  },
];

const server3 = createServers(3, ["ap 1", " ap 2", " ap 3"]);

export { server1, server2, server3 };
