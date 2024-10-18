import { useQuery } from "react-query";
import { fetchData } from "@Services/Api/apiService";
import { PrivilegeResponse } from "@Types/Privileges";
import { ErrorProps } from "@Types/ErrorProps";
import { toast } from "react-toastify";

const usePrivileges = () => {
  return useQuery<PrivilegeResponse, Error>(
    "privileges",
    () => fetchData<PrivilegeResponse>("/privileges?needPagination=false"),
    {
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
      },
      cacheTime: 120000,
      staleTime: Infinity,
    }
  );
};

export default usePrivileges;
