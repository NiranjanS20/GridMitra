import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RESIDENTS,
  COMMUNITY_BATTERY,
  ACTIVE_DR_EVENT,
  FEEDERS,
  HOURLY_FORECAST_DATA,
  COOPERATIVE_FINANCES,
  COOPERATIVE_GOVERNANCE,
  MAINTENANCE_TICKETS,
  DEVICE_REGISTRY,
  MODEL_REGISTRY,
  AUDIT_LOG_ENTRIES,
  IMPACT_SCENARIOS
} from '../data/mockData';
import { fetchResidentToday, fetchOperatorOverview, fetchDiscomFeeders } from '../api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Active Role & Navigation Mode
  const [activeRole, setActiveRole] = useState('public'); // 'public', 'resident', 'operator', 'cooperative', 'discom', 'admin', 'impact'
  const [selectedRegion, setSelectedRegion] = useState('mohol'); // 'mohol' or 'mohol'
  const [toastMessage, setToastMessage] = useState(null);

  // Resident State
  const [currentResidentId, setCurrentResidentId] = useState('res-01');
  const [residentLoads, setResidentLoads] = useState(RESIDENTS[0].protectedLoads);
  const [residentTier, setResidentTier] = useState(RESIDENTS[0].tier);
  const [drStatus, setDrStatus] = useState('offer'); // 'offer', 'accepted', 'completed', 'verified', 'declined'
  const [walletBalance, setWalletBalance] = useState(RESIDENTS[0].walletBalanceINR);
  const [creditsEarned, setCreditsEarned] = useState(RESIDENTS[0].creditsEarnedThisMonth);
  const [notificationPrefs, setNotificationPrefs] = useState({
    whatsapp: true,
    sms: true,
    appPush: true,
    ivrVoice: false,
    language: 'English & Hindi (Hinglish)'
  });

  // Operator State
  const [batteryState, setBatteryState] = useState(COMMUNITY_BATTERY);
  const [batteryOverride, setBatteryOverride] = useState(null);
  const [dispatchMode, setDispatchMode] = useState('Auto-Economic Optimization (MILP)');
  const [tickets, setTickets] = useState(MAINTENANCE_TICKETS);
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOG_ENTRIES);

  // DISCOM State
  const [selectedFeederId, setSelectedFeederId] = useState('F-402');
  const [feeders, setFeeders] = useState(FEEDERS);
  const [activeDREvent, setActiveDREvent] = useState(ACTIVE_DR_EVENT);

  // Cooperative State
  const [proposals, setProposals] = useState(COOPERATIVE_GOVERNANCE.activeProposals);
  const [userVotes, setUserVotes] = useState({}); // { [proposalId]: 'for' | 'against' }

  // Simulation / Impact Studio State
  const [selectedScenarioId, setSelectedScenarioId] = useState('scenario-1');
  const [simulationComparisonMode, setSimulationComparisonMode] = useState('split'); // 'split', 'baseline', 'gridmitra'

  // Show Toast Helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Fetch Live Backend Data When Role Changes
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        if (activeRole === 'resident') {
          const data = await fetchResidentToday();
          setWalletBalance(data.wallet.credits);
          showToast(`Live Data: Wallet balance updated to ₹${data.wallet.credits} from FastAPI backend!`, 'success');
        } else if (activeRole === 'operator') {
          const data = await fetchOperatorOverview('site_1');
          showToast(`Live Data: Site status is ${data.status} from FastAPI backend!`, 'success');
        } else if (activeRole === 'discom') {
          const data = await fetchDiscomFeeders();
          showToast(`Live Data: Found ${data.length} feeder(s) from FastAPI backend!`, 'success');
        }
      } catch (err) {
        console.error("Backend integration error:", err);
      }
    };
    
    fetchLiveData();
  }, [activeRole]);

  // Add Immutable Audit Log Entry
  const recordAuditEvent = ({ actor, action, category, target, previousState, newState, reason, duration = 'N/A' }) => {
    const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    const newEntry = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC+5:30',
      actor,
      action,
      category,
      target,
      previousState,
      newState,
      reason,
      duration,
      auditHash: randomHex
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Resident Action: Toggle Load Protection
  const toggleLoadProtection = (loadId) => {
    setResidentLoads(prev => prev.map(item => {
      if (item.id === loadId) {
        const nextState = !item.defaultProtected;
        return {
          ...item,
          defaultProtected: nextState,
          status: nextState ? 'Protected (Active)' : 'Flexible / Standby'
        };
      }
      return item;
    }));
    showToast('Load protection priority updated', 'success');
  };

  // Resident Action: Accept Demand Response Event
  const acceptDREvent = () => {
    setDrStatus('accepted');
    const rewardEstimate = 85.00;
    showToast('DR Event Accepted! ₹85.00 estimated reward pending verification.', 'success');

    recordAuditEvent({
      actor: `Resident: ${RESIDENTS[0].name} (${RESIDENTS[0].householdId})`,
      action: 'DR Commitment Accepted',
      category: 'Demand Response',
      target: 'DR-2026-10-03-EVE / Feeder F-402',
      previousState: 'Uncommitted',
      newState: 'Committed (1.2 kW reduction)',
      reason: 'Resident opted into evening solar relief window'
    });

    // Auto verify event after simulated delay
    setTimeout(() => {
      setDrStatus('verified');
      setWalletBalance(prev => prev + rewardEstimate);
      setCreditsEarned(prev => prev + rewardEstimate);
      showToast('DR Event verified by DISCOM M&V! ₹85.00 credited to wallet.', 'success');
    }, 5000);
  };

  // Resident Action: Decline DR Event
  const declineDREvent = () => {
    setDrStatus('declined');
    showToast('DR Event declined. No penalty incurred. Normal comfort priority maintained.', 'info');
  };

  // Operator Action: Apply Battery Override
  const applyBatteryOverride = ({ mode, powerKW, reason, durationMinutes }) => {
    const previousMode = dispatchMode;
    setDispatchMode(`Manual Override: ${mode} (${powerKW} kW)`);
    setBatteryOverride({
      active: true,
      mode,
      powerKW,
      reason,
      durationMinutes,
      timestamp: new Date().toLocaleTimeString()
    });

    // Update battery state
    setBatteryState(prev => ({
      ...prev,
      state: mode,
      currentPowerKW: mode === 'Discharge' ? powerKW : -powerKW
    }));

    recordAuditEvent({
      actor: 'Operator: Duty Engineer (OP-04)',
      action: `Manual Battery Override (${mode} ${powerKW} kW)`,
      category: 'Operational Override',
      target: 'BESS-01 Mohol',
      previousState: previousMode,
      newState: `Forced ${mode} ${powerKW} kW`,
      reason: reason || 'Manual Grid Relief Intervention',
      duration: `${durationMinutes} minutes`
    });

    showToast(`Battery override engaged: Forced ${mode} at ${powerKW} kW for ${durationMinutes} mins`, 'warning');
  };

  // Operator Action: Clear Override
  const clearBatteryOverride = () => {
    setBatteryOverride(null);
    setDispatchMode('Auto-Economic Optimization (MILP)');
    setBatteryState(prev => ({
      ...prev,
      state: 'Standby',
      currentPowerKW: 0
    }));

    recordAuditEvent({
      actor: 'Operator: Duty Engineer (OP-04)',
      action: 'Battery Override Released',
      category: 'Operational Override',
      target: 'BESS-01 Mohol',
      previousState: 'Manual Override',
      newState: 'Auto-Economic Optimization (MILP)',
      reason: 'Standard schedule resumed'
    });

    showToast('Manual override released. System returned to Auto-MILP dispatch.', 'info');
  };

  // Cooperative Action: Cast Vote
  const castVote = (proposalId, vote) => {
    setUserVotes(prev => ({ ...prev, [proposalId]: vote }));
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          votesFor: vote === 'for' ? p.votesFor + 1 : p.votesFor,
          votesAgainst: vote === 'against' ? p.votesAgainst + 1 : p.votesAgainst
        };
      }
      return p;
    }));

    recordAuditEvent({
      actor: `Member Resident: ${RESIDENTS[0].name}`,
      action: `Voted ${vote.toUpperCase()} on Proposal ${proposalId}`,
      category: 'Governance Vote',
      target: `Proposal ${proposalId}`,
      previousState: 'Unvoted',
      newState: `Voted ${vote}`,
      reason: 'Democratic Cooperative Voting'
    });

    showToast(`Your vote (${vote.toUpperCase()}) was recorded on the cooperative ledger.`, 'success');
  };

  // DISCOM Action: Trigger Feeder DR Dispatch
  const triggerFeederDR = (feederId, targetKW) => {
    setActiveDREvent(prev => ({
      ...prev,
      status: 'Running',
      targetReductionKW: targetKW
    }));

    recordAuditEvent({
      actor: 'DISCOM Dispatcher: R. Sengupta',
      action: `Dispatched Fast DR on ${feederId}`,
      category: 'Demand Response Dispatch',
      target: feederId,
      previousState: 'Steady Monitoring',
      newState: `Target Reduction ${targetKW} kW`,
      reason: 'Feeder loading threshold > 75%'
    });

    showToast(`DR Dispatch of ${targetKW} kW broadcasted to ${feederId} enrolled participants.`, 'success');
  };

  const currentResident = RESIDENTS.find(r => r.id === currentResidentId) || RESIDENTS[0];
  const selectedFeeder = feeders.find(f => f.id === selectedFeederId) || feeders[0];
  const selectedScenario = IMPACT_SCENARIOS.find(s => s.id === selectedScenarioId) || IMPACT_SCENARIOS[0];

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        selectedRegion,
        setSelectedRegion,
        currentResident,
        currentResidentId,
        setCurrentResidentId,
        residentLoads,
        setResidentLoads,
        toggleLoadProtection,
        residentTier,
        setResidentTier,
        drStatus,
        setDrStatus,
        acceptDREvent,
        declineDREvent,
        walletBalance,
        creditsEarned,
        notificationPrefs,
        setNotificationPrefs,
        batteryState,
        batteryOverride,
        dispatchMode,
        applyBatteryOverride,
        clearBatteryOverride,
        tickets,
        setTickets,
        auditLogs,
        recordAuditEvent,
        feeders,
        selectedFeeder,
        selectedFeederId,
        setSelectedFeederId,
        activeDREvent,
        triggerFeederDR,
        proposals,
        userVotes,
        castVote,
        finances: COOPERATIVE_FINANCES,
        governance: COOPERATIVE_GOVERNANCE,
        deviceRegistry: DEVICE_REGISTRY,
        modelRegistry: MODEL_REGISTRY,
        impactScenarios: IMPACT_SCENARIOS,
        selectedScenario,
        selectedScenarioId,
        setSelectedScenarioId,
        simulationComparisonMode,
        setSimulationComparisonMode,
        hourlyForecastData: HOURLY_FORECAST_DATA,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
