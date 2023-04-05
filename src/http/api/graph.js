import serviceAxios from "..";

export const getgraph = (formData) => {

  return serviceAxios({
    method: "POST",
    url: "/visualize",
    data: formData
  });
};
