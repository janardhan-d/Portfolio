import { useEffect } from 'react';

// Close a modal on Escape. Attach inside any modal component:
//   useEscapeKey(isOpen, onClose)
export function useEscapeKey(isActive, handler) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handler();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handler]);
}
