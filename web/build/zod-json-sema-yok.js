// Yalnız derleme (PM-124 md. 4.2; `vite.config.ts` `paketInceltme`): zod'un JSON şeması üreticisinin yerine geçer.
// Uygulama JSON şeması üretmez (`toJSONSchema` hiçbir yerde yok); zod "classic" bu modülleri her şemaya bağladığı için
// ağaç sarsma onları atamıyordu (≈ 17 KB ham, 5,4 KB gzip). Çağrılırsa açık hata verir; doğrulama (`parse`, `safeParse`,
// `~standard.validate`) bu modüllere dokunmaz. zod yeni bir ad isterse derleme "eksik dışa aktarım" ile durur.
const yok = () => { throw new Error("JSON şeması bu pakette yok"); };
// to-json-schema.js
export const createToJSONSchemaMethod = () => yok;
export const createStandardJSONSchemaMethod = () => yok;
export const initializeContext = yok, handleUnrepresentable = yok, processSchema = yok, extractDefs = yok, finalize = yok;
export { processSchema as process };
// json-schema-processors.js
export const aggregateChecks = yok, toJSONSchema = yok, allProcessors = {};
export const anyProcessor = yok, arrayProcessor = yok, bigintProcessor = yok, booleanProcessor = yok, catchProcessor = yok,
  customProcessor = yok, dateProcessor = yok, defaultProcessor = yok, enumProcessor = yok, fileProcessor = yok, functionProcessor = yok,
  intersectionProcessor = yok, lazyProcessor = yok, literalProcessor = yok, mapProcessor = yok, nanProcessor = yok, neverProcessor = yok,
  nonoptionalProcessor = yok, nullProcessor = yok, nullableProcessor = yok, numberProcessor = yok, objectProcessor = yok,
  optionalProcessor = yok, pipeProcessor = yok, prefaultProcessor = yok, promiseProcessor = yok, readonlyProcessor = yok,
  recordProcessor = yok, setProcessor = yok, stringProcessor = yok, successProcessor = yok, symbolProcessor = yok,
  templateLiteralProcessor = yok, transformProcessor = yok, tupleProcessor = yok, undefinedProcessor = yok, unionProcessor = yok,
  unknownProcessor = yok, voidProcessor = yok;
