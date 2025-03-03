import React from "react";
import "./AgreementLabel.css";
import NotAgreeIcon from "../../assets/icon/notagree.svg";
import CheckAgreeIcon from "../../assets/icon/checkagree.svg";

interface LabelProps {
  children: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  bold?: boolean;
}

const AgreementLabel: React.FC<LabelProps> = ({
  children,
  checked,
  onChange,
  disabled = false,
  bold = false,
}) => {
  return (
    <label className={`agree-container ${bold ? "bold" : ""}`}>
      <img src={NotAgreeIcon} alt="동의 여부" />
      {checked && (
        <img
          src={CheckAgreeIcon}
          alt="동의"
          className={`green-check ${bold ? "bold" : ""}`}
        />
      )}
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="hidden-checkbox"
      />
      {children}
    </label>
  );
};

export default AgreementLabel;
