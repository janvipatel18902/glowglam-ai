const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ChatSessionSummary = {
    id: string;
    title: string | null;
    updatedAt: string;
    preview: string | null;
};

export type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
};

export async function createChatSession(token: string) {
    const response = await fetch(`${API_URL}/chat/sessions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Failed to create chat session');
    }

    return data as {
        session: {
            id: string;
            title: string | null;
            updatedAt: string;
            messages: ChatMessage[];
        };
    };
}

export async function getChatSessions(token: string) {
    const response = await fetch(`${API_URL}/chat/sessions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch chat sessions');
    }

    return data as { sessions: ChatSessionSummary[] };
}

export async function getChatSessionById(id: string, token: string) {
    const response = await fetch(`${API_URL}/chat/sessions/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch chat session');
    }

    return data as {
        session: {
            id: string;
            title: string | null;
            updatedAt: string;
            messages: ChatMessage[];
        };
    };
}

export async function sendChatMessage(
    id: string,
    content: string,
    token: string,
) {
    const response = await fetch(`${API_URL}/chat/sessions/${id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Failed to send chat message');
    }

    return data as {
        sessionId: string;
        messages: ChatMessage[];
    };
}