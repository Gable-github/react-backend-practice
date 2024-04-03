import { useEffect, useState } from "react";
import axios from "axios";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    connect();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log("success");
        setUsers(res.data);
      });

    return () => disconnect();
  }, []);
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default App;
