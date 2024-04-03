import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";


const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorMsg(err.message);
        setLoading(false);
      });
    //.finally(() => setLoading(false)); - dosent work in strict mode

    return () => cancel();
  }, []);

  return {users, errorMsg, isLoading, setUsers, setErrorMsg};
}

export default useUsers;