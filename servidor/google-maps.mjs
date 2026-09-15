// @ts-check
/* Busca de empresas no Google Maps Places (New V2) via RapidAPI — lado do servidor.
   Mesma API, campos e formato da edge function `buscar-empresa-google` do Babel OS (Reino).
   A chave vem de process.env.RAPIDAPI_MAPS_KEY e nunca vai ao navegador. */

const HOST = "google-map-places-new-v2.p.rapidapi.com";
const CAMPOS = [
  "places.id", "places.displayName", "places.formattedAddress",
  "places.nationalPhoneNumber", "places.internationalPhoneNumber",
  "places.rating", "places.userRatingCount", "places.websiteUri",
  "places.photos", "places.location", "places.primaryTypeDisplayName",
].join(",");

/**
 * Mesmo formato de `CandidatoEmpresa` da edge function, mais localização e categoria.
 * @typedef {object} EmpresaGoogle
 * @property {string} nome
 * @property {string | null} telefone
 * @property {string | null} endereco
 * @property {string | null} site
 * @property {number | null} avaliacao_google
 * @property {number | null} num_avaliacoes_google
 * @property {string} google_place_id
 * @property {string | null} foto_url
 * @property {number | null} lat
 * @property {number | null} lng
 * @property {string | null} categoria
 */

export class ErroGoogleMaps extends Error {
  /**
   * @param {string} mensagem
   * @param {number} status HTTP (0 = rede/tempo esgotado)
   * @param {string} [codigo]
   */
  constructor(mensagem, status, codigo) {
    super(mensagem);
    this.name = "ErroGoogleMaps";
    this.status = status;
    this.codigo = codigo;
  }
}

/** @type {Map<string, { expira: number, dados: EmpresaGoogle[] }>} */
const cache = new Map();

/**
 * Busca empresas por texto livre ("contabilidade em Cambuí, Campinas - SP").
 * @param {string} consulta
 * @param {{ chave?: string, fetch?: typeof fetch, timeoutMs?: number, limite?: number, fotos?: boolean }} [opcoes]
 * @returns {Promise<EmpresaGoogle[]>}
 * @throws {ErroGoogleMaps}
 */
export async function buscarEmpresasGoogle(consulta, opcoes = {}) {
  const texto = String(consulta || "").trim();
  if (texto.length < 2 || texto.length > 160) throw new ErroGoogleMaps("Digite de 2 a 160 caracteres.", 400, "CONSULTA_INVALIDA");
  const chave = opcoes.chave ?? process.env.RAPIDAPI_MAPS_KEY;
  if (!chave) throw new ErroGoogleMaps("RAPIDAPI_MAPS_KEY não está definida no ambiente do servidor.", 0, "SEM_CHAVE");
  const limite = Math.min(Math.max(opcoes.limite ?? 8, 1), 20);
  const fazer = opcoes.fetch ?? fetch;

  const id = `${texto.toLowerCase()}|${limite}`;
  const emCache = cache.get(id);
  if (emCache && emCache.expira > Date.now()) return emCache.dados;

  /** @type {Response} */
  let resp;
  try {
    resp = await fazer(`https://${HOST}/v1/places:searchText`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Goog-FieldMask": CAMPOS, "x-rapidapi-host": HOST, "x-rapidapi-key": chave },
      body: JSON.stringify({ textQuery: texto, languageCode: "pt-BR", regionCode: "BR", pageSize: limite }),
      signal: AbortSignal.timeout(opcoes.timeoutMs ?? 15000),
    });
  } catch (erro) {
    const tempo = erro instanceof Error && erro.name === "TimeoutError";
    throw new ErroGoogleMaps(tempo ? "O Google Maps não respondeu a tempo." : "Falha de rede ao consultar o Google Maps.", 0, tempo ? "TEMPO_ESGOTADO" : "REDE");
  }
  // mesma regra da edge: 403/429 da RapidAPI = cota esgotada ou chave sem assinatura
  if (resp.status === 429 || resp.status === 403) throw new ErroGoogleMaps("Cota do Google Maps esgotada ou chave sem acesso — tente de novo em instantes.", 429, "COTA");
  if (resp.status === 401) throw new ErroGoogleMaps("Chave da RapidAPI inválida.", 401, "CHAVE_INVALIDA");
  if (!resp.ok) throw new ErroGoogleMaps(`O Google Maps respondeu HTTP ${resp.status}.`, resp.status);

  /** @type {{ places?: Record<string, any>[] }} */
  let dados;
  try { dados = await resp.json(); } catch { throw new ErroGoogleMaps("Resposta do Google Maps não é JSON.", 502, "RESPOSTA_INVALIDA"); }

  const brutos = (dados.places ?? []).filter((p) => p.displayName?.text && p.id);
  /** @type {EmpresaGoogle[]} */
  const empresas = await Promise.all(brutos.map(async (p) => {
    /** @type {string | null} */
    let foto_url = null;
    const ref = p.photos?.[0]?.name;
    if (ref && opcoes.fotos !== false) {
      try {
        const m = await fazer(`https://${HOST}/v1/${ref}/media?maxWidthPx=480&skipHttpRedirect=true`, {
          headers: { "x-rapidapi-host": HOST, "x-rapidapi-key": chave }, signal: AbortSignal.timeout(8000),
        });
        if (m.ok) foto_url = (await m.json()).photoUri ?? null;
      } catch { /* segue sem foto */ }
    }
    return {
      nome: p.displayName.text,
      telefone: String(p.internationalPhoneNumber ?? p.nationalPhoneNumber ?? "").replace(/\D/g, "") || null,
      endereco: p.formattedAddress ?? null,
      site: p.websiteUri ?? null,
      avaliacao_google: typeof p.rating === "number" ? p.rating : null,
      num_avaliacoes_google: typeof p.userRatingCount === "number" ? p.userRatingCount : null,
      google_place_id: p.id,
      foto_url,
      lat: typeof p.location?.latitude === "number" ? p.location.latitude : null,
      lng: typeof p.location?.longitude === "number" ? p.location.longitude : null,
      categoria: p.primaryTypeDisplayName?.text ?? null,
    };
  }));

  // cache de 10 min: a cota da RapidAPI é paga
  cache.set(id, { expira: Date.now() + 10 * 60 * 1000, dados: empresas });
  return empresas;
}
