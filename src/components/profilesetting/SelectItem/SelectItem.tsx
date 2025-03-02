import React from 'react';
import './SelectItem.css';

interface SelectItemProps {
  text: string;
  onClick: () => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  text,
  onClick
}) => {
  return (
    <div className="select-item" onClick={onClick}>
      {text}
    </div>
  );
};

export default SelectItem;