import { apiFetch } from './api';

export type CreateContactPayload = {
    fullName: string;
    email: string;
    message: string;
};

export async function createContactSubmission(payload: CreateContactPayload) {
    return apiFetch<{
        message: string;
        submission: {
            id: string;
            fullName: string;
            email: string;
            message: string;
            createdAt: string;
        };
    }>('/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}