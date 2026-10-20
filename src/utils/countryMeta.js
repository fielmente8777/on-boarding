// Country codes + device-time-zone detection, ported from chat-bot-booking
// (LeadChatbot/countryMeta.ts) and the Eazotel website (utils/countryCode).

const countries = [
  { name: "AFG", code: "+93" },
  { name: "ALB", code: "+355" },
  { name: "DZA", code: "+213" },
  { name: "AND", code: "+376" },
  { name: "AGO", code: "+244" },
  { name: "ATG", code: "+1-268" },
  { name: "ARG", code: "+54" },
  { name: "ARM", code: "+374" },
  { name: "AUS", code: "+61" },
  { name: "AUT", code: "+43" },
  { name: "AZE", code: "+994" },
  { name: "BHS", code: "+1-242" },
  { name: "BHR", code: "+973" },
  { name: "BGD", code: "+880" },
  { name: "BRB", code: "+1-246" },
  { name: "BLR", code: "+375" },
  { name: "BEL", code: "+32" },
  { name: "BLZ", code: "+501" },
  { name: "BEN", code: "+229" },
  { name: "BTN", code: "+975" },
  { name: "BOL", code: "+591" },
  { name: "BIH", code: "+387" },
  { name: "BWA", code: "+267" },
  { name: "BRA", code: "+55" },
  { name: "BRN", code: "+673" },
  { name: "BGR", code: "+359" },
  { name: "BFA", code: "+226" },
  { name: "BDI", code: "+257" },
  { name: "CPV", code: "+238" },
  { name: "KHM", code: "+855" },
  { name: "CMR", code: "+237" },
  { name: "CAN", code: "+1" },
  { name: "CAF", code: "+236" },
  { name: "TCD", code: "+235" },
  { name: "CHL", code: "+56" },
  { name: "CHN", code: "+86" },
  { name: "COL", code: "+57" },
  { name: "COM", code: "+269" },
  { name: "COG", code: "+242" },
  { name: "CRI", code: "+506" },
  { name: "HRV", code: "+385" },
  { name: "CUB", code: "+53" },
  { name: "CYP", code: "+357" },
  { name: "CZE", code: "+420" },
  { name: "DNK", code: "+45" },
  { name: "DJI", code: "+253" },
  { name: "DMA", code: "+1-767" },
  { name: "DOM", code: "+1-809" },
  { name: "TLS", code: "+670" },
  { name: "ECU", code: "+593" },
  { name: "EGY", code: "+20" },
  { name: "SLV", code: "+503" },
  { name: "GNQ", code: "+240" },
  { name: "ERI", code: "+291" },
  { name: "EST", code: "+372" },
  { name: "ETH", code: "+251" },
  { name: "FJI", code: "+679" },
  { name: "FIN", code: "+358" },
  { name: "FRA", code: "+33" },
  { name: "GAB", code: "+241" },
  { name: "GMB", code: "+220" },
  { name: "GEO", code: "+995" },
  { name: "DEU", code: "+49" },
  { name: "GHA", code: "+233" },
  { name: "GRC", code: "+30" },
  { name: "GRD", code: "+1-473" },
  { name: "GTM", code: "+502" },
  { name: "GIN", code: "+224" },
  { name: "GNB", code: "+245" },
  { name: "GUY", code: "+592" },
  { name: "HTI", code: "+509" },
  { name: "HND", code: "+504" },
  { name: "HUN", code: "+36" },
  { name: "ISL", code: "+354" },
  { name: "IND", code: "+91" },
  { name: "IDN", code: "+62" },
  { name: "IRN", code: "+98" },
  { name: "IRQ", code: "+964" },
  { name: "IRL", code: "+353" },
  { name: "ISR", code: "+972" },
  { name: "ITA", code: "+39" },
  { name: "JAM", code: "+1-876" },
  { name: "JPN", code: "+81" },
  { name: "JOR", code: "+962" },
  { name: "KAZ", code: "+7" },
  { name: "KEN", code: "+254" },
  { name: "KIR", code: "+686" },
  { name: "PRK", code: "+850" },
  { name: "KOR", code: "+82" },
  { name: "XKX", code: "+383" },
  { name: "KWT", code: "+965" },
  { name: "KGZ", code: "+996" },
  { name: "LAO", code: "+856" },
  { name: "LVA", code: "+371" },
  { name: "LBN", code: "+961" },
  { name: "LSO", code: "+266" },
  { name: "LBR", code: "+231" },
  { name: "LBY", code: "+218" },
  { name: "LIE", code: "+423" },
  { name: "LTU", code: "+370" },
  { name: "LUX", code: "+352" },
  { name: "MDG", code: "+261" },
  { name: "MWI", code: "+265" },
  { name: "MYS", code: "+60" },
  { name: "MDV", code: "+960" },
  { name: "MLI", code: "+223" },
  { name: "MLT", code: "+356" },
  { name: "MHL", code: "+692" },
  { name: "MRT", code: "+222" },
  { name: "MUS", code: "+230" },
  { name: "MEX", code: "+52" },
  { name: "FSM", code: "+691" },
  { name: "MDA", code: "+373" },
  { name: "MCO", code: "+377" },
  { name: "MNG", code: "+976" },
  { name: "MNE", code: "+382" },
  { name: "MAR", code: "+212" },
  { name: "MOZ", code: "+258" },
  { name: "MMR", code: "+95" },
  { name: "NAM", code: "+264" },
  { name: "NRU", code: "+674" },
  { name: "NPL", code: "+977" },
  { name: "NLD", code: "+31" },
  { name: "NZL", code: "+64" },
  { name: "NIC", code: "+505" },
  { name: "NER", code: "+227" },
  { name: "NGA", code: "+234" },
  { name: "MKD", code: "+389" },
  { name: "NOR", code: "+47" },
  { name: "OMN", code: "+968" },
  { name: "PAK", code: "+92" },
  { name: "PLW", code: "+680" },
  { name: "PSE", code: "+970" },
  { name: "PAN", code: "+507" },
  { name: "PNG", code: "+675" },
  { name: "PRY", code: "+595" },
  { name: "PER", code: "+51" },
  { name: "PHL", code: "+63" },
  { name: "POL", code: "+48" },
  { name: "PRT", code: "+351" },
  { name: "QAT", code: "+974" },
  { name: "ROU", code: "+40" },
  { name: "RUS", code: "+7" },
  { name: "RWA", code: "+250" },
  { name: "KNA", code: "+1-869" },
  { name: "LCA", code: "+1-758" },
  { name: "VCT", code: "+1-784" },
  { name: "WSM", code: "+685" },
  { name: "SMR", code: "+378" },
  { name: "STP", code: "+239" },
  { name: "SAU", code: "+966" },
  { name: "SEN", code: "+221" },
  { name: "SRB", code: "+381" },
  { name: "SYC", code: "+248" },
  { name: "SLE", code: "+232" },
  { name: "SGP", code: "+65" },
  { name: "SVK", code: "+421" },
  { name: "SVN", code: "+386" },
  { name: "SLB", code: "+677" },
  { name: "SOM", code: "+252" },
  { name: "ZAF", code: "+27" },
  { name: "SSD", code: "+211" },
  { name: "ESP", code: "+34" },
  { name: "LKA", code: "+94" },
  { name: "SDN", code: "+249" },
  { name: "SUR", code: "+597" },
  { name: "SWE", code: "+46" },
  { name: "CHE", code: "+41" },
  { name: "SYR", code: "+963" },
  { name: "TWN", code: "+886" },
  { name: "TJK", code: "+992" },
  { name: "TZA", code: "+255" },
  { name: "THA", code: "+66" },
  { name: "TGO", code: "+228" },
  { name: "TON", code: "+676" },
  { name: "TTO", code: "+1-868" },
  { name: "TUN", code: "+216" },
  { name: "TUR", code: "+90" },
  { name: "TKM", code: "+993" },
  { name: "TUV", code: "+688" },
  { name: "UGA", code: "+256" },
  { name: "UKR", code: "+380" },
  { name: "ARE", code: "+971" },
  { name: "GBR", code: "+44" },
  { name: "USA", code: "+1" },
  { name: "URY", code: "+598" },
  { name: "UZB", code: "+998" },
  { name: "VUT", code: "+678" },
  { name: "VAT", code: "+379" },
  { name: "VEN", code: "+58" },
  { name: "VNM", code: "+84" },
  { name: "YEM", code: "+967" },
  { name: "ZMB", code: "+260" },
  { name: "ZWE", code: "+263" },
]


// ISO 3166 alpha-3 (as in `countries`) -> alpha-2, for the flag and the name
const ISO2 = {
  AFG: "AF", ALB: "AL", DZA: "DZ", AND: "AD", AGO: "AO", ATG: "AG", ARG: "AR",
  ARM: "AM", AUS: "AU", AUT: "AT", AZE: "AZ", BHS: "BS", BHR: "BH", BGD: "BD",
  BRB: "BB", BLR: "BY", BEL: "BE", BLZ: "BZ", BEN: "BJ", BTN: "BT", BOL: "BO",
  BIH: "BA", BWA: "BW", BRA: "BR", BRN: "BN", BGR: "BG", BFA: "BF", BDI: "BI",
  CPV: "CV", KHM: "KH", CMR: "CM", CAN: "CA", CAF: "CF", TCD: "TD", CHL: "CL",
  CHN: "CN", COL: "CO", COM: "KM", COG: "CG", CRI: "CR", HRV: "HR", CUB: "CU",
  CYP: "CY", CZE: "CZ", DNK: "DK", DJI: "DJ", DMA: "DM", DOM: "DO", TLS: "TL",
  ECU: "EC", EGY: "EG", SLV: "SV", GNQ: "GQ", ERI: "ER", EST: "EE", ETH: "ET",
  FJI: "FJ", FIN: "FI", FRA: "FR", GAB: "GA", GMB: "GM", GEO: "GE", DEU: "DE",
  GHA: "GH", GRC: "GR", GRD: "GD", GTM: "GT", GIN: "GN", GNB: "GW", GUY: "GY",
  HTI: "HT", HND: "HN", HUN: "HU", ISL: "IS", IND: "IN", IDN: "ID", IRN: "IR",
  IRQ: "IQ", IRL: "IE", ISR: "IL", ITA: "IT", JAM: "JM", JPN: "JP", JOR: "JO",
  KAZ: "KZ", KEN: "KE", KIR: "KI", PRK: "KP", KOR: "KR", XKX: "XK", KWT: "KW",
  KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR", LBY: "LY",
  LIE: "LI", LTU: "LT", LUX: "LU", MDG: "MG", MWI: "MW", MYS: "MY", MDV: "MV",
  MLI: "ML", MLT: "MT", MHL: "MH", MRT: "MR", MUS: "MU", MEX: "MX", FSM: "FM",
  MDA: "MD", MCO: "MC", MNG: "MN", MNE: "ME", MAR: "MA", MOZ: "MZ", MMR: "MM",
  NAM: "NA", NRU: "NR", NPL: "NP", NLD: "NL", NZL: "NZ", NIC: "NI", NER: "NE",
  NGA: "NG", MKD: "MK", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW", PSE: "PS",
  PAN: "PA", PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", POL: "PL", PRT: "PT",
  QAT: "QA", ROU: "RO", RUS: "RU", RWA: "RW", KNA: "KN", LCA: "LC", VCT: "VC",
  WSM: "WS", SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC",
  SLE: "SL", SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA",
  SSD: "SS", ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SWE: "SE", CHE: "CH",
  SYR: "SY", TWN: "TW", TJK: "TJ", TZA: "TZ", THA: "TH", TGO: "TG", TON: "TO",
  TTO: "TT", TUN: "TN", TUR: "TR", TKM: "TM", TUV: "TV", UGA: "UG", UKR: "UA",
  ARE: "AE", GBR: "GB", USA: "US", URY: "UY", UZB: "UZ", VUT: "VU", VAT: "VA",
  VEN: "VE", VNM: "VN", YEM: "YE", ZMB: "ZM", ZWE: "ZW",
};

const flagEmoji = (iso2) =>
  String.fromCodePoint(...iso2.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)));

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

const countryName = (iso2, fallback) => {
  try {
    return (iso2 && regionNames?.of(iso2)) || fallback;
  } catch {
    return fallback;
  }
};

export const COUNTRY_LIST = countries
  .map(({ name, code }) => {
    const iso2 = ISO2[name] || "";
    return {
      iso3: name,
      iso2,
      name: countryName(iso2, name),
      code,
      flag: iso2 ? flagEmoji(iso2) : "🌐",
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const INDIA = COUNTRY_LIST.find((c) => c.iso3 === "IND") ;

// IANA time zone -> country (alpha-2), for the countries in `countries`.
// Browsers may report older names (America/Indianapolis, Asia/Calcutta),
// so those are listed too.
const ZONES = {
  AF: "Asia/Kabul", AL: "Europe/Tirane", DZ: "Africa/Algiers", AD: "Europe/Andorra",
  AO: "Africa/Luanda", AG: "America/Antigua", AR: "America/Buenos_Aires America/Cordoba America/Catamarca America/Jujuy America/Mendoza America/Rosario", AM: "Asia/Yerevan",
  AT: "Europe/Vienna", AZ: "Asia/Baku", BS: "America/Nassau", BH: "Asia/Bahrain",
  BD: "Asia/Dhaka Asia/Dacca", BB: "America/Barbados", BY: "Europe/Minsk", BE: "Europe/Brussels",
  BZ: "America/Belize", BJ: "Africa/Porto-Novo", BT: "Asia/Thimphu Asia/Thimbu", BO: "America/La_Paz",
  BA: "Europe/Sarajevo", BW: "Africa/Gaborone",
  BR: "America/Sao_Paulo America/Bahia America/Belem America/Fortaleza America/Recife America/Manaus America/Cuiaba America/Campo_Grande America/Porto_Velho America/Boa_Vista America/Rio_Branco America/Noronha America/Araguaina America/Maceio America/Santarem America/Eirunepe",
  BN: "Asia/Brunei", BG: "Europe/Sofia", BF: "Africa/Ouagadougou", BI: "Africa/Bujumbura",
  CV: "Atlantic/Cape_Verde", KH: "Asia/Phnom_Penh", CM: "Africa/Douala",
  CA: "America/Toronto America/Vancouver America/Edmonton America/Winnipeg America/Halifax America/St_Johns America/Regina America/Montreal America/Moncton America/Whitehorse America/Yellowknife America/Iqaluit America/Glace_Bay America/Goose_Bay America/Swift_Current America/Dawson_Creek America/Rankin_Inlet",
  CF: "Africa/Bangui", TD: "Africa/Ndjamena", CL: "America/Santiago America/Punta_Arenas Pacific/Easter",
  CN: "Asia/Shanghai Asia/Urumqi Asia/Chongqing Asia/Harbin", CO: "America/Bogota", KM: "Indian/Comoro",
  CG: "Africa/Brazzaville", CR: "America/Costa_Rica", HR: "Europe/Zagreb", CU: "America/Havana",
  CY: "Asia/Nicosia Europe/Nicosia Asia/Famagusta", CZ: "Europe/Prague", DK: "Europe/Copenhagen",
  DJ: "Africa/Djibouti", DM: "America/Dominica", DO: "America/Santo_Domingo", TL: "Asia/Dili",
  EC: "America/Guayaquil Pacific/Galapagos", EG: "Africa/Cairo", SV: "America/El_Salvador",
  GQ: "Africa/Malabo", ER: "Africa/Asmara Africa/Asmera", EE: "Europe/Tallinn",
  ET: "Africa/Addis_Ababa", FJ: "Pacific/Fiji", FI: "Europe/Helsinki", FR: "Europe/Paris",
  GA: "Africa/Libreville", GM: "Africa/Banjul", GE: "Asia/Tbilisi", DE: "Europe/Berlin Europe/Busingen",
  GH: "Africa/Accra", GR: "Europe/Athens", GD: "America/Grenada", GT: "America/Guatemala",
  GN: "Africa/Conakry", GW: "Africa/Bissau", GY: "America/Guyana", HT: "America/Port-au-Prince",
  HN: "America/Tegucigalpa", HU: "Europe/Budapest", IS: "Atlantic/Reykjavik",
  IN: "Asia/Kolkata Asia/Calcutta", ID: "Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
  IR: "Asia/Tehran", IQ: "Asia/Baghdad", IE: "Europe/Dublin", IL: "Asia/Jerusalem Asia/Tel_Aviv",
  IT: "Europe/Rome", JM: "America/Jamaica", JP: "Asia/Tokyo", JO: "Asia/Amman",
  KZ: "Asia/Almaty Asia/Qyzylorda Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral Asia/Qostanay",
  KE: "Africa/Nairobi", KI: "Pacific/Tarawa Pacific/Kanton Pacific/Kiritimati Pacific/Enderbury",
  KP: "Asia/Pyongyang", KR: "Asia/Seoul", KW: "Asia/Kuwait", KG: "Asia/Bishkek", LA: "Asia/Vientiane",
  LV: "Europe/Riga", LB: "Asia/Beirut", LS: "Africa/Maseru", LR: "Africa/Monrovia", LY: "Africa/Tripoli",
  LI: "Europe/Vaduz", LT: "Europe/Vilnius", LU: "Europe/Luxembourg", MG: "Indian/Antananarivo",
  MW: "Africa/Blantyre", MY: "Asia/Kuala_Lumpur Asia/Kuching", MV: "Indian/Maldives", ML: "Africa/Bamako",
  MT: "Europe/Malta", MH: "Pacific/Majuro Pacific/Kwajalein", MR: "Africa/Nouakchott",
  MU: "Indian/Mauritius",
  MX: "America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Chihuahua America/Ojinaga America/Mazatlan America/Hermosillo America/Tijuana America/Bahia_Banderas America/Ciudad_Juarez",
  FM: "Pacific/Chuuk Pacific/Truk Pacific/Pohnpei Pacific/Ponape Pacific/Kosrae", MD: "Europe/Chisinau", MC: "Europe/Monaco",
  MN: "Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan", ME: "Europe/Podgorica", MA: "Africa/Casablanca",
  MZ: "Africa/Maputo", MM: "Asia/Yangon Asia/Rangoon", NA: "Africa/Windhoek", NR: "Pacific/Nauru",
  NP: "Asia/Kathmandu Asia/Katmandu", NL: "Europe/Amsterdam", NZ: "Pacific/Auckland Pacific/Chatham",
  NI: "America/Managua", NE: "Africa/Niamey", NG: "Africa/Lagos", MK: "Europe/Skopje", NO: "Europe/Oslo",
  OM: "Asia/Muscat", PK: "Asia/Karachi", PW: "Pacific/Palau", PS: "Asia/Gaza Asia/Hebron",
  PA: "America/Panama", PG: "Pacific/Port_Moresby Pacific/Bougainville", PY: "America/Asuncion",
  PE: "America/Lima", PH: "Asia/Manila", PL: "Europe/Warsaw",
  PT: "Europe/Lisbon Atlantic/Azores Atlantic/Madeira", QA: "Asia/Qatar", RO: "Europe/Bucharest",
  RU: "Europe/Moscow Europe/Kaliningrad Europe/Samara Europe/Volgograd Europe/Saratov Europe/Ulyanovsk Europe/Astrakhan Europe/Kirov Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
  RW: "Africa/Kigali", KN: "America/St_Kitts", LC: "America/St_Lucia", VC: "America/St_Vincent",
  WS: "Pacific/Apia", SM: "Europe/San_Marino", ST: "Africa/Sao_Tome", SA: "Asia/Riyadh",
  SN: "Africa/Dakar", RS: "Europe/Belgrade", SC: "Indian/Mahe", SL: "Africa/Freetown",
  SG: "Asia/Singapore", SK: "Europe/Bratislava", SI: "Europe/Ljubljana", SB: "Pacific/Guadalcanal",
  SO: "Africa/Mogadishu", ZA: "Africa/Johannesburg", SS: "Africa/Juba",
  ES: "Europe/Madrid Africa/Ceuta Atlantic/Canary", LK: "Asia/Colombo", SD: "Africa/Khartoum",
  SR: "America/Paramaribo", SE: "Europe/Stockholm", CH: "Europe/Zurich", SY: "Asia/Damascus",
  TW: "Asia/Taipei", TJ: "Asia/Dushanbe", TZ: "Africa/Dar_es_Salaam", TH: "Asia/Bangkok",
  TG: "Africa/Lome", TO: "Pacific/Tongatapu", TT: "America/Port_of_Spain", TN: "Africa/Tunis",
  TR: "Europe/Istanbul Asia/Istanbul", TM: "Asia/Ashgabat", TV: "Pacific/Funafuti", UG: "Africa/Kampala",
  UA: "Europe/Kyiv Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye", AE: "Asia/Dubai",
  GB: "Europe/London Europe/Belfast",
  US: "America/New_York America/Chicago America/Denver America/Los_Angeles America/Phoenix America/Anchorage America/Detroit America/Boise America/Juneau America/Adak America/Menominee America/Nome America/Sitka America/Yakutat America/Metlakatla America/Indianapolis America/Fort_Wayne America/Knox_IN America/Louisville Pacific/Honolulu",
  UY: "America/Montevideo", UZ: "Asia/Tashkent Asia/Samarkand", VU: "Pacific/Efate", VA: "Europe/Vatican",
  VE: "America/Caracas", VN: "Asia/Ho_Chi_Minh Asia/Saigon", YE: "Asia/Aden", ZM: "Africa/Lusaka",
  ZW: "Africa/Harare",
};

// whole regions of one country (e.g. America/Argentina/Cordoba)
const ZONE_PREFIXES = [
  ["America/Argentina/", "AR"],
  ["Australia/", "AU"],
  ["America/Indiana/", "US"],
  ["America/Kentucky/", "US"],
  ["America/North_Dakota/", "US"],
];

const ZONE_TO_ISO2 = new Map(
  Object.entries(ZONES).flatMap(([iso2, zones]) => zones.split(" ").map((zone) => [zone, iso2]))
);

const countryFromTimeZone = (timeZone) => {
  const direct = ZONE_TO_ISO2.get(timeZone);
  if (direct) return direct;
  const prefix = ZONE_PREFIXES.find(([start]) => timeZone.startsWith(start));
  return prefix ? prefix[1] : "";
};

// The visitor's country from the time zone their device is set to
// (Asia/Kolkata -> India, Europe/London -> UK). It needs no network call or
// IP lookup. Unknown zones (UTC, or a country not in the list) -> India.
export const detectCountry = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const iso2 = countryFromTimeZone(timeZone);
    return COUNTRY_LIST.find((c) => c.iso2 === iso2) || INDIA;
  } catch {
    return INDIA;
  }
};

// The country picked in a code dropdown. +1 and +7 are shared (USA/Canada,
// Russia/Kazakhstan), so the dropdown keeps the country, not just the code.
export const countryFor = (code, iso3) =>
  COUNTRY_LIST.find((c) => c.iso3 === iso3 && c.code === code) ||
  COUNTRY_LIST.find((c) => c.code === code);

// "+91 98765 43210" -> { code: "+91", iso3: "IND", number: "9876543210" }.
// A number without "+" is local: it keeps the given fallback country. The
// country name settles shared codes (+1 is both USA and Canada).
export const splitPhone = (raw, fallback, countryName = "") => {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!String(raw || "").trim().startsWith("+")) {
    return { ...fallback, number: digits.replace(/^0+/, "") };
  }
  const candidates = COUNTRY_LIST.filter((c) =>
    digits.startsWith(c.code.replace(/\D/g, "")),
  ).sort((a, b) => b.code.length - a.code.length);
  const longest = candidates[0];
  if (!longest) return { ...fallback, number: digits };
  const match =
    candidates.find(
      (c) =>
        c.code === longest.code &&
        c.name.toLowerCase() === countryName.toLowerCase(),
    ) || longest;
  return {
    code: match.code,
    iso3: match.iso3,
    number: digits.slice(match.code.replace(/\D/g, "").length),
  };
};

// Search by country name, ISO code or dialling code ("ind", "+44", "1").
export const searchCountries = (query) => {
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  if (!q) return COUNTRY_LIST;
  return COUNTRY_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.iso3.toLowerCase() === q ||
      c.iso2.toLowerCase() === q ||
      c.code.replace(/\D/g, "").startsWith(q.replace(/\D/g, "") || "_"),
  );
};

// Windows has no flag emoji (it shows "IN"), so flags are small images.
export const flagUrl = (iso2) =>
  `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
