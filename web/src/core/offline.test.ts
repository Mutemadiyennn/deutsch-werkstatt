import { describe, expect, it } from "vitest";
import { isRepeatRequest } from "./offline.ts";

describe("PM-035 §4: yapay zekâsız rol oyunu", () => {
  it("tekrar/yavaşlatma isteği tanınır", () => {
    for (const t of ["Können Sie das bitte noch einmal sagen?", "Nochmal, bitte.", "Wie bitte?", "Etwas langsamer, bitte.", "Ich habe das nicht verstanden."]) expect(isRepeatRequest(t)).toBe(true);
    for (const t of ["Ja, passt.", "Am Dienstag um halb neun."]) expect(isRepeatRequest(t)).toBe(false);
  });
});
