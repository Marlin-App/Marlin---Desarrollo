import { useCallback } from 'react';

const useDecodeJWT = () => {
  const base64UrlDecode = useCallback((base64Url) => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    return decodeURIComponent(escape(atob(base64)));
  }, []);

  const decodeJWT = useCallback((token) => {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = base64UrlDecode(header);
    const decodedPayload = base64UrlDecode(payload);

    const headerObj = JSON.parse(decodedHeader);
    const payloadObj = JSON.parse(decodedPayload);

    return {
      header: headerObj,
      payload: payloadObj,
      signature: signature
    };
  }, [base64UrlDecode]);

  return { decodeJWT };
};

export default useDecodeJWT;
