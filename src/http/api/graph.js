import serviceAxios from "..";

export const getgraph = (methods, layout, graph_data) => {
  serviceAxios({
    method: "POST",
    url: "/visualize",
    data: {
      methods,
      layout,
      graph_data,
    },
  });
};
