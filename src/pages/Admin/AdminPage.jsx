import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

// Admin section components (create these next)
import AdminDashboard from "../../components/common/admin/Dashboard/AdminDashboard";
import UserManagement from "../../components/common/admin/UserManagement/UserManagement";
import Reports from "../../components/common/admin/Reports/Reports";
import ActivityLogs from "../../components/common/admin/ActivityLogs/ActivityLogs";
import SystemConfiguration from "../../components/common/admin/SystemConfiguration/SystemConfiguration";

export default function AdminPage() {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="logs" element={<ActivityLogs />} />
        <Route path="settings" element={<SystemConfiguration />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </MainLayout>
  );
}