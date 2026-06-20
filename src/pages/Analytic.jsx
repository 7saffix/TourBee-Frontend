import {
  Users,
  ShieldAlert,
  UserPlus,
  Map,
  Layers,
  TrendingUp,
  CheckCircle2,
  Calendar,
  CreditCard,
  DollarSign,
  Loader2,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
  useGetTourStatsQuery,
  useGetUserStatsQuery,
} from "../redux/Api/stats.api";

const Analytic = () => {
  const {
    data: userStats,
    isLoading: uLoad,
    isError: uErr,
    refetch: reUser,
  } = useGetUserStatsQuery();
  const {
    data: tourStats,
    isLoading: tLoad,
    isError: tErr,
    refetch: reTour,
  } = useGetTourStatsQuery();
  const {
    data: bookingStats,
    isLoading: bLoad,
    isError: bErr,
    refetch: reBook,
  } = useGetBookingStatsQuery();
  const {
    data: paymentStats,
    isLoading: pLoad,
    isError: pErr,
    refetch: rePay,
  } = useGetPaymentStatsQuery();

  const globalLoading = uLoad || tLoad || bLoad || pLoad;
  const globalError = uErr || tErr || bErr || pErr;

  const handleGlobalSync = () => {
    reUser();
    reTour();
    reBook();
    rePay();
  };

  if (globalLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 animate-spin text-primary" />
        <p className="text-xs  text-muted-foreground uppercase tracking-widest">
          Parsing aggregation pipeline metrics...
        </p>
      </div>
    );
  }

  if (globalError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3 p-4">
        <AlertTriangle className="w-9 h-9 text-destructive animate-pulse" />
        <h3 className="text-sm font-bold  text-foreground uppercase tracking-wider">
          Sync Error
        </h3>
        <button
          onClick={handleGlobalSync}
          className="mt-2 flex items-center gap-2 bg-muted/40 border border-border px-4 py-2 rounded-xl text-xs  hover:bg-muted transition-colors"
        >
          <RefreshCcw size={12} /> Re-execute Aggregation
        </button>
      </div>
    );
  }

  // Raw Extractors
  const revenueValue = paymentStats?.data?.totalRevenue?.[0]?.totalRevenue || 0;
  const highestBookedTours = tourStats?.data?.totalHighestBookedTour || [];

  // Recharts Normalization Formats
  const roleChartData = (userStats?.data?.userByRole || []).map((item) => ({
    name: item._id ? item._id.toUpperCase() : "UNKNOWN",
    value: item.count,
  }));

  const typeChartData = (tourStats?.data?.totalTourByTourTypes || []).map(
    (item) => ({
      category: item._id || "Unclassified",
      Tours: item.count,
    }),
  );

  const divisionChartData = (tourStats?.data?.totalTourByDivision || []).map(
    (item) => ({
      region: item._id || "Other",
      Count: item.count,
    }),
  );

  const CYBER_COLORS = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b", "#ec4899"];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Module Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight ">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Everything is up to date! Tracking latest bookings and earnings
              automatically.
            </p>
          </div>
          <button
            onClick={handleGlobalSync}
            className="flex items-center justify-center gap-2 bg-muted/20 hover:bg-muted/40 border border-border text-foreground rounded-xl py-2 px-4 text-xs  transition-all self-start sm:self-auto active:scale-[0.98]"
          >
            <RefreshCcw size={13} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Section 1: Financial & Primary Log Constants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-background border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold  uppercase tracking-wider text-muted-foreground">
                Total Earnings
              </span>
              <div className="p-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl">
                <DollarSign size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight  text-emerald-500">
                BDT {revenueValue.toLocaleString()}
              </h3>
              <p className="text-[10px] text-muted-foreground  mt-1">
                This shows the combined total of all successfully paid bookings.
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold  uppercase tracking-wider text-muted-foreground">
                Successful Payments
              </span>
              <div className="p-2 bg-primary/10 text-primary border border-primary/20 rounded-xl">
                <CreditCard size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight ">
                {paymentStats?.data?.totalSuccessfulPayment || 0}
              </h3>
              <p className="text-[10px] text-muted-foreground  mt-1">
                Transactions that have been paid.
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold  uppercase tracking-wider text-muted-foreground">
                Completed Bookings
              </span>
              <div className="p-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight ">
                {bookingStats?.data?.totalBooking || 0}
              </h3>
              <p className="text-[10px] text-muted-foreground  mt-1">
                Total closed bookings
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold  uppercase tracking-wider text-muted-foreground">
                Bookings (7 Days)
              </span>
              <div className="p-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl">
                <Calendar size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight ">
                {bookingStats?.data?.bookingInLastSevenDays || 0}
              </h3>
              <p className="text-[10px] text-muted-foreground  mt-1">
                Bookings placed within the past week.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Account Sub-Matrix + Role Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Numeric Indicators */}
          <div className="bg-muted/10 border border-border rounded-2xl p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-xs font-bold  uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
                <Users size={14} /> Customer Accounts
              </h2>
              <div className="flex items-center justify-between text-xs  border-b border-border/60 pb-2">
                <span className="text-muted-foreground">Total Users:</span>
                <span className="font-bold text-foreground">
                  {userStats?.data?.totalUser || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs  border-b border-border/60 pb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <ShieldAlert size={12} className="text-emerald-500" /> Active
                  Users:
                </span>
                <span className="font-bold text-emerald-500">
                  {userStats?.data?.activeUser || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs ">
                <span className="text-muted-foreground flex items-center gap-1">
                  <UserPlus size={12} className="text-primary" /> New (Last 30
                  Days):
                </span>
                <span className="font-bold text-primary">
                  +{userStats?.data?.newUsersInLastThirtyDays || 0}
                </span>
              </div>
            </div>
            <div className=" text-[10px] text-muted-foreground border-t border-border/40 pt-2">
              Customer Activity:{" "}
              <span className="text-foreground font-bold">
                {bookingStats?.data?.bookingUniqueUser || 0}
              </span>{" "}
              number of individual buyers who have checked out.
            </div>
          </div>

          {/* Donut Chart: Role Allocation Tokens */}

          <div className="bg-background border border-border rounded-2xl p-5 lg:col-span-2 flex flex-col justify-between">
            <span className="text-xs font-bold  uppercase text-muted-foreground  block">
              User Roles Breakdown
            </span>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {roleChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CYBER_COLORS[index % CYBER_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      fontFamily: "monospace",
                      fontSize: "11px",
                    }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontFamily: "monospace", fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section 3: Tour Distribution & Density Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Area Chart: Tour Categories Vector */}
          <div className="bg-background border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-xs font-bold  uppercase text-muted-foreground flex items-center gap-1.5">
                <Layers size={13} /> Tours Available By Category
              </span>
              <span className="text-xs  text-muted-foreground">
                Total Units: {tourStats?.data?.totalTour || 0}
              </span>
            </div>
            <div className="w-full h-64  text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={typeChartData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <XAxis dataKey="category" stroke="rgba(156, 163, 175, 0.5)" />
                  <YAxis stroke="rgba(156, 163, 175, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      fontSize: "11px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Tours"
                    stroke="#3b82f6"
                    fillOpacity={0.1}
                    fill="#3b82f6"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Regional Allocation Vector */}
          <div className="bg-background border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-xs font-bold  uppercase text-muted-foreground flex items-center gap-1.5">
                <Map size={13} /> Tour Packages By Division
              </span>
            </div>
            <div className="w-full h-64  text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={divisionChartData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <XAxis dataKey="region" stroke="rgba(156, 163, 175, 0.5)" />
                  <YAxis stroke="rgba(156, 163, 175, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="Count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                    {divisionChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section 4: Conversion Matrices Pipeline */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold  uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <TrendingUp size={14} /> Top Booking Highlights
          </h2>
          <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-muted/20 border-b border-border">
              <span className="text-xs font-bold  uppercase text-muted-foreground">
                {" "}
                Most Popular Tours
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/10 text-muted-foreground  text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-5 font-semibold">Tour Name</th>
                    <th className="py-3 px-5 font-semibold">Tour location</th>
                    <th className="py-3 px-5 font-semibold text-right">
                      Total Bookings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60  text-xs">
                  {highestBookedTours.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      <td className="py-4 px-5 text-foreground font-medium">
                        {item.tour?.title || "Data Unpopulated"}
                      </td>
                      <td className="py-4 px-5 text-muted-foreground text-[11px]">
                        {item.tour?.location || "null"}
                      </td>
                      <td className="py-4 px-5 text-right font-bold text-primary">
                        <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">
                          {item.bookingCount} checkouts
                        </span>
                      </td>
                    </tr>
                  ))}
                  {highestBookedTours.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-8 text-center text-muted-foreground text-xs"
                      >
                        No transactions present to compute pipelines.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytic;
