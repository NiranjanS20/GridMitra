// MOHALLA GRID — Centralized Domain Mock Data & Models

export const RESIDENTS = [
  {
    id: "res-01",
    name: "Ananya Sharma",
    householdId: "MV-402-A12",
    feederId: "F-402",
    feederName: "Mayur Vihar Phase 1 (F-402)",
    transformerId: "DT-04",
    tier: "Standard", // Essential, Standard, Premium
    address: "Flat 402, Block B, Pocket 1, Mayur Vihar, Delhi",
    phone: "+91 98112 34567",
    email: "ananya.sharma@example.com",
    rooftopSolarKW: 3.2,
    smartMeterId: "SM-DL-882910",
    baselineConsumptionKW: 2.8,
    protectedLoads: [
      { id: "load-1", name: "Refrigerator", category: "Critical", powerWatts: 220, defaultProtected: true, status: "Active" },
      { id: "load-2", name: "Wi-Fi Router & Workstation", category: "Critical", powerWatts: 150, defaultProtected: true, status: "Active" },
      { id: "load-3", name: "LED Lighting & BLDC Fans", category: "Essential", powerWatts: 280, defaultProtected: true, status: "Active" },
      { id: "load-4", name: "Water Purifier (RO)", category: "Essential", powerWatts: 60, defaultProtected: true, status: "Active" },
      { id: "load-5", name: "Inverter Split AC (1.5 Ton)", category: "Flexible", powerWatts: 1450, defaultProtected: false, status: "Standby" },
      { id: "load-6", name: "Geyser / Water Heater", category: "Deferrable", powerWatts: 2000, defaultProtected: false, status: "Shifted" },
      { id: "load-7", name: "Washing Machine", category: "Deferrable", powerWatts: 500, defaultProtected: false, status: "Off" },
      { id: "load-8", name: "EV 2-Wheeler Charger", category: "Deferrable", powerWatts: 850, defaultProtected: false, status: "Scheduled 23:00" }
    ],
    batteryAllocationKWh: 2.4, // Guaranteed fair-share allocation from community BESS
    walletBalanceINR: 1420.50,
    creditsEarnedThisMonth: 480,
    historicalEvents: [
      { id: "dr-01", date: "2026-10-02", time: "19:00 - 21:00", requestedKW: 1.2, deliveredKW: 1.35, rewardINR: 120, status: "Verified" },
      { id: "dr-02", date: "2026-09-28", time: "18:30 - 20:30", requestedKW: 1.0, deliveredKW: 1.10, rewardINR: 95, status: "Verified" },
      { id: "dr-03", date: "2026-09-21", time: "19:30 - 21:30", requestedKW: 1.5, deliveredKW: 1.60, rewardINR: 150, status: "Verified" }
    ],
    impact: {
      protectedHoursMonth: 42.5,
      energyShiftedKWh: 38.6,
      avoidedOutageIncidents: 6,
      co2AvoidedKg: 31.2,
      reliabilityScore: 99.4
    }
  },
  {
    id: "res-02",
    name: "Rajesh Verma",
    householdId: "MV-402-C08",
    feederId: "F-402",
    feederName: "Mayur Vihar Phase 1 (F-402)",
    transformerId: "DT-04",
    tier: "Essential",
    address: "House 18, Pocket 2, Mayur Vihar, Delhi",
    phone: "+91 98765 43210",
    email: "rajesh.verma@example.com",
    rooftopSolarKW: 0,
    smartMeterId: "SM-DL-882944",
    baselineConsumptionKW: 1.4,
    protectedLoads: [
      { id: "load-21", name: "Medical Nebulizer", category: "Life-Support", powerWatts: 80, defaultProtected: true, status: "Active" },
      { id: "load-22", name: "Refrigerator", category: "Critical", powerWatts: 180, defaultProtected: true, status: "Active" },
      { id: "load-23", name: "Lights & Fans", category: "Essential", powerWatts: 200, defaultProtected: true, status: "Active" }
    ],
    batteryAllocationKWh: 1.8,
    walletBalanceINR: 890.00,
    creditsEarnedThisMonth: 210,
    impact: {
      protectedHoursMonth: 48.0,
      energyShiftedKWh: 16.2,
      avoidedOutageIncidents: 6,
      co2AvoidedKg: 14.5,
      reliabilityScore: 99.9
    }
  },
  {
    id: "res-03",
    name: "Fatima Sheikh",
    householdId: "MV-402-A04",
    feederId: "F-402",
    feederName: "Mayur Vihar Phase 1 (F-402)",
    transformerId: "DT-04",
    tier: "Premium",
    address: "Villa 4, Pocket 1, Mayur Vihar, Delhi",
    phone: "+91 98223 98765",
    email: "fatima.s@example.com",
    rooftopSolarKW: 5.0,
    smartMeterId: "SM-DL-882988",
    baselineConsumptionKW: 4.2,
    protectedLoads: [
      { id: "load-31", name: "Full Home Base Loads", category: "Critical", powerWatts: 850, defaultProtected: true, status: "Active" },
      { id: "load-32", name: "Central Cooling", category: "Flexible", powerWatts: 2200, defaultProtected: false, status: "Eco-Mode" },
      { id: "load-33", name: "EV Fast Charger", category: "Deferrable", powerWatts: 3300, defaultProtected: false, status: "Paused" }
    ],
    batteryAllocationKWh: 4.5,
    walletBalanceINR: 2350.00,
    creditsEarnedThisMonth: 740,
    impact: {
      protectedHoursMonth: 44.0,
      energyShiftedKWh: 68.0,
      avoidedOutageIncidents: 6,
      co2AvoidedKg: 55.4,
      reliabilityScore: 99.2
    }
  }
];

export const COMMUNITY_BATTERY = {
  id: "bess-01",
  name: "Mayur Vihar Micro-BESS Container 01",
  location: "Pocket 1 Substation Enclosure, Mayur Vihar, Delhi",
  chemistry: "Lithium Iron Phosphate (LFP)",
  totalCapacityKWh: 500,
  usableCapacityKWh: 450,
  inverterRatingKW: 250,
  currentSOCKWh: 360,
  currentSOCPercentage: 72,
  minReserveLimitPercentage: 20, // 20% reserved strictly for life support / critical baseline
  state: "Standby", // Charging, Discharging, Standby, Islanded
  currentPowerKW: 0, // positive = discharging, negative = charging
  healthSOH: 98.2,
  cycleCount: 842,
  packVoltageV: 53.2,
  avgCellTempC: 28.4,
  maxCellTempC: 30.1,
  efficiencyRoundTrip: 91.5,
  lastCalibrationDate: "2026-09-15",
  activeAllocations: {
    criticalLifeSupportKWh: 80,
    residentialProtectedKWh: 180,
    commercialFlexibilityKWh: 60,
    gridSupportReserveKWh: 40
  },
  cellTelemetry: [
    { module: 1, voltage: 3.325, temp: 28.1, balance: "Normal" },
    { module: 2, voltage: 3.328, temp: 28.5, balance: "Normal" },
    { module: 3, voltage: 3.322, temp: 28.3, balance: "Normal" },
    { module: 4, voltage: 3.319, temp: 29.0, balance: "Balancing" },
    { module: 5, voltage: 3.326, temp: 28.2, balance: "Normal" },
    { module: 6, voltage: 3.324, temp: 28.4, balance: "Normal" }
  ]
};

export const ACTIVE_DR_EVENT = {
  id: "DR-2026-10-03-EVE",
  name: "Evening Solar Drop Peak Relief (DR-402)",
  feederId: "F-402",
  feederName: "Mayur Vihar Phase 1 (F-402)",
  status: "Active - Open for Acceptance", // Scheduled, Active - Open for Acceptance, Running, Completed, Verified
  triggerReason: "Evening solar irradiance drop + rapid cooling load pickup (18:30–21:00)",
  windowStart: "18:30",
  windowEnd: "21:00",
  targetReductionKW: 45.0,
  committedReductionKW: 42.5,
  currentCurtailedKW: 38.2,
  payoutRateINRPerKWh: 8.50,
  estimatedHouseholdEarningsINR: 85.00,
  recommendedActions: [
    "Pre-cool home to 22°C before 18:30, then raise thermostat to 25°C",
    "Delay washing machine and water geyser until 21:15",
    "Switch off redundant hallway lighting and standby electronics"
  ],
  mvProtocol: {
    method: "IS 15888 / CAISO 10-in-10 Baseline with Same-Day Weather Adjustment",
    baselineLoadKW: 182.4,
    eventLoadKW: 138.3,
    verifiedReductionKW: 44.1,
    settlementAmountTotalINR: 7650.00
  }
};

export const FEEDERS = [
  {
    id: "F-402",
    name: "Mayur Vihar Feeder 402",
    discom: "BSES Yamuna Power Ltd",
    substation: "11kV Patparganj Central",
    ratedCapacityKW: 450,
    currentLoadKW: 342,
    loadingPercentage: 76,
    status: "Tight", // Steady, Watch, Tight, Critical
    riskWindow: "18:30 – 21:30",
    predictedPeakKW: 438,
    voltageProfileKV: 10.78, // Nominal 11.0kV
    nominalKV: 11.0,
    voltageViolationRisk: "Moderate (Voltage sag < 10.6kV projected at tail nodes)",
    transformerHealth: 91,
    ambientTempC: 34.2,
    solarConnectedKW: 145,
    bessConnectedKW: 250,
    connectedHouseholds: 280,
    enrolledDRHouseholds: 194,
    lossPercentage: 6.4,
    historicalTrippingEventsMonth: 1,
    coordinates: { lat: 28.6085, lng: 77.2945 }
  },
  {
    id: "F-108",
    name: "Lajpat Nagar Feeder 108",
    discom: "BSES Rajdhani Power Ltd",
    substation: "33/11kV Lajpat Substation",
    ratedCapacityKW: 600,
    currentLoadKW: 380,
    loadingPercentage: 63,
    status: "Watch",
    riskWindow: "19:00 – 21:00",
    predictedPeakKW: 485,
    voltageProfileKV: 10.92,
    nominalKV: 11.0,
    voltageViolationRisk: "Low",
    transformerHealth: 94,
    ambientTempC: 33.8,
    solarConnectedKW: 95,
    bessConnectedKW: 150,
    connectedHouseholds: 320,
    enrolledDRHouseholds: 210,
    lossPercentage: 5.8,
    historicalTrippingEventsMonth: 0,
    coordinates: { lat: 28.5672, lng: 77.2433 }
  },
  {
    id: "F-205",
    name: "Rohini Sector 9 Feeder 205",
    discom: "Tata Power DDL",
    substation: "66/11kV Rohini Grid Substation",
    ratedCapacityKW: 500,
    currentLoadKW: 245,
    loadingPercentage: 49,
    status: "Steady",
    riskWindow: "None",
    predictedPeakKW: 310,
    voltageProfileKV: 11.04,
    nominalKV: 11.0,
    voltageViolationRisk: "None",
    transformerHealth: 98,
    ambientTempC: 32.5,
    solarConnectedKW: 210,
    bessConnectedKW: 300,
    connectedHouseholds: 260,
    enrolledDRHouseholds: 235,
    lossPercentage: 4.2,
    historicalTrippingEventsMonth: 0,
    coordinates: { lat: 28.7154, lng: 77.1182 }
  },
  {
    id: "F-312",
    name: "Saket Business & Residential 312",
    discom: "BSES Rajdhani Power Ltd",
    substation: "33/11kV Mehrauli Grid",
    ratedCapacityKW: 700,
    currentLoadKW: 638,
    loadingPercentage: 91,
    status: "Critical",
    riskWindow: "17:30 – 22:00",
    predictedPeakKW: 692,
    voltageProfileKV: 10.48,
    nominalKV: 11.0,
    voltageViolationRisk: "High (Under-voltage trip threshold 10.45kV)",
    transformerHealth: 82,
    ambientTempC: 36.1,
    solarConnectedKW: 120,
    bessConnectedKW: 200,
    connectedHouseholds: 410,
    enrolledDRHouseholds: 180,
    lossPercentage: 8.9,
    historicalTrippingEventsMonth: 4,
    coordinates: { lat: 28.5244, lng: 77.2167 }
  }
];

// Hourly 24-Hour Forecast Series for Today (Observed up to current hour 15:00, Forecast onward)
export const HOURLY_FORECAST_DATA = [
  { hour: "00:00", observedLoadKW: 140, forecastLoadKW: 142, p10: 130, p90: 155, solarGenKW: 0, batteryPowerKW: -20, status: "Observed" },
  { hour: "02:00", observedLoadKW: 115, forecastLoadKW: 118, p10: 105, p90: 128, solarGenKW: 0, batteryPowerKW: -25, status: "Observed" },
  { hour: "04:00", observedLoadKW: 105, forecastLoadKW: 108, p10: 95,  p90: 118, solarGenKW: 0, batteryPowerKW: -15, status: "Observed" },
  { hour: "06:00", observedLoadKW: 150, forecastLoadKW: 148, p10: 135, p90: 160, solarGenKW: 12, batteryPowerKW: 0,   status: "Observed" },
  { hour: "08:00", observedLoadKW: 220, forecastLoadKW: 215, p10: 195, p90: 235, solarGenKW: 65, batteryPowerKW: -40, status: "Observed" },
  { hour: "10:00", observedLoadKW: 260, forecastLoadKW: 255, p10: 235, p90: 275, solarGenKW: 120, batteryPowerKW: -60, status: "Observed" },
  { hour: "12:00", observedLoadKW: 280, forecastLoadKW: 285, p10: 260, p90: 310, solarGenKW: 145, batteryPowerKW: -50, status: "Observed" },
  { hour: "14:00", observedLoadKW: 295, forecastLoadKW: 290, p10: 270, p90: 315, solarGenKW: 130, batteryPowerKW: -30, status: "Observed" },
  { hour: "16:00", observedLoadKW: null, forecastLoadKW: 310, p10: 285, p90: 340, solarGenKW: 80, batteryPowerKW: 10,  status: "Forecast" },
  { hour: "18:00", observedLoadKW: null, forecastLoadKW: 375, p10: 345, p90: 415, solarGenKW: 15, batteryPowerKW: 80,  status: "Forecast - Stress Window" },
  { hour: "19:00", observedLoadKW: null, forecastLoadKW: 425, p10: 395, p90: 465, solarGenKW: 0,  batteryPowerKW: 120, status: "Forecast - Stress Window" },
  { hour: "20:00", observedLoadKW: null, forecastLoadKW: 438, p10: 405, p90: 475, solarGenKW: 0,  batteryPowerKW: 125, status: "Forecast - Stress Window" },
  { hour: "21:00", observedLoadKW: null, forecastLoadKW: 380, p10: 350, p90: 410, solarGenKW: 0,  batteryPowerKW: 60,  status: "Forecast - Recovery" },
  { hour: "22:00", observedLoadKW: null, forecastLoadKW: 290, p10: 265, p90: 315, solarGenKW: 0,  batteryPowerKW: 0,   status: "Forecast" },
  { hour: "23:00", observedLoadKW: null, forecastLoadKW: 190, p10: 170, p90: 210, solarGenKW: 0,  batteryPowerKW: -30, status: "Forecast" }
];

export const COOPERATIVE_FINANCES = {
  cooperativeName: "Mayur Vihar Urja Sahakari Samiti (Reg. DL/COOP/2025/1104)",
  period: "FY 2026-27 Q2 (Current)",
  grossRevenueINR: 245000,
  discomDRIncentivesINR: 142000,
  solarSurplusSalesINR: 68000,
  batteryArbitrageMarginINR: 35000,
  operatingCostsINR: 88500,
  bessMaintenanceINR: 24000,
  insuranceAndSafetyINR: 14500,
  softwareAndTelemetryINR: 20000,
  operatorStipendINR: 30000,
  netSurplusINR: 156500,
  dividendPoolINR: 93900, // 60% distributed to member households
  capitalReserveINR: 62600, // 40% retained for battery replacement & emergency fund
  avgMemberDividendINR: 484.00,
  projectCapexRecoveryPercentage: 41.5
};

export const COOPERATIVE_GOVERNANCE = {
  activeProposals: [
    {
      id: "P-24",
      title: "Increase Critical Life-Support Battery Reserve from 15% to 20%",
      proposer: "Health & Senior Citizen Committee",
      category: "Battery Policy",
      deadline: "2026-10-10",
      votesFor: 182,
      votesAgainst: 14,
      quorumMet: true,
      status: "Passed - Staged for Implementation",
      summary: "Guarantees a permanent 100 kWh battery block during monsoonal storm warnings to ensure medical oxygen and dialysis equipment never drop."
    },
    {
      id: "P-25",
      title: "Establish 1.5x Multiplier for Voluntary Night-Time (22:00–06:00) Water Pumping",
      proposer: "Water Management Sub-group",
      category: "Tariff Incentive",
      deadline: "2026-10-18",
      votesFor: 142,
      votesAgainst: 38,
      quorumMet: true,
      status: "Active Voting",
      summary: "Incentivize housing society overhead tank pumping during off-peak night solar/wind recharge hours."
    }
  ],
  boardMembers: [
    { name: "Dr. Sudhir K. Sen", role: "President & Resident Representative", term: "2025–2027" },
    { name: "Meenakshi Sundaram", role: "Treasurer & Financial Auditor", term: "2025–2027" },
    { name: "Er. Rameshwar Dayal", role: "Technical Supervisor (Ex-CEA)", term: "2024–2026" },
    { name: "Sunita Devi", role: "Community Welfare Secretary", term: "2025–2027" }
  ]
};

export const MAINTENANCE_TICKETS = [
  {
    id: "TICK-104",
    title: "Distribution Transformer DT-04 Oil Temp Warning",
    feeder: "F-402",
    priority: "High",
    status: "In Progress",
    assignedTo: "Kailash Tech Ops (DISCOM Area Team)",
    reportedAt: "2026-10-03 11:20",
    description: "Oil temperature sensor logged 74.2°C under sustained 82% load. Fan coolant relay inspected.",
    actionTaken: "Secondary cooling radiator fan switch replaced. Temperature normalized to 64.5°C."
  },
  {
    id: "TICK-105",
    title: "Smart Meter SM-DL-882930 Heartbeat Lost (Block C)",
    feeder: "F-402",
    priority: "Medium",
    status: "Open",
    assignedTo: "Field IoT Technician",
    reportedAt: "2026-10-03 13:45",
    description: "Cellular 4G fallback signal packet drop rate > 80% over 4 hours.",
    actionTaken: "Pending field SIM restart."
  },
  {
    id: "TICK-106",
    title: "BESS Cell Module 4 Balancing Duty Cycle Check",
    feeder: "F-402",
    priority: "Low",
    status: "Resolved",
    assignedTo: "BESS Vendor Engineer",
    reportedAt: "2026-10-02 08:30",
    description: "Minor cell delta voltage 14mV during absorption charge.",
    actionTaken: "Passive balancing completed. Delta reduced to 3mV."
  }
];

export const DEVICE_REGISTRY = [
  { id: "DEV-SM-01", type: "Smart Meter L1", protocol: "DLMS/COSEM (IEC 62056)", location: "Household Ingress", count: 280, healthPercentage: 99.1, status: "Online" },
  { id: "DEV-CT-02", type: "Substation CT Clamps L2", protocol: "Modbus RTU / RS485", location: "Feeder Incomer DT-04", count: 12, healthPercentage: 100, status: "Online" },
  { id: "DEV-INV-03", type: "Rooftop Inverter Gateways L3", protocol: "SunSpec Modbus / MQTT", location: "Rooftops", count: 48, healthPercentage: 97.8, status: "Online" },
  { id: "DEV-BESS-04", type: "Community BESS BMS L3", protocol: "CAN 2.0B / Modbus TCP", location: "Micro-BESS Unit 01", count: 1, healthPercentage: 100, status: "Online" },
  { id: "DEV-ADMS-05", type: "DISCOM ADMS Bridge L4", protocol: "IEC 61850 / DNP3", location: "Patparganj Central SCADA", count: 1, healthPercentage: 99.9, status: "Online" }
];

export const MODEL_REGISTRY = [
  {
    id: "MOD-SOLAR-03",
    name: "Solar-Nowcast-Satellite-DL",
    version: "v3.2.1",
    purpose: "Short-term (15-min to 6-hr) solar irradiance & rooftop PV generation forecasting",
    architecture: "Temporal Convolutional Network (TCN) + INSAT-3DR Cloud Imagery Ingestion",
    trainWindow: "2024-01 to 2026-08 (Delhi NCR region)",
    mape: "4.82%",
    p90Coverage: "94.6%",
    lastTrained: "2026-09-20",
    status: "Active Production",
    latencyMs: 42
  },
  {
    id: "MOD-LOAD-02",
    name: "Feeder-Load-Elasticity-XGB",
    version: "v2.1.0",
    purpose: "Feeder baseline demand forecasting and weather-driven air conditioning elasticity",
    architecture: "Gradient Boosted Trees (XGBoost) + Kalpana Weather APIs",
    trainWindow: "2023-06 to 2026-09",
    mape: "3.95%",
    p90Coverage: "96.1%",
    lastTrained: "2026-09-25",
    status: "Active Production",
    latencyMs: 18
  },
  {
    id: "MOD-OPTIM-04",
    name: "Microgrid-Optimal-Dispatch-MILP",
    version: "v4.0.0",
    purpose: "Mixed-Integer Linear Programming battery dispatch, peak-shaving, and life-support security",
    architecture: "Branch-and-Cut MILP Solver with Rolling 24-hr Horizon",
    trainWindow: "Physics & Constraint Engine",
    mape: "N/A (Deterministic)",
    p90Coverage: "100% Feasibility",
    lastTrained: "2026-08-30",
    status: "Active Production",
    latencyMs: 110
  }
];

export const AUDIT_LOG_ENTRIES = [
  {
    id: "AUD-99201",
    timestamp: "2026-10-03 14:15:02 UTC+5:30",
    actor: "Operator: Rajesh K. (ID: OP-04)",
    action: "Manual Battery Dispatch Override",
    category: "Operational Override",
    target: "BESS-01 / Mayur Vihar",
    previousState: "Auto-Dispatch (Economic Optimization)",
    newState: "Forced Discharge (Pre-cooling Grid Support 40 kW)",
    reason: "Pre-empting cloud front detected over East Delhi corridor",
    duration: "60 minutes",
    auditHash: "8f7a9d3e4b1c2a0e5f6d7c8b9a0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e"
  },
  {
    id: "AUD-99200",
    timestamp: "2026-10-03 12:00:00 UTC+5:30",
    actor: "DISCOM Dispatcher: R. Sengupta (ID: DIS-09)",
    action: "Initiate DR Event DR-2026-10-03-EVE",
    category: "Demand Response Dispatch",
    target: "Feeder F-402 (Mayur Vihar)",
    previousState: "Standby",
    newState: "Dispatched Target 45 kW (18:30-21:00)",
    reason: "Feeder load projected at 97% capacity during evening peak",
    duration: "150 minutes",
    auditHash: "3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b"
  },
  {
    id: "AUD-99199",
    timestamp: "2026-10-02 18:00:15 UTC+5:30",
    actor: "System Automated Engine (MILP v4.0)",
    action: "Critical Life-Support Lock Activated",
    category: "Safety Constraint",
    target: "BESS-01 Minimum SOC",
    previousState: "Threshold 15% (75 kWh)",
    newState: "Threshold 20% (100 kWh)",
    reason: "Severe Weather Advisory issued by IMD Delhi",
    duration: "Indefinite",
    auditHash: "7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c"
  },
  {
    id: "AUD-99198",
    timestamp: "2026-10-01 09:30:00 UTC+5:30",
    actor: "Admin: S. Narayanan (ID: ADM-01)",
    action: "Model Registry Promotion",
    category: "Model Deployment",
    target: "Solar-Nowcast-Satellite-DL",
    previousState: "v3.1.8",
    newState: "v3.2.1 (Promoted to Production)",
    reason: "Reduced monsoon cloud ramp error by 14.2% in staging verification",
    duration: "Permanent",
    auditHash: "1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f"
  }
];

// Impact Studio Scenarios (Simulated vs Baseline with strict disclaimers)
export const IMPACT_SCENARIOS = [
  {
    id: "scenario-1",
    name: "Cloudy Monsoonal Week",
    badge: "Weather Disturbance",
    description: "7 consecutive days of 75% cloud cover and intermittent solar ramps over Delhi NCR.",
    baseline: {
      outageHoursWeek: 24.5,
      criticalLoadAvailabilityPercentage: 78.2,
      peakFeederOverloadPercentage: 118,
      transformerMaxTempC: 86.5,
      dieselGenRunHours: 18.0,
      dieselCostTotalINR: 14200,
      voltageViolationsCount: 42
    },
    mohallaGrid: {
      outageHoursWeek: 2.1,
      criticalLoadAvailabilityPercentage: 99.8,
      peakFeederOverloadPercentage: 88,
      transformerMaxTempC: 69.2,
      dieselGenRunHours: 0,
      dieselCostTotalINR: 0,
      voltageViolationsCount: 3
    },
    deltas: {
      outageReductionPercentage: "-91.4%",
      criticalAvailabilityImprovement: "+21.6%",
      dieselSavingsINR: "₹14,200",
      co2AvoidedKg: "284 kg"
    },
    causalChain: [
      { step: "1. ANTICIPATE", detail: "Satellite cloud imagery detects thick convective band 3 hours before solar generation collapse." },
      { step: "2. PROTECT", detail: "Automated WhatsApp & app notification prompts 194 households to pre-cool and defer pumping; battery reserve locked at 35%." },
      { step: "3. RESTORE", detail: "Micro-BESS injects 140 kW during peak drop, preventing feeder overload and transformer trip." },
      { step: "4. PROVE", detail: "Zero unserved critical energy; ₹14,200 diesel expenditure eliminated across society." }
    ]
  },
  {
    id: "scenario-2",
    name: "44°C Peak Summer Heatwave",
    badge: "Extreme Thermal Stress",
    description: "Sustained 44°C ambient temperature with simultaneous residential AC and water pump surge (18:00–23:00).",
    baseline: {
      outageHoursWeek: 38.0,
      criticalLoadAvailabilityPercentage: 64.5,
      peakFeederOverloadPercentage: 134,
      transformerMaxTempC: 98.4, // Dangerous overheating
      dieselGenRunHours: 32.5,
      dieselCostTotalINR: 28900,
      voltageViolationsCount: 88
    },
    mohallaGrid: {
      outageHoursWeek: 3.4,
      criticalLoadAvailabilityPercentage: 99.4,
      peakFeederOverloadPercentage: 92,
      transformerMaxTempC: 76.8,
      dieselGenRunHours: 2.0,
      dieselCostTotalINR: 1800,
      voltageViolationsCount: 6
    },
    deltas: {
      outageReductionPercentage: "-91.0%",
      criticalAvailabilityImprovement: "+34.9%",
      dieselSavingsINR: "₹27,100",
      co2AvoidedKg: "512 kg"
    },
    causalChain: [
      { step: "1. ANTICIPATE", detail: "Thermal elasticity models predict 438 kW surge (exceeding 450 kW rating) at 19:30." },
      { step: "2. PROTECT", detail: "45 kW demand response dispatched; BESS discharges 160 kW into transformer low-voltage bus." },
      { step: "3. RESTORE", detail: "Transformer loading clamped at 84%; no thermal circuit breaker trip." },
      { step: "4. PROVE", detail: "Verified 44.1 kW demand reduction recorded; ₹7,650 incentives credited to residents." }
    ]
  },
  {
    id: "scenario-3",
    name: "4-Hour Grid Feeder Loss (Islanding)",
    badge: "Upstream Grid Blackout",
    description: "Upstream 33kV transmission pole collapse triggers total feeder loss from 17:00 to 21:00.",
    baseline: {
      outageHoursWeek: 4.0,
      criticalLoadAvailabilityPercentage: 0, // Total residential blackout without DG
      peakFeederOverloadPercentage: 0,
      transformerMaxTempC: 45.0,
      dieselGenRunHours: 4.0,
      dieselCostTotalINR: 6400,
      voltageViolationsCount: 12
    },
    mohallaGrid: {
      outageHoursWeek: 0,
      criticalLoadAvailabilityPercentage: 100, // Seamless microgrid islanding
      peakFeederOverloadPercentage: 74,
      transformerMaxTempC: 58.2,
      dieselGenRunHours: 0,
      dieselCostTotalINR: 0,
      voltageViolationsCount: 0
    },
    deltas: {
      outageReductionPercentage: "-100%",
      criticalAvailabilityImprovement: "+100%",
      dieselSavingsINR: "₹6,400",
      co2AvoidedKg: "128 kg"
    },
    causalChain: [
      { step: "1. ANTICIPATE", detail: "Grid frequency & voltage loss sensed in < 16ms by microgrid controller." },
      { step: "2. PROTECT", detail: "Static transfer switch opens; BESS forms local 50Hz reference and maintains microgrid voltage." },
      { step: "3. RESTORE", detail: "Only flexible loads (heavy ACs/EVs) shed; all Tier 1 & Tier 2 protected circuits remain live continuously." },
      { step: "4. PROVE", detail: "100% life-support and refrigeration uptime maintained with zero diesel emissions." }
    ]
  }
];
