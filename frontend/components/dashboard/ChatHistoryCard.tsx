'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getChatSessions, type ChatSessionSummary } from '@/lib/chat-api';

export function ChatHistoryCard() {
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('accessToken');

        if (!token) {
          setError('Please login first.');
          return;
        }

        const data = await getChatSessions(token);
        setSessions(data.sessions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load chat history',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();

    function handleChatChanged() {
      fetchSessions();
    }

    window.addEventListener('chat-changed', handleChatChanged);

    return () => {
      window.removeEventListener('chat-changed', handleChatChanged);
    };
  }, []);

  return (
    <div className="rounded-[2rem] border border-[#eadff0] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-400">
          AI Chat History
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-800">
          Recent Conversations
        </h2>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading chat history...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-red-500">{error}</p>
      ) : sessions.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4">
          <p className="text-sm font-medium text-slate-700">
            No chat history yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Your future AI skincare conversations will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href="/ai-chat"
              className="block rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(236,72,153,0.08)]"
            >
              <p className="text-sm font-semibold text-slate-800">
                {session.title || 'New Chat'}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                {session.preview || 'No messages yet'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}