// ToggleSwitch.jsx
import React from 'react';
import styles from '../styles/ToggleSwitch.module.css';

const ToggleSwitch = ({ isChecked, onToggle, leftLabel, rightLabel }) => {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.toggleLabel}>{leftLabel}</span>
      <label className={styles.themeSwitch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className={styles.input}
        />
        <span className={styles.slider}></span>
      </label>
      <span className={styles.toggleLabel}>{rightLabel}</span>
    </div>
  );
};

export default ToggleSwitch;