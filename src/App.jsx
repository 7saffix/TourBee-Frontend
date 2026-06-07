import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";

function App() {
  return (
    <div>
      <CommonLayout>
        <p>this is app</p>
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
