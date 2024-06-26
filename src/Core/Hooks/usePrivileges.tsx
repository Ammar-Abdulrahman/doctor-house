import { useQuery } from "react-query";
import { fetchData } from "@Services/apiService";
import { PrivilegeResponse } from "@Types/Privileges";

const usePrivileges = () => {
  return useQuery<PrivilegeResponse, Error>(
    "privileges",
    () => fetchData<PrivilegeResponse>("/privileges?needPagination=false"),
    {
      cacheTime: 120000,
      staleTime: Infinity,
    }
  );
};

export default usePrivileges;
