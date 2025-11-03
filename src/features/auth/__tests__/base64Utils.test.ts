import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64 } from "../services/encrypt";

describe("Base64 utils", () => {
  it("encodeBase64 codifica correctamente una cadena", () => {
    const result = encodeBase64("hola");
    expect(result).toBe(btoa("hola"));
  });

  it("decodeBase64 decodifica correctamente una cadena", () => {
    const encoded = btoa("test string");
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe("test string");
  });

  it("encodeBase64 devuelve string vacío si el input no es string", () => {
    // @ts-expect-error testing invalid input
    expect(encodeBase64(1234)).toBe("");
  });

  it("decodeBase64 devuelve string vacío si el input no es string", () => {
    // @ts-expect-error testing invalid input
    expect(decodeBase64(1234)).toBe("");
  });
});
