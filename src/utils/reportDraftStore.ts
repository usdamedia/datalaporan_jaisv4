import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface RemoteDraftRecord {
  dept_key: string;
  dept_name: string;
  data: Record<string, any>;
  updated_at: string;
}

const TABLE_NAME = 'form_drafts';

export const fetchRemoteDraft = async (deptKey: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('dept_key, dept_name, data, updated_at')
    .eq('dept_key', deptKey)
    .maybeSingle<RemoteDraftRecord>();

  if (error) {
    throw error;
  }

  return data;
};

export const upsertRemoteDraft = async (
  deptKey: string,
  deptName: string,
  data: Record<string, any>
) => {
  if (!supabase) return null;

  const payload = {
    dept_key: deptKey,
    dept_name: deptName,
    data,
    updated_at: new Date().toISOString(),
  };

  const { data: saved, error } = await supabase
    .from(TABLE_NAME)
    .upsert(payload, { onConflict: 'dept_key' })
    .select('dept_key, dept_name, data, updated_at')
    .single<RemoteDraftRecord>();

  if (error) {
    throw error;
  }

  return saved;
};

export const subscribeToRemoteDraft = (
  deptKey: string,
  onChange: (draft: RemoteDraftRecord) => void
) => {
  if (!supabase) return null;

  const channel: RealtimeChannel = supabase
    .channel(`form_drafts:${deptKey}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: TABLE_NAME,
        filter: `dept_key=eq.${deptKey}`,
      },
      (payload) => {
        if (payload.eventType === 'DELETE') return;

        const next = payload.new as RemoteDraftRecord | undefined;
        if (next) {
          onChange(next);
        }
      }
    )
    .subscribe();

  return channel;
};

export const unsubscribeFromRemoteDraft = async (channel: RealtimeChannel | null) => {
  if (!supabase || !channel) return;
  await supabase.removeChannel(channel);
};
