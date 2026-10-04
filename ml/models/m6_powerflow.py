import pandapower as pp
import pandapower.networks as nw

import os

def create_mock_feeder():
    """
    Creates a feeder using the user-provided IEEE 33-bus JSON if available, 
    otherwise falls back to CIGRE LV network. Rescales to Indian 11kV conditions.
    """
    json_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'case33bw.json'))
    if os.path.exists(json_path):
        net = pp.from_json(json_path)
        # Rescale to Indian Conditions (11 kV instead of 12.66 kV)
        net.bus.loc[:, 'vn_kv'] = 11.0
        # Line parameters can be left as is, or scaled. For now, voltage scaling is the primary requirement.
        return net
    return nw.create_cigre_network_lv()

def validate_dispatch(net, bus_id, net_injection_kw):
    """
    Validates if injecting/drawing `net_injection_kw` at `bus_id` causes violations.
    net_injection_kw > 0: Battery is discharging to the grid (export)
    net_injection_kw < 0: Battery is charging from the grid (import)
    """
    # Find the load attached to this bus, or create one to represent the battery
    # In Pandapower, load positive means consuming from grid.
    # So if battery charges, it's a positive load.
    
    # We add a static generator (sgen) to represent the battery
    # sgen positive = exporting to grid (discharging)
    pp.create_sgen(net, bus_id, p_mw=net_injection_kw / 1000.0, q_mvar=0, name="Battery_System")
    
    # Run Newton-Raphson power flow
    try:
        pp.runpp(net)
    except pp.powerflow.LoadflowNotConverged:
        return False, "Power flow did not converge. Extreme voltage collapse."
        
    # Check constraints
    v_min = 0.94 # -6%
    v_max = 1.06 # +6%
    
    max_v = net.res_bus.vm_pu.max()
    min_v = net.res_bus.vm_pu.min()
    
    max_loading = net.res_line.loading_percent.max()
    max_trafo_loading = net.res_trafo.loading_percent.max()
    
    violations = []
    
    if min_v < v_min:
        violations.append(f"Undervoltage detected: {min_v:.3f} pu")
    if max_v > v_max:
        violations.append(f"Overvoltage detected: {max_v:.3f} pu")
    if max_trafo_loading > 100:
        violations.append(f"Transformer overload: {max_trafo_loading:.1f}%")
        
    is_valid = len(violations) == 0
    msg = "Valid" if is_valid else "; ".join(violations)
    
    return is_valid, msg

if __name__ == "__main__":
    print("Initializing M6 Power Flow Validation...")
    net = create_mock_feeder()
    print(net)
    
    print("\nTesting 50 kW Discharge (Export)...")
    valid, msg = validate_dispatch(net, bus_id=5, net_injection_kw=50.0)
    print(f"Result: {valid} | {msg}")
    
    print("\nTesting 500 kW Charge (Import - likely to cause undervoltage)...")
    valid, msg = validate_dispatch(net, bus_id=5, net_injection_kw=-500.0)
    print(f"Result: {valid} | {msg}")
