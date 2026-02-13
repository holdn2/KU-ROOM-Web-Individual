import type { GuideCardData } from "../types";
import StepBadge from "./StepBadge";

const GuideCard = ({ title, screenshots, positionLabel, steps }: GuideCardData) => {
  return (
    <div className="pwa-guide-card">
      <div className="pwa-guide-card-header">{title}</div>
      <div className="pwa-guide-card-body">
        <div className="pwa-guide-screenshots">
          <img
            src={screenshots.left}
            alt={`${screenshots.alt} 브라우저`}
            className="pwa-guide-img-left"
          />
          <img
            src={screenshots.right}
            alt={`${screenshots.alt} 메뉴`}
            className="pwa-guide-img-right"
          />
        </div>
        <div className="pwa-guide-steps">
          <span className="pwa-guide-step-label">{positionLabel}</span>
          {steps.map((step, index) => (
            <span key={index} style={{ display: "contents" }}>
              {index > 0 && <span className="pwa-guide-step-arrow">→</span>}
              <StepBadge {...step} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
