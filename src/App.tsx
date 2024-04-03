import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const controller = new AbortController();

  const [users, setUsers] = useState<User[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
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

    return () => controller.abort();
  }, []);
  return (
    <div>
      {errorMsg && <h1>{errorMsg}</h1>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
