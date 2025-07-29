import Fdf from "../../assets/pdf/dashboard_charts File.pdf";
import {
  FaChartBar,
  FaShoppingCart,
  FaTag,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaCube,
  FaBullseye,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from "recharts";
// --- Sample Data for Charts and Components (Adjusted to match screenshot trends) ---

const dataRevenue = [
  { name: "Monday", OnlineSales: 13000, OfflineSales: 9000 },
  { name: "Tuesday", OnlineSales: 17000, OfflineSales: 12000 },
  { name: "Wednesday", OnlineSales: 6000, OfflineSales: 21000 }, // Peak as in screenshot
  { name: "Thursday", OnlineSales: 15000, OfflineSales: 5000 },
  { name: "Friday", OnlineSales: 11000, OfflineSales: 13000 },
  { name: "Saturday", OnlineSales: 16000, OfflineSales: 14000 },
  { name: "Sunday", OnlineSales: 20000, OfflineSales: 11000 },
];

const dataVisitors = [
  { name: "Jan", LoyalCustomers: 250, NewCustomers: 300, UniqueCustomers: 350 },
  { name: "Feb", LoyalCustomers: 280, NewCustomers: 320, UniqueCustomers: 380 },
  { name: "Mar", LoyalCustomers: 320, NewCustomers: 350, UniqueCustomers: 400 },
  { name: "Apr", LoyalCustomers: 200, NewCustomers: 220, UniqueCustomers: 250 },
  { name: "May", LoyalCustomers: 180, NewCustomers: 200, UniqueCustomers: 230 },
  { name: "Jun", LoyalCustomers: 300, NewCustomers: 340, UniqueCustomers: 380 },
  { name: "Jul", LoyalCustomers: 350, NewCustomers: 380, UniqueCustomers: 420 }, // Peak around July
  { name: "Aug", LoyalCustomers: 320, NewCustomers: 350, UniqueCustomers: 390 },
  { name: "Sep", LoyalCustomers: 280, NewCustomers: 300, UniqueCustomers: 340 },
  { name: "Oct", LoyalCustomers: 250, NewCustomers: 270, UniqueCustomers: 300 },
  { name: "Nov", LoyalCustomers: 220, NewCustomers: 240, UniqueCustomers: 270 },
  { name: "Dec", LoyalCustomers: 180, NewCustomers: 200, UniqueCustomers: 230 },
];

const dataSatisfaction = [
  { name: "Jan", ThisMonth: 75, LastMonth: 70 },
  { name: "Feb", ThisMonth: 80, LastMonth: 72 },
  { name: "Mar", ThisMonth: 70, LastMonth: 75 },
  { name: "Apr", ThisMonth: 78, LastMonth: 68 },
  { name: "May", ThisMonth: 72, LastMonth: 70 },
  { name: "Jun", ThisMonth: 85, LastMonth: 78 },
  { name: "Jul", ThisMonth: 92, LastMonth: 80 }, // Higher peak as in screenshot
  { name: "Aug", ThisMonth: 88, LastMonth: 82 },
  { name: "Sep", ThisMonth: 80, LastMonth: 75 },
  { name: "Oct", ThisMonth: 75, LastMonth: 70 },
  { name: "Nov", ThisMonth: 82, LastMonth: 78 },
  { name: "Dec", ThisMonth: 88, LastMonth: 85 },
];

const dataTargetVsReality = [
  { name: "Jan", Target: 8000, Reality: 7500 },
  { name: "Feb", Target: 6000, Reality: 6500 },
  { name: "Mar", Target: 9000, Reality: 8200 },
  { name: "Apr", Target: 7000, Reality: 7800 },
  { name: "May", Target: 8500, Reality: 7900 },
  { name: "June", Target: 6500, Reality: 7000 },
  { name: "July", Target: 9500, Reality: 8823 }, // Matching the target/reality values from screenshot
];

const dataVolumeServiceLevel = [
  { Month: "Jan", Volume: 2400, ServiceLevel: 80 },
  { Month: "Feb", Volume: 2210, ServiceLevel: 75 },
  { Month: "Mar", Volume: 2290, ServiceLevel: 78 },
  { Month: "Apr", Volume: 2000, ServiceLevel: 82 },
];

// --- Reusable Sales Summary Card Component ---
const SalesSummaryCard = ({
  icon: Icon,
  title,
  value,
  percentage,
  isPositive,
  bgColor,
  iconBgColor,
}) => {
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";
  const arrowIcon = isPositive ? <FaArrowUp /> : <FaArrowDown />;

  return (
    <div
      className={`p-4 rounded-lg shadow-sm flex items-center space-x-4 ${bgColor}`}
    >
      <div className={`p-3 rounded-full ${iconBgColor} text-white`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-sm text-gray-700">{title}</p>
        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        <p className={`text-xs flex items-center ${percentageColor}`}>
          {arrowIcon} {Number(percentage).toFixed(1)}% from yesterday
        </p>
      </div>
    </div>
  );
};

// --- Top Products Component ---
const TopProducts = () => {
  const products = [
    {
      id: "01",
      name: "Home Decor Range",
      popularity: 75,
      sales: 45,
      barColor: "bg-indigo-500",
    },
    {
      id: "02",
      name: "Disney Princess Pink Bag 18'",
      popularity: 60,
      sales: 29,
      barColor: "bg-green-500",
    },
    {
      id: "03",
      name: "Bathroom Essentials",
      popularity: 40,
      sales: 18,
      barColor: "bg-purple-500",
    },
    {
      id: "04",
      name: "Apple Smartwatches",
      popularity: 50,
      sales: 25,
      barColor: "bg-orange-500",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top Products</h2>
      <div className="flex-grow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Popularity
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Sales
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${product.barColor} h-2 rounded-full`}
                      style={{ width: `${product.popularity}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {product.sales}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Sales Mapping By Country (Visual Placeholder matching screenshot) ---
const SalesMappingByCountry = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Sales Mapping by Country
      </h2>
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Simple SVG or image placeholder for world map to mimic the screenshot */}
        <svg viewBox="0 0 1000 600" className="w-full h-full opacity-75">
          <path fill="#e0e0e0" d="M0,0h1000v600H0z" />
          {/* Example "countries" - simplified shapes matching the screenshot's color blobs */}
          <path
            fill="#fbb650"
            d="M100 200 Q150 150 200 200 T300 250 Q250 300 150 280 Q50 260 100 200z"
          />{" "}
          {/* Orange region */}
          <path
            fill="#60a5fa"
            d="M700 100 Q750 50 800 100 T900 150 Q850 200 750 180 Q650 160 700 100z"
          />{" "}
          {/* Blue region */}
          <path
            fill="#a78bfa"
            d="M600 400 Q650 350 700 400 T800 450 Q750 500 650 480 Q550 460 600 400z"
          />{" "}
          {/* Purple region */}
          <path
            fill="#ef4444"
            d="M200 450 Q250 400 300 450 T400 500 Q350 550 250 530 Q150 510 200 450z"
          />{" "}
          {/* Red region */}
          {/* Add more paths if needed to better mimic the map */}
        </svg>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        (Visual representation. For interactive maps, integrate a library like
        Leaflet or Google Maps.)
      </p>
    </div>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      {" "}
      {/* Added font-sans for general styling */}
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <a
          href={Fdf}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          <FaChartBar className="text-base" />
          Export Report
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
        {/* Today's Sales Section - spans wider on large screens */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Today's Sales
            </h2>
            <p className="text-sm text-gray-500 mb-4">Sales Summary</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SalesSummaryCard
                icon={FaChartBar}
                title="Total Sales"
                value="$1k"
                percentage={8}
                isPositive
                bgColor="bg-pink-50"
                iconBgColor="bg-pink-500"
              />
              <SalesSummaryCard
                icon={FaShoppingCart}
                title="Total Order"
                value="300"
                percentage={5}
                isPositive
                bgColor="bg-orange-50"
                iconBgColor="bg-orange-500"
              />
              <SalesSummaryCard
                icon={FaTag}
                title="Product Sold"
                value="5"
                percentage={2}
                isPositive
                bgColor="bg-green-50"
                iconBgColor="bg-green-500"
              />
              <SalesSummaryCard
                icon={FaUsers}
                title="New Customers"
                value="8"
                percentage={5}
                isPositive={false}
                bgColor="bg-purple-50"
                iconBgColor="bg-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Visitor Insights - spans 1 column on large screens */}
        <div className="lg:col-span-1 xl:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Visitor Insights
            </h2>
            <div className="flex-grow">
              {" "}
              {/* Allows chart to fill available space */}
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={dataVisitors}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e0e0e0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="LoyalCustomers"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="NewCustomers"
                    stroke="#ff0000"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="UniqueCustomers"
                    stroke="#4caf50"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Total Revenue - spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Total Revenue
            </h2>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={dataRevenue}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e0e0e0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                  <Bar dataKey="OnlineSales" fill="#4ade80" barSize={10} />
                  <Bar dataKey="OfflineSales" fill="#60a5fa" barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Customer Satisfaction - spans 1 column on large screens */}
        <div className="lg:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Customer Satisfaction
            </h2>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={dataSatisfaction}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e0e0e0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="LastMonth"
                    stroke="#60a5fa"
                    fill="#60a5fa"
                    fillOpacity={0.3}
                    dot={{ strokeWidth: 2, r: 3 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ThisMonth"
                    stroke="#4ade80"
                    fill="#4ade80"
                    fillOpacity={0.3}
                    dot={{ strokeWidth: 2, r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-around text-center text-sm">
              <div>
                <p className="text-gray-500">Last Month</p>
                <p className="font-semibold text-gray-800">$3,004</p>
              </div>
              <div>
                <p className="text-gray-500">This Month</p>
                <p className="font-semibold text-gray-800">$4,504</p>
              </div>
            </div>
          </div>
        </div>

        {/* Target vs Reality */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Target vs Reality
            </h2>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={dataTargetVsReality}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e0e0e0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <Tooltip />
                  <Bar dataKey="Target" fill="#facc15" barSize={10} />
                  <Bar dataKey="Reality" fill="#82ca9d" barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <FaCube className="mr-2 text-green-500" />
                <div>
                  <p>
                    Reality Sales{" "}
                    <span className="text-gray-500 text-xs">(Global)</span>
                  </p>
                  <p className="font-semibold text-gray-900">8.823</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <FaBullseye className="mr-2 text-yellow-500" />
                <div>
                  <p>
                    Target Sales{" "}
                    <span className="text-gray-500 text-xs">(Commercial)</span>
                  </p>
                  <p className="font-semibold text-gray-900">12.122</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-2">
          <TopProducts />
        </div>

        {/* Sales Mapping by Country */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1">
          <SalesMappingByCountry />
        </div>

        {/* Volume vs Service Level */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Volume vs Service Level
            </h2>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={dataVolumeServiceLevel}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e0e0e0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                  <Bar dataKey="Volume" fill="#60a5fa" barSize={10} />
                  <Bar dataKey="Services" fill="#4ade80" barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-around text-center text-sm">
              <div>
                <p className="text-gray-500">Volume</p>
                <p className="font-semibold text-gray-800">1,135</p>
              </div>
              <div>
                <p className="text-gray-500">Services</p>
                <p className="font-semibold text-gray-800">635</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
