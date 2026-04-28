import { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, increment, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LIVE_ANNOUNCEMENT_DOC = doc(db, 'drafts_2025', 'live_announcement_control');
const DEVICE_ID_STORAGE_KEY = 'jais_live_device_id_2025';

export interface LiveAnnouncementState {
  active: boolean;
  message: string;
  loveCount: number;
  startedByDeviceId: string | null;
  lastReaction?: {
    id: string;
    x: number;
    y: number;
    deviceId: string;
  } | null;
}

const defaultLiveAnnouncement: LiveAnnouncementState = {
  active: false,
  message: 'Pengumuman sedang dijalankan',
  loveCount: 0,
  startedByDeviceId: null,
  lastReaction: null,
};

const getOrCreateDeviceId = () => {
  if (typeof window === 'undefined') return 'server-device';

  const savedDeviceId = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (savedDeviceId) return savedDeviceId;

  const nextDeviceId =
    typeof window.crypto?.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, nextDeviceId);
  return nextDeviceId;
};

export const useLiveAnnouncement = () => {
  const [deviceId] = useState(getOrCreateDeviceId);
  const [state, setState] = useState<LiveAnnouncementState>(defaultLiveAnnouncement);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      LIVE_ANNOUNCEMENT_DOC,
      (snapshot) => {
        if (!snapshot.exists()) {
          setState(defaultLiveAnnouncement);
          return;
        }

        const data = snapshot.data();
        setState({
          active: Boolean(data.active),
          message: typeof data.message === 'string' && data.message.trim() ? data.message : defaultLiveAnnouncement.message,
          loveCount: typeof data.loveCount === 'number' ? data.loveCount : 0,
          startedByDeviceId: typeof data.startedByDeviceId === 'string' ? data.startedByDeviceId : null,
          lastReaction: data.lastReaction && typeof data.lastReaction === 'object'
            ? {
                id: typeof data.lastReaction.id === 'string' ? data.lastReaction.id : '',
                x: typeof data.lastReaction.x === 'number' ? data.lastReaction.x : 0.5,
                y: typeof data.lastReaction.y === 'number' ? data.lastReaction.y : 0.5,
                deviceId: typeof data.lastReaction.deviceId === 'string' ? data.lastReaction.deviceId : '',
              }
            : null,
        });
        setError('');
      },
      (snapshotError) => {
        console.error('Live announcement listener failed', snapshotError);
        setError('Live announcement tidak dapat disambungkan. Semak sambungan internet atau Firestore rules.');
      }
    );

    return unsubscribe;
  }, []);

  const isAdminDevice = useMemo(
    () => Boolean(state.active && state.startedByDeviceId === deviceId),
    [deviceId, state.active, state.startedByDeviceId]
  );

  const shouldShowOverlay = useMemo(
    () => Boolean(state.active && state.startedByDeviceId !== deviceId),
    [deviceId, state.active, state.startedByDeviceId]
  );

  const startAnnouncement = useCallback(async () => {
    setError('');
    try {
      await setDoc(
        LIVE_ANNOUNCEMENT_DOC,
        {
          active: true,
          message: defaultLiveAnnouncement.message,
          loveCount: 0,
          lastReaction: null,
          startedByDeviceId: deviceId,
          startedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (startError) {
      console.error('Failed to start live announcement', startError);
      setError('Pengumuman gagal dimulakan. Semak sambungan internet atau Firestore rules.');
    }
  }, [deviceId]);

  const stopAnnouncement = useCallback(async () => {
    setError('');
    try {
      await setDoc(
        LIVE_ANNOUNCEMENT_DOC,
        {
          active: false,
          updatedAt: serverTimestamp(),
          endedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (stopError) {
      console.error('Failed to stop live announcement', stopError);
      setError('Pengumuman gagal dihentikan. Semak sambungan internet atau Firestore rules.');
    }
  }, []);

  const sendLove = useCallback(async (position?: { x: number; y: number }) => {
    try {
      await updateDoc(LIVE_ANNOUNCEMENT_DOC, {
        loveCount: increment(1),
        lastReaction: {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          x: Math.max(0, Math.min(1, position?.x ?? 0.5)),
          y: Math.max(0, Math.min(1, position?.y ?? 0.5)),
          deviceId,
        },
        updatedAt: serverTimestamp(),
      });
    } catch (loveError) {
      console.error('Failed to send live reaction', loveError);
    }
  }, [deviceId]);

  return {
    deviceId,
    error,
    isAdminDevice,
    shouldShowOverlay,
    state,
    startAnnouncement,
    stopAnnouncement,
    sendLove,
  };
};
