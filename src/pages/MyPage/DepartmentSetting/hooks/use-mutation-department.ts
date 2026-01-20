import { useMutation, useQueryClient } from "@tanstack/react-query";

import useToast from "@hooks/use-toast";

import { addDepartmentApi } from "../../api";
import { MYPAGE_QUERY_KEY } from "../../querykey";

export default function useMutationDepartment() {
  const toast = useToast();

  const qc = useQueryClient();

  const { mutate: addDepartment } = useMutation({
    mutationFn: (department: string) => addDepartmentApi(department),
    onSuccess: (response) => {
      qc.invalidateQueries({
        queryKey: MYPAGE_QUERY_KEY.USER_PROFILE,
        exact: true,
      });
      toast.info(response);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    addDepartment,
  };
}
