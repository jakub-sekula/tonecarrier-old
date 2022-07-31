import { getUser } from "../components/contexts/AuthContext";
const cookie = require('cookie')


const App = (props) => {

 
  return (
   
<pre>{JSON.stringify(props, null, "\t")}</pre>
  );
};

export default App;

export const getServerSideProps = async (context) => {


    const user = await getUser(context);
  
    return {
      props: {
        user: user,
      }
    };
  };

