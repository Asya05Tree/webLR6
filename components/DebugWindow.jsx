import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNavigationHistory } from '../hooks/useNavigationHistory';
import styles from '../styles/DebugWindow.module.css';

const DebugWindow = ({ isVisible }) => {
  const { history, clearHistory } = useNavigationHistory();
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames={{
        enter: styles['debug-window-enter'],
        enterActive: styles['debug-window-enter-active'],
        exit: styles['debug-window-exit'],
        exitActive: styles['debug-window-exit-active'],
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={styles['debug-container']}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={{
            appear: styles['neon-fade-appear'],
            appearActive: styles['neon-fade-appear-active'],
            enter: styles['neon-fade-enter'],
            enterActive: styles['neon-fade-enter-active'],
          }}
          unmountOnExit
        >
          <div className={styles['debug-content']}>
            <h3 className={styles['neon-text']}>Navigation History</h3>
            <TransitionGroup component="ul" className={styles['history-list']}>
              {history.map((item, index) => (
                <CSSTransition
                  key={`${item.path}-${item.timestamp}`}
                  timeout={300}
                  classNames={{
                    enter: styles['history-item-enter'],
                    enterActive: styles['history-item-enter-active'],
                    exit: styles['history-item-exit'],
                    exitActive: styles['history-item-exit-active'],
                  }}
                >
                  <li className={styles['history-item']}>
                    <span>{item.path}</span>
                    <small>{new Date(item.timestamp).toLocaleTimeString()}</small>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <button onClick={clearHistory} className={styles['clear-button']}>
              Clear History
            </button>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default DebugWindow;