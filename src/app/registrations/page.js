"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistrations, clearError } from "@/store/slices/registrationSlice";

const API = process.env.NEXT_PUBLIC_API_URL;

// ── Status badge ────────────────────────────────────────────────────────────
const PayBadge = ({ status }) => {
  const map = {
    paid:    "bg-emerald-900/40 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-900/40   text-amber-400   border-amber-500/30",
    failed:  "bg-red-900/40     text-red-400     border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] || map.pending}`}>
      {status || "pending"}
    </span>
  );
};

// ── Pretty label for a participant field key ─────────────────────────────────
const FIELD_LABELS = {
  name:               "Name",
  email:              "Email",
  phone:              "Phone",
  college:            "College",
  registrationNumber: "Reg No.",
  year:               "Year",
  department:         "Department",
  startupName:        "Startup Name",
  state:              "State",
  city:               "City",
  website:            "Website",
  pitchDeck:          "Pitch Deck",
  stage:              "Stage",
  sector:             "Sector",
};

// ── Derive column keys present in participants across all registrations ───────
function deriveColumns(registrations) {
  const seen = new Set();
  for (const reg of registrations) {
    for (const p of (reg.participants || [])) {
      for (const key of Object.keys(p)) {
        if (key !== "_id") seen.add(key);
      }
    }
  }
  // Preserve a nice order: known fields first, then extras
  const ORDERED = ["name","email","phone","college","registrationNumber","year","department",
                   "startupName","state","city","website","pitchDeck","stage","sector"];
  const ordered = ORDERED.filter(k => seen.has(k));
  const extras  = [...seen].filter(k => !ORDERED.includes(k));
  return [...ordered, ...extras];
}

// ── Excel download helper ────────────────────────────────────────────────────
function downloadExcel(eventId) {
  const url = eventId
    ? `${API}/api/v1/events/export-excel?eventId=${eventId}`
    : `${API}/api/v1/events/export-excel`;
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ── Single registration row (expandable) ─────────────────────────────────────
const RegistrationRow = ({ reg, index, columns }) => {
  const [open, setOpen] = useState(false);
  const lead = reg.participants?.[0];
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      {/* Summary row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex flex-wrap md:flex-nowrap items-center gap-3 bg-[#0d1526] hover:bg-[#111c35] transition"
      >
        <span className="text-gray-400 text-xs w-6 shrink-0">{index + 1}.</span>

        <span className="font-medium text-white text-sm flex-1 min-w-0">
          {reg.teamName ? (
            <>
              <span className="text-blue-400">{reg.teamName}</span>
              {reg.teamLeaderName && <span className="text-gray-500 ml-1">· {reg.teamLeaderName}</span>}
            </>
          ) : (
            <span className="text-gray-300">{lead?.name || "—"}</span>
          )}
        </span>

        <span className="text-gray-400 text-xs shrink-0">
          {reg.ticketCount} ticket{reg.ticketCount !== 1 ? "s" : ""} · {reg.participants?.length || 0} participant{reg.participants?.length !== 1 ? "s" : ""}
        </span>

        <PayBadge status={reg.payment?.status} />

        <span className="text-gray-400 text-xs shrink-0">
          ₹{(reg.payment?.amount || 0).toLocaleString()}
        </span>

        <span className="text-gray-500 text-xs shrink-0">
          {new Date(reg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>

        <span className="text-gray-500 text-xs shrink-0">{open ? "▲" : "▼"}</span>
      </button>

      {/* Participants table */}
      {open && (
        <div className="bg-[#090f1f] px-4 pb-4 pt-2 space-y-3">
          {reg.participants?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-800">
                    {columns.map(k => (
                      <th key={k} className="pb-2 pr-4 font-semibold whitespace-nowrap">
                        {FIELD_LABELS[k] || k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reg.participants.map((p, pi) => (
                    <tr key={pi} className="border-b border-gray-800/50 last:border-0">
                      {columns.map(k => (
                        <td key={k} className="py-2 pr-4 text-gray-300 whitespace-nowrap max-w-[200px] truncate">
                          {/* Handle aliased fields */}
                          {k === "phone"      ? (p.phone      || p.phoneNum    || "") :
                           k === "college"    ? (p.college    || p.collegeName || "") :
                           k === "department" ? (p.department || p.course      || "") :
                           k === "year"       ? (p.year       || p.yearOfStudy || "") :
                           k === "name"       ? <span className="text-white font-medium">{p[k] || ""}</span> :
                           k === "website" || k === "pitchDeck"
                             ? (p[k] ? <a href={p[k]} target="_blank" rel="noreferrer" className="text-blue-400 underline truncate block max-w-[160px]">{p[k]}</a> : "")
                             : (p[k] || "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No participant details found.</p>
          )}

          {reg.payment?.paymentId && (
            <p className="text-gray-600 text-xs mt-1">Payment ID: <span className="text-gray-400 font-mono">{reg.payment.paymentId}</span></p>
          )}
        </div>
      )}
    </div>
  );
};

// ── Event accordion card ──────────────────────────────────────────────────────
const EventCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { event, registrations, totalRegistrations, totalParticipants, totalRevenue } = item;
  const columns = deriveColumns(registrations);

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden">
      {/* Event header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition"
      >
        {/* Cover thumb */}
        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-800">
          {event.coverImage ? (
            <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No img</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{event.title}</h3>
          {event.eventDate && (
            <p className="text-gray-500 text-xs mt-0.5">
              {new Date(event.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              {event.location && ` · ${event.location}`}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <div className="text-center">
            <p className="text-blue-400 font-bold text-lg leading-none">{totalRegistrations}</p>
            <p className="text-gray-500 text-xs mt-0.5">Teams</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 font-bold text-lg leading-none">{totalParticipants}</p>
            <p className="text-gray-500 text-xs mt-0.5">Participants</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-400 font-bold text-lg leading-none">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-gray-500 text-xs mt-0.5">Revenue</p>
          </div>
        </div>

        {/* Export button (per event) */}
        <button
          onClick={(e) => { e.stopPropagation(); downloadExcel(event._id); }}
          title="Export this event's registrations to Excel"
          className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Excel
        </button>

        <span className="text-gray-500 text-sm ml-1">{open ? "▲" : "▼"}</span>
      </button>

      {/* Mobile stats row */}
      <div className="md:hidden flex items-center gap-4 px-5 pb-3 text-xs border-t border-gray-800/50 pt-2">
        <span className="text-blue-400 font-semibold">{totalRegistrations} teams</span>
        <span className="text-cyan-400 font-semibold">{totalParticipants} participants</span>
        <span className="text-emerald-400 font-semibold">₹{totalRevenue.toLocaleString()}</span>
      </div>

      {/* Registrations list */}
      {open && (
        <div className="px-5 pb-5 space-y-2 border-t border-gray-800">
          {registrations.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">No registrations yet for this event.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {registrations.map((reg, i) => (
                <RegistrationRow key={reg._id} reg={reg} index={i} columns={columns} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RegistrationsPage() {
  const dispatch = useDispatch();
  const { registrations: data, loading, error } = useSelector((state) => state.registrations);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchRegistrations());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Summary totals
  const totals = data.reduce(
    (acc, item) => ({
      teams:        acc.teams        + item.totalRegistrations,
      participants: acc.participants + item.totalParticipants,
      revenue:      acc.revenue      + item.totalRevenue,
    }),
    { teams: 0, participants: 0, revenue: 0 }
  );

  const filtered = data.filter((item) =>
    item.event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Event Registrations</h1>
          <p className="text-gray-400 text-sm mt-1">All registrations grouped by event.</p>
        </div>

        {/* Export All button */}
        <button
          onClick={() => downloadExcel(null)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export All to Excel
        </button>
      </div>

      {/* Summary cards */}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Teams",        value: totals.teams,                          color: "text-blue-400" },
            { label: "Total Participants", value: totals.participants,                   color: "text-cyan-400" },
            { label: "Total Revenue",      value: `₹${totals.revenue.toLocaleString()}`, color: "text-emerald-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 text-center">
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 animate-pulse h-20" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center">
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-1">Make sure the API server is running and the route <code className="font-mono text-xs bg-gray-800 px-1 py-0.5 rounded">/api/v1/events/all-registrations</code> is available.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          {search ? `No events matching "${search}"` : "No events found."}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <EventCard key={item.event._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
