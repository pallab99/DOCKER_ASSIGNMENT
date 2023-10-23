import { useSelector } from "react-redux";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  const rank = useSelector((state) => state?.auth?.userData?.rank);

  return (
    <>
      <AllRoutes rank={rank} />
    </>
  );
}

export default App;
