import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      {/* هدر با ارتفاع ثابت */}
      <Header />

      {/* بخش محتوا: سایدبار + بخش اصلی */}
      <div className="flex">
        {/* سایدبار با عرض ثابت */}
        <Sidebar />

        {/* بخش اصلی با اسکرول عمودی */}
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
