"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// ─── Primitives ────────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">{children}</label>
);
const Input = ({ className = "", ...props }) => (
  <input {...props} className={`w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition ${className}`} />
);

// ─── All available registration fields ────────────────────────────────────
const ALL_FIELDS = [
  // Standard
  { key: "name",               label: "Full Name" },
  { key: "email",              label: "Email Address" },
  { key: "phone",              label: "Phone Number" },
  { key: "college",            label: "College Name" },
  { key: "registrationNumber", label: "Registration Number" },
  { key: "year",               label: "Year of Study" },
  { key: "department",         label: "Department / Branch" },
  // Startup / founder
  { key: "startupName",        label: "Startup Name" },
  { key: "state",              label: "State" },
  { key: "city",               label: "City" },
  { key: "website",            label: "Website URL" },
  { key: "pitchDeck",          label: "Pitch Deck URL" },
  { key: "stage",              label: "Stage (Idea / MVP / Prototype / Revenue)" },
  { key: "sector",             label: "Sector / Domain" },
];

const TypeBadge = ({ type }) =>
  type === "group"
    ? <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/30 border border-purple-500/40 text-purple-300 font-semibold">Group</span>
    : <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-900/30 border border-cyan-500/40 text-cyan-300 font-semibold">Individual</span>;

const emptyTicket = () => ({
  name: "",
  description: "",
  type: "individual",
  price: "",
  groupMin: 1,
  groupMax: 4,
  registrationFields: [
    { field: "name", required: true },
    { field: "email", required: true },
    { field: "phone", required: true }
  ],
  requiresTeamDetails: false,
  totalSlots: "",
});

// ─── FieldSelector component ──────────────────────────────────────────────
function FieldSelector({ selected, onChange }) {
  // selected is array of { field, required }
  const getSelectedFields = () => selected.map(s => typeof s === 'string' ? s : s.field);
  const isSelected = (key) => getSelectedFields().includes(key);
  const isRequired = (key) => {
    const item = selected.find(s => (typeof s === 'object' ? s.field : s) === key);
    return item && typeof item === 'object' ? item.required : true;
  };

  const toggle = (key) => {
    if (isSelected(key)) {
      onChange(selected.filter(s => (typeof s === 'object' ? s.field : s) !== key));
    } else {
      onChange([...selected, { field: key, required: true }]);
    }
  };

  const toggleRequired = (key) => {
    onChange(selected.map(s => {
      if ((typeof s === 'object' ? s.field : s) === key) {
        return { field: key, required: !isRequired(key) };
      }
      return s;
    }));
  };

  return (
    <div>
      <Label>Registration Fields to Collect *</Label>
      <p className="text-xs text-gray-500 mb-3">Click field to add/remove. Use checkbox to mark as required/optional.</p>
      <div className="space-y-2 mt-2">
        {ALL_FIELDS.map(f => {
          const active = isSelected(f.key);
          const required = isRequired(f.key);
          return (
            <div key={f.key} className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
              active
                ? "bg-blue-600/10 border-blue-500/40"
                : "bg-gray-900/50 border-gray-800"
            }`}>
              <button
                type="button"
                onClick={() => toggle(f.key)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  active
                    ? "bg-blue-600 border-blue-500"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                {active && <span className="text-white text-xs">✓</span>}
              </button>
              <span className={`flex-1 text-sm ${active ? "text-gray-200" : "text-gray-500"}`}>
                {f.label}
              </span>
              {active && (
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={required}
                    onChange={() => toggleRequired(f.key)}
                    className="w-3.5 h-3.5 rounded border-gray-600 bg-gray-800 text-blue-500 cursor-pointer"
                  />
                  <span className={`text-xs ${required ? "text-cyan-400" : "text-gray-500"}`}>
                    {required ? "Required" : "Optional"}
                  </span>
                </label>
              )}
            </div>
          );
        })}
      </div>
      {selected.length === 0 && (
        <p className="text-red-400 text-xs mt-2">Select at least one field.</p>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function TicketManagementPage() {
  const { eventId } = useParams();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTicket, setNewTicket] = useState(emptyTicket());
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch tickets ────────────────────────────────────────────────────────
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const resAll = await fetch(`${API}/api/v1/events/admin/all-tickets`);
      const dataAll = await resAll.json();
      const eventTickets = (dataAll.tickets || []).filter(
        (t) => (t.event?._id || t.event) === eventId
      );
      if (eventTickets.length === 0) {
        const resPub = await fetch(`${API}/api/v1/events/${eventId}/tickets`);
        const dataPub = await resPub.json();
        setTickets(dataPub.tickets || []);
      } else {
        setTickets(eventTickets);
      }
    } catch {
      showToast("error", "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useState(() => { if (eventId) fetchTickets(); }, [eventId]);

  // ── Create ───────────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTicket.name.trim()) return showToast("error", "Ticket name is required");
    if (newTicket.registrationFields.length === 0) return showToast("error", "Select at least one registration field");
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/v1/events/${eventId}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTicket.name,
          description: newTicket.description,
          type: newTicket.type,
          price: Number(newTicket.price) || 0,
          groupMin: newTicket.type === "group" ? Number(newTicket.groupMin) || 1 : 1,
          groupMax: newTicket.type === "group" ? Number(newTicket.groupMax) || 4 : 1,
          registrationFields: newTicket.registrationFields,
          requiresTeamDetails: newTicket.requiresTeamDetails,
          totalSlots: newTicket.totalSlots ? Number(newTicket.totalSlots) : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to create ticket");
      showToast("success", "Ticket created!");
      setNewTicket(emptyTicket());
      setShowAddForm(false);
      fetchTickets();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  // Helper to normalize registrationFields format (handles legacy string arrays)
  const normalizeRegistrationFields = (fields) => {
    if (!Array.isArray(fields)) return [];
    return fields.map(f => {
      if (typeof f === 'object' && f !== null) {
        return { field: f.field, required: f.required !== false };
      }
      if (typeof f === 'string') {
        return { field: f, required: true };
      }
      return null;
    }).filter(Boolean);
  };

  // ── Update ───────────────────────────────────────────────────────────────
  const handleUpdate = async (ticketId) => {
    if (!editData.registrationFields || editData.registrationFields.length === 0) {
      return showToast("error", "Select at least one registration field");
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/v1/events/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editData,
          price: Number(editData.price) || 0,
          groupMin: editData.type === "group" ? Number(editData.groupMin) || 1 : 1,
          groupMax: editData.type === "group" ? Number(editData.groupMax) || 4 : 1,
          requiresTeamDetails: editData.requiresTeamDetails,
          totalSlots: editData.totalSlots ? Number(editData.totalSlots) : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      showToast("success", "Ticket updated!");
      setEditingId(null);
      fetchTickets();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete / Activate ─────────────────────────────────────────────────
  const handleDelete = async (ticketId) => {
    if (!confirm("Deactivate this ticket?")) return;
    await fetch(`${API}/api/v1/events/tickets/${ticketId}`, { method: "DELETE" });
    showToast("success", "Deactivated");
    fetchTickets();
  };

  const handleActivate = async (ticketId) => {
    await fetch(`${API}/api/v1/events/tickets/${ticketId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: true }),
    });
    showToast("success", "Activated");
    fetchTickets();
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto pb-16">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">🎟️ Ticket Management</h1>
          <p className="text-gray-400 text-sm mt-1">Configure ticket types and their registration fields.</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-gray-400 hover:text-white transition">← Back</button>
      </div>

      {/* Add Form */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Add New Ticket</h3>
          <button
            type="button"
            onClick={() => setShowAddForm(v => !v)}
            className="text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-lg transition hover:bg-emerald-500/10"
          >
            {showAddForm ? "Cancel" : "+ Add Ticket"}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleCreate} className="space-y-5 mt-4">
            {/* Name + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Ticket Name *</Label>
                <Input value={newTicket.name} placeholder="e.g. Early Bird, VIP, Group Pass" onChange={e => setNewTicket(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <Label>Type</Label>
                <select
                  value={newTicket.type}
                  onChange={e => setNewTicket(p => ({ ...p, type: e.target.value }))}
                  className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Input value={newTicket.description} placeholder="Brief description..." onChange={e => setNewTicket(p => ({ ...p, description: e.target.value }))} />
            </div>

            {/* Price + Group range + Slots */}
            <div className={`grid gap-3 ${newTicket.type === "group" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
              <div>
                <Label>Price (₹/person)</Label>
                <Input type="number" min="0" value={newTicket.price} placeholder="0 = Free" onChange={e => setNewTicket(p => ({ ...p, price: e.target.value }))} />
              </div>
              {newTicket.type === "group" && (
                <>
                  <div>
                    <Label>Min Members</Label>
                    <Input type="number" min="1" value={newTicket.groupMin} onChange={e => setNewTicket(p => ({ ...p, groupMin: e.target.value === "" ? "" : Number(e.target.value) }))} />
                  </div>
                  <div>
                    <Label>Max Members</Label>
                    <Input type="number" min={newTicket.groupMin || 1} value={newTicket.groupMax} onChange={e => setNewTicket(p => ({ ...p, groupMax: e.target.value === "" ? "" : Number(e.target.value) }))} />
                  </div>
                </>
              )}
              <div>
                <Label>Total Slots (blank = ∞)</Label>
                <Input type="number" min="1" value={newTicket.totalSlots} placeholder="unlimited" onChange={e => setNewTicket(p => ({ ...p, totalSlots: e.target.value }))} />
              </div>
            </div>

            {/* Group hint */}
            {newTicket.type === "group" && (
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-purple-300 text-xs">
                Group size: {newTicket.groupMin}–{newTicket.groupMax} members •
                Total per group: ₹{Number(newTicket.price || 0) * newTicket.groupMin}–₹{Number(newTicket.price || 0) * newTicket.groupMax}
              </div>
            )}

            {/* Registration fields */}
            <FieldSelector
              selected={newTicket.registrationFields}
              onChange={v => setNewTicket(p => ({ ...p, registrationFields: v }))}
            />

            <div className="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                id="req-team-details-new" 
                checked={newTicket.requiresTeamDetails || false} 
                onChange={e => setNewTicket(p => ({ ...p, requiresTeamDetails: e.target.checked }))} 
                className="w-4 h-4 rounded cursor-pointer" 
              />
              <label htmlFor="req-team-details-new" className="text-sm text-gray-300 cursor-pointer select-none">
                Collect Team Name & Team Leader Name (for Team/Group registrations)
              </label>
            </div>

            <div className="flex justify-end mt-4">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50">
                {saving ? "Creating..." : "Create Ticket"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Existing Tickets */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest border-b border-gray-800 pb-3 mb-4">
          Existing Tickets
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400 text-sm">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">No tickets yet. Add your first ticket above.</div>
        ) : (
          <div className="space-y-4">
            {tickets.map((tkt) => {
              const isEditing = editingId === (tkt._id || tkt.id);
              const availSlots = tkt.availableSlots ?? (tkt.totalSlots !== null ? tkt.totalSlots - tkt.soldCount : null);

              return (
                <div key={tkt._id || tkt.id} className={`border rounded-xl p-5 transition ${tkt.isActive ? "border-gray-700 bg-gray-900" : "border-gray-800 bg-gray-900/40 opacity-60"}`}>
                  {!isEditing ? (
                    /* VIEW */
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-white font-bold text-lg">{tkt.name}</h4>
                          <TypeBadge type={tkt.type} />
                          {!tkt.isActive && <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/30 border border-red-500/40 text-red-400">Inactive</span>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingId(tkt._id || tkt.id);
                              setEditData({
                                name: tkt.name,
                                description: tkt.description || "",
                                type: tkt.type,
                                price: tkt.price,
                                groupMin: tkt.groupMin || 1,
                                groupMax: tkt.groupMax || 4,
                                registrationFields: normalizeRegistrationFields(tkt.registrationFields),
                                requiresTeamDetails: tkt.requiresTeamDetails || false,
                                totalSlots: tkt.totalSlots,
                                isActive: tkt.isActive,
                              });
                            }}
                            className="text-xs text-blue-400 hover:text-blue-300 border border-blue-500/30 px-3 py-1 rounded-lg transition hover:bg-blue-500/10"
                          >
                            Edit
                          </button>
                          {tkt.isActive
                            ? <button onClick={() => handleDelete(tkt._id || tkt.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1 rounded-lg transition hover:bg-red-500/10">Deactivate</button>
                            : <button onClick={() => handleActivate(tkt._id || tkt.id)} className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg transition hover:bg-emerald-500/10">Activate</button>
                          }
                        </div>
                      </div>
                      {tkt.description && <p className="text-gray-400 text-sm mb-3">{tkt.description}</p>}
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-3">
                        <div><span className="text-gray-500">Price: </span><span className="text-cyan-400 font-bold">{tkt.price === 0 ? "Free" : `₹${tkt.price}/person`}</span></div>
                        {tkt.type === "group" && (
                          <div><span className="text-gray-500">Group: </span><span className="text-purple-300 font-medium">{tkt.groupMin}–{tkt.groupMax} members</span></div>
                        )}
                        <div><span className="text-gray-500">Sold: </span><span className="text-white font-medium">{tkt.soldCount}</span></div>
                        <div>
                          <span className="text-gray-500">Available: </span>
                          <span className={`font-medium ${availSlots !== null && availSlots <= 10 ? "text-red-400" : "text-white"}`}>
                            {availSlots === null ? "∞" : availSlots}
                          </span>
                        </div>
                      </div>
                      {/* Registration fields */}
                      <div className="flex flex-wrap gap-1.5">
                        {(tkt.registrationFields || []).map((f, idx) => {
                          const fieldKey = typeof f === 'string' ? f : f.field;
                          const isRequired = typeof f === 'object' ? f.required !== false : true;
                          const fieldMeta = ALL_FIELDS.find(a => a.key === fieldKey);
                          return (
                            <span key={`${fieldKey}-${idx}`} className={`text-xs px-2 py-0.5 rounded-full border ${
                              isRequired 
                                ? "bg-cyan-900/30 border-cyan-500/40 text-cyan-300" 
                                : "bg-gray-800 border-gray-700 text-gray-400"
                            }`}>
                              {fieldMeta?.label || fieldKey}
                              {isRequired ? " *" : ""}
                            </span>
                          );
                        })}
                        {tkt.requiresTeamDetails && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300">
                              Team Name & Leader
                            </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* EDIT */
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Name *</Label>
                          <Input value={editData.name} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))} />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <select value={editData.type} onChange={e => setEditData(p => ({ ...p, type: e.target.value }))} className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                            <option value="individual">Individual</option>
                            <option value="group">Group</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input value={editData.description} onChange={e => setEditData(p => ({ ...p, description: e.target.value }))} />
                      </div>
                      <div className={`grid gap-3 ${editData.type === "group" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
                        <div>
                          <Label>Price (₹/person)</Label>
                          <Input type="number" min="0" value={editData.price} onChange={e => setEditData(p => ({ ...p, price: e.target.value }))} />
                        </div>
                        {editData.type === "group" && (
                          <>
                            <div>
                              <Label>Min Members</Label>
                              <Input type="number" min="1" value={editData.groupMin} onChange={e => setEditData(p => ({ ...p, groupMin: e.target.value === "" ? "" : Number(e.target.value) }))} />
                            </div>
                            <div>
                              <Label>Max Members</Label>
                              <Input type="number" min={editData.groupMin || 1} value={editData.groupMax} onChange={e => setEditData(p => ({ ...p, groupMax: e.target.value === "" ? "" : Number(e.target.value) }))} />
                            </div>
                          </>
                        )}
                        <div>
                          <Label>Total Slots</Label>
                          <Input type="number" min="1" value={editData.totalSlots || ""} placeholder="unlimited" onChange={e => setEditData(p => ({ ...p, totalSlots: e.target.value || null }))} />
                        </div>
                      </div>
                      <FieldSelector
                        selected={normalizeRegistrationFields(editData.registrationFields)}
                        onChange={v => setEditData(p => ({ ...p, registrationFields: v }))}
                      />
                      <div className="flex items-center gap-2 mt-4">
                        <input 
                          type="checkbox" 
                          id={`req-team-details-${tkt._id || tkt.id}`} 
                          checked={editData.requiresTeamDetails || false} 
                          onChange={e => setEditData(p => ({ ...p, requiresTeamDetails: e.target.checked }))} 
                          className="w-4 h-4 rounded cursor-pointer focus:ring-blue-500 bg-[#0f172a] border-gray-700" 
                        />
                        <label htmlFor={`req-team-details-${tkt._id || tkt.id}`} className="text-sm text-gray-300 cursor-pointer select-none">
                          Collect Team Name & Team Leader (for Team/Group)
                        </label>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id={`active-${tkt._id || tkt.id}`} checked={editData.isActive} onChange={e => setEditData(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded cursor-pointer" />
                        <label htmlFor={`active-${tkt._id || tkt.id}`} className="text-sm text-gray-300 cursor-pointer select-none">Active (visible to users)</label>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 rounded-lg transition">Cancel</button>
                        <button type="button" onClick={() => handleUpdate(tkt._id || tkt.id)} disabled={saving} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50">
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
