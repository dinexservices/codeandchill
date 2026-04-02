"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchEventById, deleteEvent, updateEvent } from "@/store/slices/eventSlice";

const Label = ({ children }) => (
  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition ${className}`}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition resize-none ${className}`}
  />
);

const SectionCard = ({ title, children, toggleAction, isActive }) => (
  <div className={`bg-[#0f172a] border ${isActive === false ? 'border-gray-800 opacity-70' : 'border-gray-700'} rounded-2xl p-6 space-y-4 transition`}>
    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">
        {title}
      </h3>
      {toggleAction && (
        <label className="flex items-center gap-2 cursor-pointer group" title="Toggle visibility on public page">
          <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-400 transition">{isActive ? 'Visible' : 'Hidden'}</span>
          <div className="relative flex items-center">
            <input type="checkbox" className="sr-only" checked={isActive} onChange={toggleAction} />
            <div className={`w-9 h-5 border-2 rounded-full transition-colors ${isActive ? 'bg-blue-600 border-blue-600' : 'bg-gray-800 border-gray-600'}`}></div>
            <div className={`absolute left-[3px] top-[3px] w-3.5 h-3.5 rounded-full bg-white transition-transform ${isActive ? 'translate-x-[15px]' : 'translate-x-0'}`}></div>
          </div>
        </label>
      )}
    </div>
    <div className={`transition-opacity duration-300 ${isActive === false ? 'opacity-40 grayscale-[50%]' : ''}`}>
      {children}
    </div>
  </div>
);

const ChipAdder = ({ label, placeholder, chips, onAdd, onRemove, color = "blue" }) => {
  const [val, setVal] = useState("");
  const borderColor = { blue: "border-blue-500/40 text-blue-300 bg-blue-900/20", emerald: "border-emerald-500/40 text-emerald-300 bg-emerald-900/20", purple: "border-purple-500/40 text-purple-300 bg-purple-900/20" };
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (val.trim()) { onAdd(val.trim()); setVal(""); } } }}
        />
        <button
          type="button"
          onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); } }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition shrink-0"
        >
          Add
        </button>
      </div>
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((chip, i) => (
            <span key={i} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${borderColor[color] || borderColor.blue}`}>
              {chip}
              <button type="button" onClick={() => onRemove(i)} className="text-gray-400 hover:text-red-400 transition">✕</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

function formatDateForInput(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.eventId;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const ev = await dispatch(fetchEventById(eventId)).unwrap();
        
        if (ev) {
          setForm({
            title: ev.title || "",
            slug: ev.slug || "",
            shortDescription: ev.shortDescription || "",
            longDescription: ev.longDescription || "",
            eventDate: formatDateForInput(ev.eventDate),
            durationHours: ev.durationHours?.toString() || "",
            location: ev.location || "",
            registrationFee: ev.registrationFee?.toString() || "",
            registrationLink: ev.registrationLink || "",
            redirectUrl: ev.redirectUrl || "",
            coverImage: ev.coverImage || "",
            highlights: ev.highlights || [],
            domains: ev.domains || [],
            tags: ev.tags || [],
            hackathonFlow: ev.hackathonFlow || [],
            eventStructure: ev.eventStructure || [],
            whatParticipantsWillReceive: ev.whatParticipantsWillReceive || [],
            rulesAndGuidelines: ev.rulesAndGuidelines || [],
            submissionRequirements: ev.submissionRequirements || [],
            prizes: ev.prizes || { firstPlace: "", secondPlace: "", thirdPlace: "" },
            speakers: ev.speakers || [],
            sponsors: ev.sponsors || [],
            visibilityConfig: ev.visibilityConfig || {
              showTickets: true, showAbout: true, showHighlights: true, showSpeakers: true,
              showDomains: true, showSchedule: true, showTimeline: true, showPrizes: true,
              showSponsors: true, showGuidelines: true
            },
          });
        }
      } catch (err) {
        console.error(err);
        setToast({ type: "error", msg: typeof err === 'string' ? err : "Failed to load event data" });
      } finally {
        setFetching(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const addToArr = (key, val) => setForm((prev) => ({ ...prev, [key]: [...prev[key], val] }));
  const removeFromArr = (key, idx) => setForm((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== idx) }));
  const updateArrItem = (key, idx, updated) =>
    setForm((prev) => ({ ...prev, [key]: prev[key].map((item, i) => (i === idx ? updated : item)) }));

  const toggleVisibility = (key) => setForm((prev) => ({
    ...prev,
    visibilityConfig: { ...prev.visibilityConfig, [key]: !prev.visibilityConfig[key] }
  }));

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));
  };

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("⚠️ This will permanently delete the event and deactivate all its tickets. Are you sure?")) return;
    setDeleting(true);
    try {
      await dispatch(deleteEvent(eventId)).unwrap();
      setToast({ type: "success", msg: "Event deleted successfully!" });
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setToast({ type: "error", msg: typeof err === 'string' ? err : "Could not delete event." });
    } finally {
      setDeleting(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        durationHours: Number(form.durationHours) || 0,
        registrationFee: Number(form.registrationFee) || 0,
      };
      await dispatch(updateEvent({ eventId, eventData: payload })).unwrap();
      setToast({ type: "success", msg: "Event updated successfully!" });
      setTimeout(() => router.push(`/event/${eventId}`), 1500);
    } catch (err) {
      setToast({ type: "error", msg: typeof err === 'string' ? err : "Something went wrong." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading event...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400">Event not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg animate-slideIn ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Event</h1>
          <p className="text-gray-400 text-sm mt-1">Update event details.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/event/${eventId}/tickets`}
            className="text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-lg transition hover:bg-emerald-500/10"
          >
            🎟️ Manage Tickets
          </a>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-red-400 hover:text-red-300 border border-red-500/30 px-4 py-1.5 rounded-lg transition hover:bg-red-500/10 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "🗑️ Delete Event"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <SectionCard title="Basic Information" toggleAction={() => toggleVisibility('showAbout')} isActive={form.visibilityConfig.showAbout}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Event Title *</Label>
              <Input name="title" placeholder="e.g. Code & Chill 2.0" value={form.title} onChange={handleTitleChange} required />
            </div>
            <div>
              <Label>Slug *</Label>
              <Input name="slug" placeholder="auto-generated" value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
            </div>
          </div>

          <div>
            <Label>Short Description *</Label>
            <Textarea name="shortDescription" placeholder="Brief summary shown in cards (1-2 lines)" rows={2} value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} required />
          </div>

          <div>
            <Label>Long Description</Label>
            <Textarea name="longDescription" placeholder="Full event details, markdown supported..." rows={6} value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} />
          </div>
        </SectionCard>

        <SectionCard title="Tickets & Registration" toggleAction={() => toggleVisibility('showTickets')} isActive={form.visibilityConfig.showTickets}>
          <p className="text-gray-400 text-sm">Control whether the registration and ticketing section is rendered on the public event page.</p>
        </SectionCard>

        <SectionCard title="Event Details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Event Date & Time</Label>
              <Input type="datetime-local" name="eventDate" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
            </div>
            <div>
              <Label>Duration (hours)</Label>
              <Input type="number" min="0" name="durationHours" placeholder="24" value={form.durationHours} onChange={(e) => set("durationHours", e.target.value)} />
            </div>
            <div>
              <Label>Location / Venue</Label>
              <Input name="location" placeholder="Online / City, State" value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Registration Fee (₹)</Label>
              <Input type="number" min="0" name="registrationFee" placeholder="0 = Free" value={form.registrationFee} onChange={(e) => set("registrationFee", e.target.value)} />
            </div>
            <div>
              <Label>Registration Link</Label>
              <Input name="registrationLink" placeholder="https://..." value={form.registrationLink} onChange={(e) => set("registrationLink", e.target.value)} />
            </div>
            <div>
              <Label>Redirect URL (Register button)</Label>
              <Input name="redirectUrl" placeholder="https://..." value={form.redirectUrl} onChange={(e) => set("redirectUrl", e.target.value)} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Cover Image">
          <div>
            <Label>Image URL</Label>
            <Input name="coverImage" placeholder="https://example.com/cover.jpg" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
          </div>
          {form.coverImage && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-700 h-52 w-full">
              <img src={form.coverImage} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
            </div>
          )}
        </SectionCard>

        <SectionCard title="Prizes" toggleAction={() => toggleVisibility('showPrizes')} isActive={form.visibilityConfig.showPrizes}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["firstPlace", "secondPlace", "thirdPlace"].map((place) => (
              <div key={place}>
                <Label>{place.replace("Place", " Place").replace(/([A-Z])/g, " $1").trim()}</Label>
                <Input placeholder="e.g. ₹1,00,000 + Trophy" value={form.prizes[place]} onChange={(e) => set("prizes", { ...form.prizes, [place]: e.target.value })} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tags">
          <ChipAdder label="Tags" placeholder="e.g. AI, Hackathon (press Enter)" chips={form.tags} onAdd={(v) => addToArr("tags", v)} onRemove={(i) => removeFromArr("tags", i)} color="blue" />
        </SectionCard>

        <SectionCard title="Domains" toggleAction={() => toggleVisibility('showDomains')} isActive={form.visibilityConfig.showDomains}>
          <ChipAdder label="Domains" placeholder="e.g. Web Development" chips={form.domains} onAdd={(v) => addToArr("domains", v)} onRemove={(i) => removeFromArr("domains", i)} color="emerald" />
        </SectionCard>

        <SectionCard title="Highlights" toggleAction={() => toggleVisibility('showHighlights')} isActive={form.visibilityConfig.showHighlights}>
          <ChipAdder label="Highlights" placeholder="e.g. 500+ participants" chips={form.highlights} onAdd={(v) => addToArr("highlights", v)} onRemove={(i) => removeFromArr("highlights", i)} color="purple" />
        </SectionCard>

        <SectionCard title="What Participants Will Receive">
          <ChipAdder label="Perks / Benefits" placeholder="e.g. Certificate of Participation" chips={form.whatParticipantsWillReceive} onAdd={(v) => addToArr("whatParticipantsWillReceive", v)} onRemove={(i) => removeFromArr("whatParticipantsWillReceive", i)} color="emerald" />
        </SectionCard>

        <SectionCard title="Rules & Guidelines" toggleAction={() => toggleVisibility('showGuidelines')} isActive={form.visibilityConfig.showGuidelines}>
          <ChipAdder label="Rules" placeholder="e.g. Teams of max 4 members" chips={form.rulesAndGuidelines} onAdd={(v) => addToArr("rulesAndGuidelines", v)} onRemove={(i) => removeFromArr("rulesAndGuidelines", i)} color="blue" />
        </SectionCard>

        <SectionCard title="Submission Requirements">
          <ChipAdder label="Requirements" placeholder="e.g. GitHub repo link" chips={form.submissionRequirements} onAdd={(v) => addToArr("submissionRequirements", v)} onRemove={(i) => removeFromArr("submissionRequirements", i)} color="purple" />
        </SectionCard>

        <SectionCard title="Hackathon Flow (Steps)" toggleAction={() => toggleVisibility('showTimeline')} isActive={form.visibilityConfig.showTimeline}>
          <div className="space-y-3">
            {form.hackathonFlow.map((step, i) => (
              <div key={i} className="grid grid-cols-[48px_1fr_2fr_36px] gap-2 items-start bg-gray-900 p-3 rounded-xl border border-gray-700">
                <div>
                  <Label>Step</Label>
                  <Input type="number" min="1" value={step.stepNumber} onChange={(e) => updateArrItem("hackathonFlow", i, { ...step, stepNumber: e.target.value })} className="text-center" />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input value={step.title} placeholder="e.g. Registration" onChange={(e) => updateArrItem("hackathonFlow", i, { ...step, title: e.target.value })} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input value={step.description} placeholder="Brief description..." onChange={(e) => updateArrItem("hackathonFlow", i, { ...step, description: e.target.value })} />
                </div>
                <div className="pt-6">
                  <button type="button" onClick={() => removeFromArr("hackathonFlow", i)} className="text-red-400 hover:text-red-300 text-lg">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("hackathonFlow", { stepNumber: form.hackathonFlow.length + 1, title: "", description: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">
            + Add Step
          </button>
        </SectionCard>

        <SectionCard title="Event Structure / Schedule" toggleAction={() => toggleVisibility('showSchedule')} isActive={form.visibilityConfig.showSchedule}>
          <div className="space-y-3">
            {form.eventStructure.map((phase, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_2fr_36px] gap-2 items-start bg-gray-900 p-3 rounded-xl border border-gray-700">
                <div>
                  <Label>Phase Name *</Label>
                  <Input value={phase.phaseName} placeholder="e.g. Opening Ceremony" onChange={(e) => updateArrItem("eventStructure", i, { ...phase, phaseName: e.target.value })} />
                </div>
                <div>
                  <Label>Time *</Label>
                  <Input value={phase.time} placeholder="10:00 AM" onChange={(e) => updateArrItem("eventStructure", i, { ...phase, time: e.target.value })} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input value={phase.description} placeholder="What happens in this phase..." onChange={(e) => updateArrItem("eventStructure", i, { ...phase, description: e.target.value })} />
                </div>
                <div className="pt-6">
                  <button type="button" onClick={() => removeFromArr("eventStructure", i)} className="text-red-400 hover:text-red-300 text-lg">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("eventStructure", { phaseName: "", time: "", description: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">
            + Add Phase
          </button>
        </SectionCard>

        <SectionCard title="Speakers" toggleAction={() => toggleVisibility('showSpeakers')} isActive={form.visibilityConfig.showSpeakers}>
          <div className="space-y-4">
            {form.speakers.map((sp, i) => (
              <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Speaker {i + 1}</span>
                  <button type="button" onClick={() => removeFromArr("speakers", i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><Label>Name</Label><Input value={sp.name} placeholder="Full name" onChange={(e) => updateArrItem("speakers", i, { ...sp, name: e.target.value })} /></div>
                  <div><Label>Role / Title</Label><Input value={sp.role} placeholder="e.g. CTO @ Acme Inc." onChange={(e) => updateArrItem("speakers", i, { ...sp, role: e.target.value })} /></div>
                  <div><Label>Photo URL</Label><Input value={sp.image} placeholder="https://..." onChange={(e) => updateArrItem("speakers", i, { ...sp, image: e.target.value })} /></div>
                  <div><Label>LinkedIn URL</Label><Input value={sp.linkedin} placeholder="https://linkedin.com/in/..." onChange={(e) => updateArrItem("speakers", i, { ...sp, linkedin: e.target.value })} /></div>
                </div>
                <div><Label>About</Label><Textarea value={sp.about} placeholder="Brief bio..." rows={2} onChange={(e) => updateArrItem("speakers", i, { ...sp, about: e.target.value })} /></div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("speakers", { name: "", role: "", image: "", linkedin: "", about: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">
            + Add Speaker
          </button>
        </SectionCard>

        <SectionCard title="Sponsors" toggleAction={() => toggleVisibility('showSponsors')} isActive={form.visibilityConfig.showSponsors}>
          <div className="space-y-4">
            {form.sponsors.map((sp, i) => (
              <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Sponsor {i + 1}</span>
                  <button type="button" onClick={() => removeFromArr("sponsors", i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div><Label>Name</Label><Input value={sp.name} placeholder="Company name" onChange={(e) => updateArrItem("sponsors", i, { ...sp, name: e.target.value })} /></div>
                  <div><Label>Logo URL</Label><Input value={sp.image} placeholder="https://..." onChange={(e) => updateArrItem("sponsors", i, { ...sp, image: e.target.value })} /></div>
                  <div><Label>Website</Label><Input value={sp.website} placeholder="https://..." onChange={(e) => updateArrItem("sponsors", i, { ...sp, website: e.target.value })} /></div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addToArr("sponsors", { name: "", image: "", website: "" })} className="mt-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition hover:bg-blue-500/10">
            + Add Sponsor
          </button>
        </SectionCard>

        <div className="flex justify-between gap-4 pt-2 flex-wrap">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-400 rounded-xl text-sm transition disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "🗑️ Delete Event"}
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-600/20">
              {submitting ? "Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
