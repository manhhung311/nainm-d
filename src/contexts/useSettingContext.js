import { useContext } from 'react';
import { SettingsContext } from './SettingsContext';

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};
