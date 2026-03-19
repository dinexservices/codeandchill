"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Primitives ───────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
    {children}
  </label>
);
const Input = ({ className = "", ...props }) => (
  <input {...props} className={`w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition ${className}`} />
);
const Textarea = ({ className = "", ...props }) => (
  <textarea {...props} className={`w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition resize-none ${className}`} />
);
const SectionCard = ({ title, children }) => (
  <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 space-y-4">
    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest border-b border-gray-800 pb-3">{title}</h3>
    {children}
  </div>
);

// ─── Chip Adder ───────────────────────────────────────────────────────────
const ChipAdder = ({ label, placeholder, chips, onAdd, onRemove, color = "blue" }) => {
  const [val, setVal] = useState("");
  const styles = {
    blue:    "border-blue-500/40 text-blue-300 bg-blue-900/20",
    emerald: "border-emerald-500/40 text-emerald-300 bg-emerald-900/20",
    purple:  "border-purple-500/40 text-purple-300 bg-purple-900/20",
  };
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (val.trim()) { onAdd(val.trim()); setVal(""); } } }} />
        <button type="button" onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); } }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition shrink-0">Add</button>
      </div>
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((chip, i) => (
            <span key={i} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[color]}`}>
              {chip}
              <button type="button" onClick={() => onRemove(i)} className="text-gray-400 hover:text-red-400 transition">✕</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── All registration fields the admin can choose ─────────────────────────
const ALL_FIELDS = [
  { key: "name",               label: "Full Name" },
  { key: "email",              label: "Email" },
  { key: "phone",              label: "Phone" },
  { key: "college",            label: "College Name" },
  { key: "registrationNumber", label: "Reg. Number" },
  { key: "year",               label: "Year of Study" },
  { key: "department",         label: "Department" },
];

const emptyTicket = () => ({
  name: "",
  description: "",
  type: "individual",
  price: "",
  groupMin: 2,
  groupMax: 4,
  registrationFields: ["name", "email", "phone"],
  totalSlots: "",
});

// ─── Initial event form state ─────────────────────────────────────────────
const initialForm = {
  title: "", slug: "", shortDescription: "", longDescription: "",
  eventDate: "", durationHours: "", location: "",
  registrationFee: "", registrationLink: "", redirectUrl: "",
  coverImage: "",
  highlights: [], domains: [], tags: [],
  hackathonFlow: [], eventStructure: [],
  whatParticipantsWillReceive: [], rulesAndGuidelines: [], submissionRequirements: [],
  prizes: { firstPlace: "", secondPlace: "", thirdPlace: "" },
  speakers: [], sponsors: [],
};

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [tickets, setTickets] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (key, value) => setForm(p => ({ ...p, [key]: value }));
  const addToArr = (key, val) => setForm(p => ({ ...p, [key]: [...p[key], val] }));
  const removeFromArr = (key, idx) => setForm(p => ({ ...p, [key]: p[key].filter((_, i) => i !== idx) }));
  const updateArrItem = (key, idx, updated) => setForm(p => ({ ...p, [key]: p[key].map((item, i) => i === idx ? updated : item) }));

  const addTicket = () => setTickets(p => [...p, emptyTicket()]);
  const removeTicket = (i) => setTickets(p => p.filter((_, idx) => idx !== i));
  const updateTicketField = (i, field, value) => setTickets(p => p.map((t, idx) => idx === i ? { ...t, [field]: value } : t));

  // Toggle a registration field for one ticket
  const toggleTicketField = (ticketIdx, fieldKey) => {
    const tkt = tickets[ticketIdx];
    const current = tkt.registrationFields || [];
    const next = current.includes(fieldKey) ? current.filter(k => k !== fieldKey) : [...current, fieldKey];
    updateTicketField(ticketIdx, "registrationFields", next);
  };

  const handleTitleChange = e => {
    const title = e.target.value;
    setForm(p => ({ ...p, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API}/api/v1/events/event-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, durationHours: Number(form.durationHours) || 0, registrationFee: Number(form.registrationFee) || 0 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create event");
      const eventId = data.data._id;

      for (const tkt of tickets) {
        if (!tkt.name.trim()) continue;
        await fetch(`${API}/api/v1/events/${eventId}/tickets`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: tkt.name, description: tkt.description,
            type: tkt.type,
            price: Number(tkt.price) || 0,
            groupMin: tkt.type === "group" ? Number(tkt.groupMin) || 2 : 1,
            groupMax: tkt.type === "group" ? Number(tkt.groupMax) || 4 : 1,
            registrationFields: tkt.registrationFields,
            totalSlots: tkt.totalSlots ? Number(tkt.totalSlots) : null,
          }),
        });
      }
      setToast({ type: "success", msg: "Event created!" });
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setToast({ type: "error", msg: err.message });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Event</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in all the details to publish a new event.</p>
        </div>
        <button type="button" onClick={() => router.back()} className="text-sm text-gray-400 hover:text-white transition">← Back</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <SectionCard title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Event Title *</Label>
              <Input name="title" placeholder="e.g. Code & Chill 2.0" value={form.title} onChange={handleTitleChange} required />
            </div>
            <div>
              <Label>Slug *</Label>
              <Input name="slug" placeholder="auto-generated" value={form.slug} onChange={e => set("slug", e.target.value)} required />
            </div>
          </div>
          <div>
            <Label>Short Description *</Label>
            <Textarea name="shortDescription" placeholder="Brief summary (1-2 lines)" rows={2} value={form.shortDescription} onChange={e => set("shortDescription", e.target.value)} required />
          </div>
          <div>
            <Label>Long Description</Label>
            <Textarea name="longDescription" placeholder="Full event details..." rows={6} value={form.longDescription} onChange={e => set("longDescription", e.target.value)} />
          </div>
        </SectionCard>

        {/* Event Details */}
        <SectionCard title="Event Details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Event Date & Time</Label><Input type="datetime-local" value={form.eventDate} onChange={e => set("eventDate", e.target.value)} /></div>
            <div><Label>Duration (hours)</Label><Input type="number" min="0" placeholder="24" value={form.durationHours} onChange={e => set("durationHours", e.target.value)} /></div>
            <div><Label>Location / Venue</Label><Input placeholder="Online / City, State" value={form.location} onChange={e => set("location", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Registration Fee (₹)</Label><Input type="number" min="0" placeholder="0 = Free" value={form.registrationFee} onChange={e => set("registrationFee", e.target.value)} /></div>
            <div><Label>Registration Link</Label><Input placeholder="https://..." value={form.registrationLink} onChange={e => set("registrationLink", e.target.value)} /></div>
            <div><Label>Redirect URL</Label><Input placeholder="https://..." value={form.redirectUrl} onChange={e => set("redirectUrl", e.target.value)} /></div>
          </div>
        </SectionCard>

        {/* Cover Image */}
        <SectionCard title="Cover Image">
          <Label>Image URL</Label>
          <Input placeholder="https://example.com/cover.jpg" value={form.coverImage} onChange={e => set("coverImage", e.target.value)} />
          {form.coverImage && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-700 h-52 w-full">
              <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; }} />
            </div>
          )}
        </SectionCard>

        {/* Prizes */}
        <SectionCard title="Prizes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["firstPlace", "secondPlace", "thirdPlace"].map(place => (
              <div key={place}>
                <Label>{place.replace("Place", " Place").replace(/([A-Z])/g, " $1").trim()}</Label>
                <Input placeholder="e.g. ₹1,00,000 + Trophy" value={form.prizes[place]} onChange={e => set("prizes", { ...form.prizes, [place]: e.target.value })} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Tags, Domains, Highlights */}
        <SectionCard title="Tags, Domains & Highlights">
          <ChipAdder label="Tags" placeholder="e.g. AI, Hackathon (press Enter)" chips={form.tags} onAdd={v => addToArr("tags", v)} onRemove={i => removeFromArr("tags", i)} color="blue" />
          <ChipAdder label="Domains" placeholder="e.g. Web Development" chips={form.domains} onAdd={v => addToArr("domains", v)} onRemove={i => removeFromArr("domains", i)} color="emerald" />
          <ChipAdder label="Highlights" placeholder="e.g. 500+ participants" chips={form.highlights} onAdd={v => addToArr("highlights", v)} onRemove={i => removeFromArr("highlights", i)} color="purple" />
        </SectionCard>

        {/* What participants will receive */}
        <SectionCard title="What Participants Will Receive">
          <ChipAdder label="Perks / Benefits" placeholder="e.g. Certificate of Participation" chips={form.whatParticipantsWillReceive} onAdd={v => addToArr("whatParticipantsWillReceive", v)} onRemove={i => removeFromArr("whatParticipantsWillReceive", i)} color="emerald" />
        </SectionCard>

        {/* Rules */}
        <SectionCard title="Rules & Guidelines">
          <ChipAdder label="Rules" placeholder="e.g. Teams of max 4 members" chips={form.rulesAndGuidelines} onAdd={v => addToArr("rulesAndGuidelines", v)} onRemove={i => removeFromArr("rulesAndGuidelines", i)} color="blue" />
        </SectionCard>

        {/* Submission Requirements */}
        <SectionCard title="Submission Requirements">
          <ChipAdder label="Requirements" placeholder="e.g. GitHub repo link" chips={form.submissionRequirements} onAdd={v => addToArr("submissionRequirements", v)} onRemove={i => removeFromArr("submissionRequirements", i)} color="purple" />
        </SectionCard>

        {/* Hackathon Flow */}
        <SectionCard title="Hackathon Flow (Steps)">
          <div className="space-y-3">
            {form.hackathonFlow.map((step, i) => (
              <div key={i} className="grid grid-cols-[48px_1fr_2fr_36px] gap-2 items-start bg-gray-900 p-3 rounded-xl border border-gray-700">
                <div><Label>Step</Label><Input type="number" min="1" value={step.stepNumber} onChange={e => updateArrItem("hackathonFlow", i, { ...step, stepNumber: e.target.value })} className="text-center" /></div>
                <div><Label>Title</Label><Input value={step.title} placeholder="e.g. Registration" onChange={e => updateArrItem("hackathonFlow", i, { ...step, title: e.target.value })} /></div>
                <div><Label>Description</Label><Input value={step.description} placeholder="Brief description..." onChange={e => updateArrItem("hackathonFlow", i, { ...step, description: e.target.value })} /></div>
                <div className="pt-6"><button type="button" onClick={() => removeFromArr("hackathonFlow", i)} className="text-red-400 hover:text-red-300 text-lg">✕</button></div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("hackathonFlow", { stepNumber: form.hackathonFlow.length + 1, title: "", description: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">+ Add Step</button>
        </SectionCard>

        {/* Event Structure */}
        <SectionCard title="Event Structure / Schedule">
          <div className="space-y-3">
            {form.eventStructure.map((phase, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_2fr_36px] gap-2 items-start bg-gray-900 p-3 rounded-xl border border-gray-700">
                <div><Label>Phase Name *</Label><Input value={phase.phaseName} placeholder="e.g. Opening Ceremony" onChange={e => updateArrItem("eventStructure", i, { ...phase, phaseName: e.target.value })} /></div>
                <div><Label>Time *</Label><Input value={phase.time} placeholder="10:00 AM" onChange={e => updateArrItem("eventStructure", i, { ...phase, time: e.target.value })} /></div>
                <div><Label>Description</Label><Input value={phase.description} placeholder="What happens..." onChange={e => updateArrItem("eventStructure", i, { ...phase, description: e.target.value })} /></div>
                <div className="pt-6"><button type="button" onClick={() => removeFromArr("eventStructure", i)} className="text-red-400 hover:text-red-300 text-lg">✕</button></div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("eventStructure", { phaseName: "", time: "", description: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">+ Add Phase</button>
        </SectionCard>

        {/* Speakers */}
        <SectionCard title="Speakers">
          <div className="space-y-4">
            {form.speakers.map((sp, i) => (
              <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Speaker {i + 1}</span>
                  <button type="button" onClick={() => removeFromArr("speakers", i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><Label>Name</Label><Input value={sp.name} placeholder="Full name" onChange={e => updateArrItem("speakers", i, { ...sp, name: e.target.value })} /></div>
                  <div><Label>Role / Title</Label><Input value={sp.role} placeholder="e.g. CTO @ Acme Inc." onChange={e => updateArrItem("speakers", i, { ...sp, role: e.target.value })} /></div>
                  <div><Label>Photo URL</Label><Input value={sp.image} placeholder="https://..." onChange={e => updateArrItem("speakers", i, { ...sp, image: e.target.value })} /></div>
                  <div><Label>LinkedIn URL</Label><Input value={sp.linkedin} placeholder="https://linkedin.com/in/..." onChange={e => updateArrItem("speakers", i, { ...sp, linkedin: e.target.value })} /></div>
                </div>
                <div><Label>About</Label><Textarea value={sp.about} placeholder="Brief bio..." rows={2} onChange={e => updateArrItem("speakers", i, { ...sp, about: e.target.value })} /></div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("speakers", { name: "", role: "", image: "", linkedin: "", about: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">+ Add Speaker</button>
        </SectionCard>

        {/* Sponsors */}
        <SectionCard title="Sponsors">
          <div className="space-y-4">
            {form.sponsors.map((sp, i) => (
              <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Sponsor {i + 1}</span>
                  <button type="button" onClick={() => removeFromArr("sponsors", i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div><Label>Name</Label><Input value={sp.name} placeholder="Company name" onChange={e => updateArrItem("sponsors", i, { ...sp, name: e.target.value })} /></div>
                  <div><Label>Logo URL</Label><Input value={sp.image} placeholder="https://..." onChange={e => updateArrItem("sponsors", i, { ...sp, image: e.target.value })} /></div>
                  <div><Label>Website</Label><Input value={sp.website} placeholder="https://..." onChange={e => updateArrItem("sponsors", i, { ...sp, website: e.target.value })} /></div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("sponsors", { name: "", image: "", website: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">+ Add Sponsor</button>
        </SectionCard>

        {/* ── TICKETS ── */}
        <SectionCard title="🎟️ Tickets">
          <p className="text-gray-400 text-xs -mt-2 mb-3">
            Add ticket types. Price is always <strong className="text-white">per person</strong>.
            Use <em>Registration Fields</em> to control exactly which participant data to collect.
          </p>

          <div className="space-y-6">
            {tickets.map((tkt, i) => (
              <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Ticket {i + 1}</span>
                  <button type="button" onClick={() => removeTicket(i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>

                {/* Name + Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Ticket Name *</Label>
                    <Input value={tkt.name} placeholder="e.g. Early Bird, VIP, Group Pass" onChange={e => updateTicketField(i, "name", e.target.value)} />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <select value={tkt.type} onChange={e => updateTicketField(i, "type", e.target.value)}
                      className="w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                      <option value="individual">Individual (1 person)</option>
                      <option value="group">Group (min–max members)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label>Description</Label>
                  <Input value={tkt.description} placeholder="Brief description..." onChange={e => updateTicketField(i, "description", e.target.value)} />
                </div>

                {/* Price + Group range + Slots */}
                <div className={`grid gap-3 ${tkt.type === "group" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
                  <div>
                    <Label>Price (₹/person)</Label>
                    <Input type="number" min="0" value={tkt.price} placeholder="0 = Free" onChange={e => updateTicketField(i, "price", e.target.value)} />
                  </div>
                  {tkt.type === "group" && (
                    <>
                      <div>
                        <Label>Min Members</Label>
                        <Input type="number" min="2" value={tkt.groupMin} onChange={e => updateTicketField(i, "groupMin", Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Max Members</Label>
                        <Input type="number" min={tkt.groupMin} value={tkt.groupMax} onChange={e => updateTicketField(i, "groupMax", Number(e.target.value))} />
                      </div>
                    </>
                  )}
                  <div>
                    <Label>Total Slots (blank = ∞)</Label>
                    <Input type="number" min="1" value={tkt.totalSlots} placeholder="unlimited" onChange={e => updateTicketField(i, "totalSlots", e.target.value)} />
                  </div>
                </div>

                {/* Group price preview */}
                {tkt.type === "group" && Number(tkt.price) > 0 && (
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-purple-300 text-xs">
                    💡 Group: {tkt.groupMin}–{tkt.groupMax} members · Total ₹{Number(tkt.price) * tkt.groupMin}–₹{Number(tkt.price) * tkt.groupMax}
                  </div>
                )}

                {/* Registration Fields Selector */}
                <div>
                  <Label>Registration Fields to Collect</Label>
                  <p className="text-gray-500 text-xs mb-2">Choose which participant details to ask for each person.</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_FIELDS.map(f => {
                      const active = (tkt.registrationFields || []).includes(f.key);
                      return (
                        <button key={f.key} type="button" onClick={() => toggleTicketField(i, f.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${active ? "bg-blue-600/30 border-blue-500 text-blue-200" : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500"}`}>
                          {active && "✓ "}{f.label}
                        </button>
                      );
                    })}
                  </div>
                  {(tkt.registrationFields || []).length === 0 && (
                    <p className="text-amber-400 text-xs mt-1">⚠ Select at least one field.</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={addTicket}
            className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-lg transition hover:bg-emerald-500/10 flex items-center gap-2">
            🎟️ Add Ticket Type
          </button>
        </SectionCard>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-2">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition">Cancel</button>
          <button type="submit" disabled={submitting} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-600/20">
            {submitting ? "Creating..." : "🚀 Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
