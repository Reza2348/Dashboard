import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* هدر با ارتفاع ثابت */}
      <Header />

      {/* بخش محتوا: سایدبار + بخش اصلی */}
      <div className="flex flex-1">
        {/* سایدبار با عرض ثابت */}
        <div className="w-64 border-r border-gray-200">
          <Sidebar />
        </div>

        {/* بخش اصلی با اسکرول عمودی */}
        <div className="flex-1 overflow-y-auto">
          <HeroSection />
        </div>
      </div>
    </div>
  );
}

export default App;
