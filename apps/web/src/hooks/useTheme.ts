import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { setMode, $mode } from '../context/mode';

export const useTheme = () => {
  // TODO: rename "mode" to "theme"
  const mode = useStore($mode);

  const toggleTheme = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'));
      setMode('light');
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'));
      setMode('dark');
    }
  };

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('mode') as string);

    if (localTheme) {
      setMode(localTheme);
    }

    // FIXME: check if need return for deleting mode from localStorage on unmount
  }, []);

  return { toggleTheme };
};
