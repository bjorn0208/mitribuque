// @ts-check
/* Cliente da brapi.dev (lado do servidor).
   O token vem de process.env.BRAPI_TOKEN e nunca é enviado ao navegador.
   Contrato: GET https://brapi.dev/api/v2/stocks/quote?symbols=… (OpenAPI em https://brapi.dev/openapi.json) */

const URL_COTACAO = "https://brapi.dev/api/v2/stocks/quote";

/**
 * Dados de cotação devolvidos em `results[n].data`.
 * @typedef {object} CotacaoBrapi
 * @property {string} shortName
 * @property {string} longName
 * @property {string} currency
 * @property {number} regularMarketPrice
 * @property {number} regularMarketDayHigh
 * @property {number} regularMarketDayLow
 * @property {string} regularMarketDayRange
 * @property {number} regularMarketChange
 * @property {number} regularMarketChangePercent
 * @property {string} regularMarketTime
 * @property {number} marketCap
 * @property {number} regularMarketVolume
 * @property {number} regularMarketPreviousClose
 * @property {number} regularMarketOpen
 * @property {string} fiftyTwoWeekRange
 * @property {number} fiftyTwoWeekLow
 * @property {number} fiftyTwoWeekHigh
 * @property {string} logourl
 */

/**
 * @typedef {object} RespostaCotacaoBrapi
 * @property {Array<{ requestedSymbol: string, symbol: string, changed: boolean, data: CotacaoBrapi }>} results
 * @property {string} requestedAt
 * @property {number} took
 */

/** Erro de chamada à brapi, com o status HTTP e o código devolvido pela API. */
export class ErroBrapi extends Error {
  /**
   * @param {string} mensagem
   * @param {number} status HTTP da brapi (0 = falha de rede/tempo esgotado)
   * @param {string} [codigo] campo `code` da brapi, quando houver
   */
  constructor(mensagem, status, codigo) {
    super(mensagem);
    this.name = "ErroBrapi";
    this.status = status;
    this.codigo = codigo;
  }
}

/**
 * Busca a cotação de um ativo na brapi e devolve `results[0].data`.
 * @param {string} simbolo Ticker, ex.: "B3SA3"
 * @param {{ token?: string, fetch?: typeof fetch, timeoutMs?: number }} [opcoes]
 * @returns {Promise<CotacaoBrapi>}
 * @throws {ErroBrapi}
 */
export async function buscarCotacao(simbolo, opcoes = {}) {
  const ticker = String(simbolo || "").trim().toUpperCase();
  if (!/^[A-Z0-9^.=-]{1,20}$/.test(ticker)) throw new ErroBrapi("Símbolo inválido.", 400, "SIMBOLO_INVALIDO");

  const token = opcoes.token ?? process.env.BRAPI_TOKEN;
  if (!token) throw new ErroBrapi("BRAPI_TOKEN não está definido no ambiente do servidor.", 0, "SEM_TOKEN");

  const url = new URL(URL_COTACAO);
  url.searchParams.set("symbols", ticker);

  /** @type {Response} */
  let resposta;
  try {
    resposta = await (opcoes.fetch ?? fetch)(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(opcoes.timeoutMs ?? 8000),
    });
  } catch (erro) {
    const tempo = erro instanceof Error && erro.name === "TimeoutError";
    throw new ErroBrapi(tempo ? "A brapi não respondeu a tempo." : "Falha de rede ao consultar a brapi.", 0, tempo ? "TEMPO_ESGOTADO" : "REDE");
  }

  if (!resposta.ok) {
    /** @type {{ message?: string, code?: string }} */
    let corpo = {};
    try { corpo = await resposta.json(); } catch { /* corpo não é JSON */ }
    throw new ErroBrapi(corpo.message || `A brapi respondeu HTTP ${resposta.status}.`, resposta.status, corpo.code);
  }

  /** @type {RespostaCotacaoBrapi} */
  const json = await resposta.json();
  const dados = json?.results?.[0]?.data;
  if (!dados) throw new ErroBrapi(`Nenhuma cotação encontrada para ${ticker}.`, 404, "SEM_RESULTADO");
  return dados;
}
