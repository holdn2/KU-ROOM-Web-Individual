import type { GuideStep } from "../types";

const StepBadge = ({ icon, label, isCircle }: GuideStep) => {
  const className = isCircle
    ? "pwa-guide-step-badge pwa-guide-step-dots"
    : "pwa-guide-step-badge";

  return (
    <span className={className}>
      <img src={icon} alt={label ?? ""} className="pwa-guide-icon" />
      {label}
    </span>
  );
};

export default StepBadge;
