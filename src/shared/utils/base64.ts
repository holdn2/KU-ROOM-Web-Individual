/**
 * Base64로 인코딩된 UTF-8 문자열을 디코딩합니다.
 * @param base64String Base64 인코딩된 문자열
 * @returns 디코딩된 UTF-8 문자열
 * @throws {Error} 유효하지 않은 Base64 문자열인 경우
 */
export function decodeBase64ToUTF8(base64String: string): string {
  try {
    const binaryString = atob(base64String);
    const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  } catch (error) {
    throw new Error(
      `Base64 디코딩 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`
    );
  }
}
