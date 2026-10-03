import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import ResidentLayout from './layouts/ResidentLayout';
import OperatorLayout from './layouts/OperatorLayout';
import CooperativeLayout from './layouts/CooperativeLayout';
import DiscomLayout from './layouts/DiscomLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages (WF-01, WF-02)
import LandingPage from './pages/public/LandingPage';
import MethodologyPage from './pages/public/MethodologyPage';

// Resident Pages (WF-10 to WF-19)
import ResidentOnboarding from './pages/resident/ResidentOnboarding';
import ResidentToday from './pages/resident/ResidentToday';
import ResidentOutlook from './pages/resident/ResidentOutlook';
import ResidentLoads from './pages/resident/ResidentLoads';
import ResidentShiftEarn from './pages/resident/ResidentShiftEarn';
import ResidentBattery from './pages/resident/ResidentBattery';
import ResidentWallet from './pages/resident/ResidentWallet';
import ResidentImpact from './pages/resident/ResidentImpact';
import ResidentSettings from './pages/resident/ResidentSettings';
import ResidentCommunications from './pages/resident/ResidentCommunications';

// Operator Pages (WF-20 to WF-27)
import OperatorSiteOverview from './pages/operator/OperatorSiteOverview';
import OperatorDispatch from './pages/operator/OperatorDispatch';
import OperatorForecastLab from './pages/operator/OperatorForecastLab';
import OperatorMembers from './pages/operator/OperatorMembers';
import OperatorBatteryHealth from './pages/operator/OperatorBatteryHealth';
import OperatorFairness from './pages/operator/OperatorFairness';
import OperatorTickets from './pages/operator/OperatorTickets';
import OperatorDevices from './pages/operator/OperatorDevices';

// Cooperative Pages (WF-30 to WF-32)
import CooperativeGovernance from './pages/cooperative/CooperativeGovernance';
import CooperativeFinance from './pages/cooperative/CooperativeFinance';
import CooperativeCommunityHealth from './pages/cooperative/CooperativeCommunityHealth';

// DISCOM Pages (WF-40 to WF-44)
import DiscomNetworkMap from './pages/discom/DiscomNetworkMap';
import DiscomFeederDetail from './pages/discom/DiscomFeederDetail';
import DiscomDrCenter from './pages/discom/DiscomDrCenter';
import DiscomAnalytics from './pages/discom/DiscomAnalytics';
import DiscomIntegrations from './pages/discom/DiscomIntegrations';

// Admin Pages (WF-50 to WF-52) & Impact Studio (WF-53)
import AdminUsersRoles from './pages/admin/AdminUsersRoles';
import AdminModelRegistry from './pages/admin/AdminModelRegistry';
import AdminAuditLog from './pages/admin/AdminAuditLog';
import ImpactStudio from './pages/impact/ImpactStudio';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/impact" element={<ImpactStudio />} />
          </Route>

          {/* Resident Routes */}
          <Route path="/resident" element={<ResidentLayout />}>
            <Route index element={<Navigate to="/resident/today" replace />} />
            <Route path="onboarding" element={<ResidentOnboarding />} />
            <Route path="today" element={<ResidentToday />} />
            <Route path="outlook" element={<ResidentOutlook />} />
            <Route path="loads" element={<ResidentLoads />} />
            <Route path="shift" element={<ResidentShiftEarn />} />
            <Route path="battery" element={<ResidentBattery />} />
            <Route path="wallet" element={<ResidentWallet />} />
            <Route path="impact" element={<ResidentImpact />} />
            <Route path="settings" element={<ResidentSettings />} />
            <Route path="communications" element={<ResidentCommunications />} />
          </Route>

          {/* Operator Routes */}
          <Route path="/operator" element={<OperatorLayout />}>
            <Route index element={<OperatorSiteOverview />} />
            <Route path="dispatch" element={<OperatorDispatch />} />
            <Route path="forecast" element={<OperatorForecastLab />} />
            <Route path="members" element={<OperatorMembers />} />
            <Route path="battery" element={<OperatorBatteryHealth />} />
            <Route path="fairness" element={<OperatorFairness />} />
            <Route path="tickets" element={<OperatorTickets />} />
            <Route path="devices" element={<OperatorDevices />} />
          </Route>

          {/* Cooperative Routes */}
          <Route path="/cooperative" element={<CooperativeLayout />}>
            <Route index element={<CooperativeGovernance />} />
            <Route path="finance" element={<CooperativeFinance />} />
            <Route path="health" element={<CooperativeCommunityHealth />} />
          </Route>

          {/* DISCOM Routes */}
          <Route path="/discom" element={<DiscomLayout />}>
            <Route index element={<DiscomNetworkMap />} />
            <Route path="feeder" element={<DiscomFeederDetail />} />
            <Route path="dr" element={<DiscomDrCenter />} />
            <Route path="analytics" element={<DiscomAnalytics />} />
            <Route path="integrations" element={<DiscomIntegrations />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/models" replace />} />
            <Route path="users" element={<AdminUsersRoles />} />
            <Route path="models" element={<AdminModelRegistry />} />
            <Route path="audit" element={<AdminAuditLog />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
