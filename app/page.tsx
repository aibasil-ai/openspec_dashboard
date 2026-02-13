import { Suspense } from "react";
import DashboardPage from "@/components/dashboard-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="empty">Loading dashboard...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
