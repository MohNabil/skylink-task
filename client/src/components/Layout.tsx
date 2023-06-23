import MainContent from "./MainContent";
import SideBar from "./SideBar";

function Layout() {
  return (
    <div className="w-full h-screen grid grid-cols-[1fr_4fr]">
      <div className="border border-white p-4">
        <SideBar />
      </div>
      <div className="border border-white border-l-0 p-4">
        <MainContent />
      </div>
    </div>
  );
}

export default Layout;
