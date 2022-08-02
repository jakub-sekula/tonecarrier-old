import { useAuth } from "../components/contexts/AuthContext";

const App = (props) => {
  const { auth } = useAuth();
  return <pre className='text-white'>{JSON.stringify(auth, null, "\t")}</pre>;
};

export default App;
