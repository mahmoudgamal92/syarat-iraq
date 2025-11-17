// DebugBase64.ts (add near your screen or utils)
export const validateBase64String = (s?: string) => {
    if (!s) return { ok: false, reason: 'empty' };

    // raw string & trimmed
    const raw = typeof s === 'string' ? s : String(s);
    const trimmed = raw.trim();

    const isDataUri = /^data:image\/[a-zA-Z]+;base64,/.test(trimmed);
    const withoutPrefix = trimmed.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    const length = withoutPrefix.length;
    const approxBytes = Math.floor(length * 3 / 4);

    // base64 allowed charset (A-Z a-z 0-9 + / =) and newlines are sometimes present
    const invalidChars = withoutPrefix.match(/[^A-Za-z0-9+/=]/g) || [];
    const invalidCount = invalidChars.length;

    return {
        ok: invalidCount === 0,
        isDataUri,
        rawLength: raw.length,
        cleanLength: length,
        approxBytes,
        invalidCount,
        first200: trimmed.slice(0, 200),
        last200: trimmed.slice(-200),
    };
};

export const debugOne = (s?: string) => {
    const r = validateBase64String(s);
    console.log('--- Base64 DEBUG ---');
    console.log('ok:', r.ok);
    console.log('isDataUri:', r.isDataUri);
    console.log('rawLength:', r.rawLength);
    console.log('cleanLength:', r.cleanLength);
    console.log('approxBytes (≈):', r.approxBytes);
    console.log('invalidCount:', r.invalidCount);
    console.log('first200:', r.first200);
    console.log('last200:', r.last200);
    console.log('--- end debug ---');
    return r;
};
