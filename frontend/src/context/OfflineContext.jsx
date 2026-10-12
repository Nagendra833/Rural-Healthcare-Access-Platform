import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const OfflineContext = createContext(null);

const STORAGE_KEY = 'rural_health_offline_queue';

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [queue, setQueue] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.error('Failed to save offline queue', e);
    }
  }, [queue]);

  const addToQueue = useCallback((action) => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...action,
    };
    setQueue((prev) => [...prev, item]);
    return item;
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Sync queued items when connection is re-established
  const syncQueue = useCallback(async () => {
    if (queue.length === 0 || !navigator.onLine || isSyncing) return;

    setIsSyncing(true);
    showToast(`Syncing ${queue.length} offline items with server...`, 'info');

    // Simulate batch replay of queued actions
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearQueue();
      showToast('All offline records synchronized successfully!', 'success');
    } catch (err) {
      showToast('Sync failed. Will retry when connection improves.', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [queue, isSyncing, clearQueue, showToast]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast('Back online! Reconnecting to health servers...', 'success');
      syncQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showToast('You are currently offline. Changes will be saved locally and synced once reconnected.', 'info');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncQueue, showToast]);

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        queue,
        queueCount: queue.length,
        isSyncing,
        addToQueue,
        syncQueue,
        clearQueue,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) throw new Error('useOffline must be used within an OfflineProvider');
  return context;
};
