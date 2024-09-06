export async function fetchFlashcardsEndpoint(endpoint, obj) {
    const BASE_URL = 'https://schoology-flashcards.fly.dev/flashcards/';
    const CORS_URL = 'https://cloudflare-cors-anywhere.jwseph.workers.dev/?';
    return await fetch(CORS_URL + encodeURIComponent(BASE_URL + endpoint), obj);
}