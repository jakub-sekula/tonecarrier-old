import { useAuth } from "../components/contexts/AuthContext";

const App = (props) => {
  const { auth } = useAuth();
  return <pre>{JSON.stringify(auth, null, "\t")}</pre>;
};

export default App;
