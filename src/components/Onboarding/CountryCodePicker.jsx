import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { countryFor, flagUrl, searchCountries } from "../../utils/countryMeta";

const Flag = ({ country }) =>
  country.iso2 ? (
    <img
      src={flagUrl(country.iso2)}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
    />
  ) : (
    <span className="h-[15px] w-5 shrink-0 rounded-[2px] bg-gray-200" />
  );

/** Dialling-code picker: flag + code button, searchable country list. */
const CountryCodePicker = ({ code, iso3, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const selected = countryFor(code, iso3);
  const results = searchCountries(query);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // Open on the current country; reset the search each time.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const i = searchCountries("").findIndex((c) => c.iso3 === selected?.iso3);
    setActive(Math.max(i, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const pick = (country) => {
    onChange(country);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) pick(results[active]);
    }
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={`Country code ${selected?.name ?? ""} ${code}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-full items-center gap-2 rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition hover:border-gray-300 focus-visible:border-[#0A3A75] focus-visible:ring-2 focus-visible:ring-[#0A3A75]/10 ${
          open ? "border-[#0A3A75] ring-2 ring-[#0A3A75]/10" : "border-gray-200"
        }`}
      >
        {selected && <Flag country={selected} />}
        <span className="tabular-nums">{code}</span>
        <FiChevronDown
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          onKeyDown={onKeyDown}
          className="absolute left-0 top-full z-30 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
        >
          <div className="relative border-b border-gray-100 p-2">
            <FiSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Search country or code"
              aria-label="Search country"
              className="w-full rounded-lg bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#0A3A75]/10"
            />
          </div>
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
          >
            {results.map((c, i) => {
              const isSelected = c.iso3 === selected?.iso3;
              return (
                <li
                  key={c.iso3}
                  data-index={i}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(c)}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm ${
                    i === active ? "bg-[#0A3A75]/5" : ""
                  } ${isSelected ? "font-medium text-[#0A3A75]" : "text-gray-700"}`}
                >
                  <Flag country={c} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-gray-400">
                    {c.code}
                  </span>
                  {isSelected && (
                    <span className="size-1.5 shrink-0 rounded-full bg-[#fc5f07]" />
                  )}
                </li>
              );
            })}
            {!results.length && (
              <li className="px-3 py-6 text-center text-sm text-gray-400">
                No country matches “{query}”
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryCodePicker;
