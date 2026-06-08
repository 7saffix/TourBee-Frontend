import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";
import { useProfileQuery } from "./redux/Api/user.api";
import Loader from "./components/Loader";

function App() {
  const { isLoading } = useProfileQuery();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
