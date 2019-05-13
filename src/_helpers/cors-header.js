export function corsHeader() {
    // return authorization header with jwt token
    return { 'Access-Control-Allow-Origin': 'http://localhost:8000' };
}