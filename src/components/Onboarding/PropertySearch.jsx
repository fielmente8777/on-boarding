import React, { useEffect, useState } from "react";
import axios from "axios";
import { GIAN_URL } from "../../constants/constant";

// Gmail etc. never match a hotel website, so skip the email lookup for them.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.in",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com",
  "aol.com", "rediffmail.com", "proton.me", "protonmail.com", "zoho.com",
  "ymail.com", "gmx.com", "mail.com",
]);

const isBusinessEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "") &&
  !FREE_EMAIL_DOMAINS.has(email.split("@")[1].toLowerCase());

// gian /onboarding/lookup searches Google Maps by name (q) or by the website
// domain of a work email. Its `details` keys match propertyDetails.
const lookup = async (params) => {
  const { data } = await axios.get(`${GIAN_URL}/onboarding/lookup`, { params });
  return data?.result?.matches || [];
};

/**
 * First screen of the form: the hotel types its name, picks its Google
 * listing and the details step opens pre-filled. Not listed, or the search
 * is down? onManual opens the same step empty, keeping the typed name.
 */
const PropertySearch = ({ email, initialQuery = "", onPick, onManual }) => {
  const [query, setQuery] = useState(initialQuery);
  const [matches, setMatches] = useState([]);
  const [emailMatches, setEmailMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState("");
  const [failed, setFailed] = useState(false);

  // On load: a business email often leads straight to the right listing.
  useEffect(() => {
    if (!isBusinessEmail(email)) return;
    let cancelled = false;
    lookup({ email })
      .then((found) => !cancelled && setEmailMatches(found))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [email]);

  // Search by name once the user stops typing.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setMatches([]);
      setSearched("");
      return;
    }
    let cancelled = false;
    const t = setTimeout(() => {
      setLoading(true);
      lookup({ q })
        .then((found) => {
          if (cancelled) return;
          setMatches(found);
          setFailed(false);
        })
        .catch(() => {
          if (cancelled) return;
          setMatches([]);
          setFailed(true);
        })
        .finally(() => {
          if (cancelled) return;
          setLoading(false);
          setSearched(q);
        });
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  // An email-domain hit is a confident match, so it goes first.
  const emailIds = new Set(emailMatches.map((m) => m.placeId));
  const seen = new Set();
  const shown = [...emailMatches, ...matches]
    .filter((m) => {
      const id = m.placeId || m.title;
      return !seen.has(id) && seen.add(id);
    })
    .slice(0, 5);

  const noResults = !loading && !failed && searched && !shown.length;

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#fc5f07]">
        Step 1 of 2
      </p>
      <h1 className="mt-2 text-2xl font-bold text-[#0A3A75] md:text-3xl">
        What's your property called?
      </h1>
      <p className="mt-2 text-gray-500">
        We'll look it up on Google and fill in your address, phone and other
        details for you.
      </p>

      <form
        className="relative mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (shown.length === 1) onPick(shown[0]);
        }}
      >
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Property name and city, e.g. Sunrise Resort Goa"
          aria-label="Property name"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-11 text-base text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#0A3A75] focus:ring-2 focus:ring-[#0A3A75]/10"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 size-5 -translate-y-1/2 animate-spin rounded-full border-2 border-gray-300 border-t-[#0A3A75]" />
        )}
      </form>

      {shown.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Is this your property?
          </p>
          <ul className="space-y-2">
            {shown.map((m) => (
              <li key={m.placeId || m.title}>
                <button
                  type="button"
                  onClick={() => onPick(m)}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition hover:border-[#0A3A75] hover:bg-[#0A3A75]/5 focus-visible:border-[#0A3A75] focus-visible:outline-none"
                >
                  {m.thumbnail ? (
                    <img
                      src={m.thumbnail}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="size-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="size-14 shrink-0 rounded-lg bg-gray-100" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-medium text-gray-800">
                      <span className="truncate">{m.title}</span>
                      {emailIds.has(m.placeId) && (
                        <span className="shrink-0 rounded-full bg-[#fc5f07]/10 px-2 py-0.5 text-[10px] font-semibold text-[#fc5f07]">
                          Matches your email
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-gray-500">
                      {m.fullAddress}
                    </span>
                  </span>
                  {m.rating != null && (
                    <span className="shrink-0 text-sm text-gray-600">
                      <span className="text-[#F5A623]">★</span> {m.rating}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {noResults && (
        <p className="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
          We couldn't find "{searched}" on Google. Try adding the city, or
          enter your details yourself.
        </p>
      )}
      {failed && (
        <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Search isn't available right now. You can enter your details
          yourself and it'll only take a minute.
        </p>
      )}

      <div className="mt-6 border-t border-gray-100 pt-5 text-center">
        <button
          type="button"
          onClick={() => onManual(query.trim())}
          className="text-sm font-semibold text-[#0A3A75] underline-offset-4 hover:underline"
        >
          {shown.length
            ? "Not listed here? Enter details manually"
            : "Can't find it? Enter details manually"}
        </button>
      </div>
    </section>
  );
};

export default PropertySearch;
