import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

const App = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default App;
