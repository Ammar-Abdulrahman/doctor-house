import axiosInstance from "@Constants/Shared";

export const fetchData = async <T,>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

export const postData = async <T,>(url: string, data: object): Promise<T> => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const updateData = async <T,>(url: string, data: object): Promise<T> => {
  const response = await axiosInstance.patch(url, data);
  return response.data;
};

export const deleteData = async <T,>(url: string): Promise<T> => {
  const response = await axiosInstance.delete(url);
  return response.data;
};
