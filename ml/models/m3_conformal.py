import pandas as pd
import numpy as np

class AdaptiveConformalInference:
    def __init__(self, alpha, gamma=0.01):
        """
        Adaptive Conformal Inference (ACI) for time series.
        alpha: Target miscoverage rate (e.g., 0.1 for 90% coverage)
        gamma: Learning rate for updating the quantile adjustment
        """
        self.alpha = alpha
        self.gamma = gamma
        self.alpha_t = alpha
        
    def calibrate(self, residuals):
        """
        Initial calibration over a hold-out set to find the baseline correction.
        residuals: Non-conformity scores (e.g., max(lower - y, y - upper))
        """
        # Find the empirical (1 - alpha) quantile of the residuals
        # Adding small correction for finite sample
        n = len(residuals)
        q_idx = int(np.ceil((n + 1) * (1 - self.alpha))) / n
        q_idx = min(q_idx, 1.0)
        self.baseline_correction = np.quantile(residuals, q_idx)
        return self.baseline_correction

    def update(self, covered):
        """
        Update the target alpha based on whether the previous step was covered.
        covered: boolean (True if true value was within the interval)
        """
        err = 1 if not covered else 0
        self.alpha_t = self.alpha_t + self.gamma * (self.alpha - err)
        
        # Keep alpha_t in bounds (0.01, 0.99)
        self.alpha_t = max(0.01, min(0.99, self.alpha_t))
        return self.alpha_t

def conformalize_forecasts(y_true, y_pred_lower, y_pred_upper, alpha=0.1):
    """
    Applies simple CQR to calibrate the prediction intervals.
    Returns the correction term.
    """
    # Non-conformity score for interval [lower, upper]
    # E_i = max(lower_i - y_i, y_i - upper_i)
    scores = np.maximum(y_pred_lower - y_true, y_true - y_pred_upper)
    
    n = len(scores)
    q_level = min((n + 1) * (1 - alpha) / n, 1.0)
    
    correction = np.quantile(scores, q_level)
    return correction

if __name__ == "__main__":
    print("Testing Conformal Inference...")
    np.random.seed(42)
    
    # Simulate data
    y = np.sin(np.linspace(0, 10, 100)) + np.random.normal(0, 0.1, 100)
    y_lower = y - 0.2
    y_upper = y + 0.2
    
    # Check coverage before
    cov_before = np.mean((y >= y_lower) & (y <= y_upper))
    print(f"Coverage before calibration: {cov_before:.2f}")
    
    correction = conformalize_forecasts(y, y_lower, y_upper, alpha=0.1)
    
    y_lower_calibrated = y_lower - correction
    y_upper_calibrated = y_upper + correction
    
    cov_after = np.mean((y >= y_lower_calibrated) & (y <= y_upper_calibrated))
    print(f"Coverage after calibration (target 0.90): {cov_after:.2f}")
    print(f"Correction applied: {correction:.4f}")
