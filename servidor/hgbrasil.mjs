// @ts-check
/* Cliente da HG Brasil Weather (lado do servidor).
   A chave vem de process.env.HGBRASIL_KEY e nunca é enviada ao navegador.
   Endpoint: GET https://api.hgbrasil.com/weather?city_name=Cidade,UF&key=… */

const URL_CLIMA = "https://api.hgbrasil.com/weather";

/**
 * @typedef {object} PrevisaoHGBrasil
 * @property {string} date
 * @property {string} weekday
 * @property {number} max
 * @property {number} min
 * @property {number} rain_probability
 * @property {string} description
 * @property {string} condition
 */

/**
 * Campos usados de `results` da HG Brasil.
 * @typedef {object} ClimaHGBrasil
 * @property {number} temp
 * @property {string} description
 * @property {string} city
 * @property {string} city_name
 * @property {number} humidity
 * @property {string} wind_speedy
 * @property {string} currently "dia" | "noite"
 * @property {string} condition_slug
 * @property {string} sunrise
 * @property {string} sunset
 * @property {string} date
 * @property {string} time
 * @property {PrevisaoHGBrasil[]} forecast
 */

/**
 * @typedef {object} RespostaHGBrasil
 * @property {string} by "city_name" quando a cidade foi resolvida; "default" quando a API caiu no padrão
 * @property {boolean} valid_key
 * @property {ClimaHGBrasil} results
 */

export class ErroHGBrasil extends Error {
  /**
   * @param {string} mensagem
   * @param {number} status HTTP (0 = rede/tempo esgotado)
   * @param {string} [codigo]
   */
  constructor(mensagem, status, codigo) {
    super(mensagem);
    this.name = "ErroHGBrasil";
    this.status = status;
    this.codigo = codigo;
  }
}

/**
 * Busca o clima atual de uma cidade ("Curitiba,PR").
 * Atenção: sem chave válida a HG Brasil responde 200 com o clima de São Paulo;
 * por isso `valid_key: false` e `by: "default"` viram erro em vez de dado errado.
 * @param {string} cidade Formato "Nome,UF"
 * @param {{ chave?: string, fetch?: typeof fetch, timeoutMs?: number }} [opcoes]
 * @returns {Promise<ClimaHGBrasil>}
 * @throws {ErroHGBrasil}
 */
export async function buscarClima(cidade, opcoes = {}) {
  const alvo = String(cidade || "").trim();
  if (!/^[\p{L}\p{M} '.-]{2,60},\s?[A-Za-z]{2}$/u.test(alvo)) throw new ErroHGBrasil('Use o formato "Cidade,UF".', 400, "CIDADE_INVALIDA");

  const chave = opcoes.chave ?? process.env.HGBRASIL_KEY;
  if (!chave) throw new ErroHGBrasil("HGBRASIL_KEY não está definida no ambiente do servidor.", 0, "SEM_CHAVE");

  const url = new URL(URL_CLIMA);
  url.searchParams.set("city_name", alvo);
  url.searchParams.set("key", chave);

  /** @type {Response} */
  let resposta;
  try {
    resposta = await (opcoes.fetch ?? fetch)(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(opcoes.timeoutMs ?? 8000) });
  } catch (erro) {
    const tempo = erro instanceof Error && erro.name === "TimeoutError";
    throw new ErroHGBrasil(tempo ? "A HG Brasil não respondeu a tempo." : "Falha de rede ao consultar a HG Brasil.", 0, tempo ? "TEMPO_ESGOTADO" : "REDE");
  }
  if (!resposta.ok) throw new ErroHGBrasil(`A HG Brasil respondeu HTTP ${resposta.status}.`, resposta.status);

  /** @type {RespostaHGBrasil} */
  let json;
  try { json = await resposta.json(); } catch { throw new ErroHGBrasil("Resposta da HG Brasil não é JSON.", 502, "RESPOSTA_INVALIDA"); }
  if (json.valid_key === false) throw new ErroHGBrasil("Chave da HG Brasil inválida.", 401, "CHAVE_INVALIDA");
  if (json.by === "default" || !json.results) throw new ErroHGBrasil(`Cidade não encontrada: ${alvo}.`, 404, "CIDADE_NAO_ENCONTRADA");
  return json.results;
}

/* ======================== Finance v2: cotações da B3 ======================== */

const URL_COTACOES = "https://api.hgbrasil.com/v2/finance/quotes";

/**
 * Ativo devolvido em `results` de /v2/finance/quotes (campos usados pelo app).
 * @typedef {object} AtivoHGBrasil
 * @property {string} ticker "B3:PETR4"
 * @property {string} kind stock | bdr | etf | fund | index | crypto | forex
 * @property {string} currency
 * @property {string} symbol
 * @property {string} name
 * @property {string} [full_name]
 * @property {{ sector?: string, subsector?: string, segment?: string }} [classification]
 * @property {{ square_small?: string, square_large?: string }} [logos]
 * @property {{ value: number, change_value: number, change_percent: number, market_cap?: number, updated_at: string }} quote
 * @property {{ is_open: boolean, previous_value?: number, open?: number, high?: number, low?: number, close?: number, volume?: number, updated_at?: string }} [market]
 * @property {{ yield_12m_percent?: number, yield_12m_cash?: number }} [dividends]
 */

/**
 * @typedef {object} RespostaCotacoesHGBrasil
 * @property {{ key_status: string, cached: boolean }} metadata
 * @property {AtivoHGBrasil[]} results
 * @property {{ code: string, message: string }[]} [errors]
 */

/** @type {Map<string, { expira: number, dados: AtivoHGBrasil[] }>} */
const cacheCotacoes = new Map();

/**
 * Busca cotações de ativos da B3 ("B3:PETR4"). Resultado fica em cache por `cacheMs`
 * para que vários navegadores atualizando juntos não estourem o limite da chave.
 * Atenção: a HG Brasil responde 200 com `key_status: "invalid"` e `errors` quando a chave falha.
 * @param {string[]} tickers
 * @param {{ chave?: string, fetch?: typeof fetch, timeoutMs?: number, cacheMs?: number }} [opcoes]
 * @returns {Promise<AtivoHGBrasil[]>}
 * @throws {ErroHGBrasil}
 */
export async function buscarCotacoesB3(tickers, opcoes = {}) {
  const lista = [...new Set((tickers || []).map((t) => String(t).trim().toUpperCase()).filter(Boolean))];
  if (!lista.length || lista.length > 40 || lista.some((t) => !/^[A-Z0-9]{1,10}:[A-Z0-9.^=-]{1,20}$/.test(t))) {
    throw new ErroHGBrasil('Informe de 1 a 40 tickers no formato "B3:PETR4".', 400, "TICKERS_INVALIDOS");
  }
  const chave = opcoes.chave ?? process.env.HGBRASIL_KEY;
  if (!chave) throw new ErroHGBrasil("HGBRASIL_KEY não está definida no ambiente do servidor.", 0, "SEM_CHAVE");

  const id = lista.slice().sort().join(",");
  const emCache = cacheCotacoes.get(id);
  if (emCache && emCache.expira > Date.now()) return emCache.dados;

  const url = new URL(URL_COTACOES);
  url.searchParams.set("tickers", lista.join(","));
  url.searchParams.set("key", chave);

  /** @type {Response} */
  let resposta;
  try {
    resposta = await (opcoes.fetch ?? fetch)(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(opcoes.timeoutMs ?? 8000) });
  } catch (erro) {
    const tempo = erro instanceof Error && erro.name === "TimeoutError";
    throw new ErroHGBrasil(tempo ? "A HG Brasil não respondeu a tempo." : "Falha de rede ao consultar a HG Brasil.", 0, tempo ? "TEMPO_ESGOTADO" : "REDE");
  }
  if (!resposta.ok) throw new ErroHGBrasil(`A HG Brasil respondeu HTTP ${resposta.status}.`, resposta.status);

  /** @type {RespostaCotacoesHGBrasil} */
  let json;
  try { json = await resposta.json(); } catch { throw new ErroHGBrasil("Resposta da HG Brasil não é JSON.", 502, "RESPOSTA_INVALIDA"); }
  const codigos = (json.errors || []).map((e) => e.code);
  if (json.metadata?.key_status !== "valid" || codigos.includes("INVALID_API_KEY") || codigos.includes("UNAUTHORIZED_KEY")) {
    throw new ErroHGBrasil("Chave da HG Brasil inválida ou sem acesso a cotações.", 401, "CHAVE_INVALIDA");
  }
  if (!json.results?.length) throw new ErroHGBrasil(json.errors?.[0]?.message || "Nenhum ativo encontrado.", 404, json.errors?.[0]?.code || "SEM_RESULTADO");

  cacheCotacoes.set(id, { expira: Date.now() + (opcoes.cacheMs ?? 15000), dados: json.results });
  return json.results;
}
