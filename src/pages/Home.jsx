import Profile from "./Profile";
import Sidebar from "../component/Slider";


function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Profile />
    </div>
  );
}

export default Home;
