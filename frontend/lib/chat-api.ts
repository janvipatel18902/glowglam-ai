const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
};

export type ChatSession = {
    id: string;
    title: string;
    updatedAt: string;
    preview?: string | null;
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
            title: string;
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

    return data as {
        sessions: ChatSession[];
    };
}

export async function getChatSessionById(sessionId: string, token: string) {
    const response = await fetch(`${API_URL}/chat/sessions/${sessionId}`, {
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
            title: string;
            updatedAt: string;
            messages: ChatMessage[];
        };
    };
}

export async function sendChatMessage(
    sessionId: string,
    content: string,
    token: string,
) {
    const response = await fetch(`${API_URL}/chat/sessions/${sessionId}/messages`, {
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

export async function streamChatMessage(
    sessionId: string,
    content: string,
    token: string,
    onChunk: (chunk: string) => void,
) {
    const response = await fetch(
        `${API_URL}/chat/sessions/${sessionId}/messages/stream`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        },
    );

    if (!response.ok) {
        let message = 'Failed to stream chat message';

        try {
            const data = await response.json();
            message = data?.message || message;
        } catch {
            // ignore json parse errors
        }

        throw new Error(message);
    }

    if (!response.body) {
        throw new Error('No response stream received');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
            onChunk(chunk);
        }
    }
}