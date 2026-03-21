import ExcelJS from "exceljs";
import eventRegistration from "../../model/eventRegistration.js";
import Event from "../../model/event.js";

/**
 * GET /api/v1/events/export-excel?eventId=<id>   → single event
 * GET /api/v1/events/export-excel                 → all events
 */
const exportRegistrationsExcel = async (req, res) => {
  try {
    const { eventId } = req.query;

    // ── Fetch events ────────────────────────────────────────────────────
    let events;
    if (eventId) {
      const ev = await Event.findById(eventId, "_id title").lean();
      if (!ev) return res.status(404).json({ success: false, message: "Event not found" });
      events = [ev];
    } else {
      events = await Event.find({}, "_id title").lean();
    }

    const eventMap = {};
    for (const ev of events) eventMap[ev._id.toString()] = ev.title;

    // ── Fetch registrations ─────────────────────────────────────────────
    const query = eventId ? { event: eventId } : {};
    const registrations = await eventRegistration.find(query).sort({ createdAt: -1 }).lean();

    // ── Build workbook ──────────────────────────────────────────────────
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Code & Chill Admin";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Registrations");

    // Header row
    const columns = [
      { header: "Event",            key: "event",              width: 30 },
      { header: "Team Name",        key: "teamName",           width: 20 },
      { header: "Team Leader",      key: "teamLeaderName",     width: 20 },
      { header: "Ticket Count",     key: "ticketCount",        width: 14 },
      { header: "Payment Status",   key: "paymentStatus",      width: 16 },
      { header: "Amount (₹)",       key: "amount",             width: 12 },
      { header: "Payment ID",       key: "paymentId",          width: 28 },
      { header: "Registered At",    key: "registeredAt",       width: 20 },
      // Participant fields
      { header: "Name",             key: "name",               width: 22 },
      { header: "Email",            key: "email",              width: 28 },
      { header: "Phone",            key: "phone",              width: 16 },
      { header: "College",          key: "college",            width: 28 },
      { header: "Reg Number",       key: "registrationNumber", width: 18 },
      { header: "Year",             key: "year",               width: 10 },
      { header: "Department",       key: "department",         width: 20 },
      // Startup fields
      { header: "Startup Name",     key: "startupName",        width: 24 },
      { header: "State",            key: "state",              width: 16 },
      { header: "City",             key: "city",               width: 16 },
      { header: "Website",          key: "website",            width: 30 },
      { header: "Pitch Deck",       key: "pitchDeck",          width: 30 },
      { header: "Stage",            key: "stage",              width: 16 },
      { header: "Sector",           key: "sector",             width: 20 },
    ];

    sheet.columns = columns;

    // Style header row
    const headerRow = sheet.getRow(1);
    headerRow.font    = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill    = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E3A5F" } };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.height  = 22;

    // ── Flatten participant rows ─────────────────────────────────────────
    for (const reg of registrations) {
      const eventTitle = eventMap[reg.event?.toString()] || "";
      const sharedCols = {
        event:          eventTitle,
        teamName:       reg.teamName || "",
        teamLeaderName: reg.teamLeaderName || "",
        ticketCount:    reg.ticketCount || 1,
        paymentStatus:  reg.payment?.status || "pending",
        amount:         reg.payment?.amount || 0,
        paymentId:      reg.payment?.paymentId || "",
        registeredAt:   reg.createdAt
          ? new Date(reg.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : "",
      };

      const participants = reg.participants?.length ? reg.participants : [{}];
      for (const p of participants) {
        sheet.addRow({
          ...sharedCols,
          name:               p.name               || "",
          email:              p.email              || "",
          phone:              p.phone              || "",
          college:            p.college            || p.collegeName      || "",
          registrationNumber: p.registrationNumber || "",
          year:               p.year               || p.yearOfStudy      || "",
          department:         p.department         || p.course           || "",
          startupName:        p.startupName        || "",
          state:              p.state              || "",
          city:               p.city               || "",
          website:            p.website            || "",
          pitchDeck:          p.pitchDeck          || "",
          stage:              p.stage              || "",
          sector:             p.sector             || "",
        });
      }
    }

    // Alternating row colours
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const fill = rowNumber % 2 === 0
        ? { type: "pattern", pattern: "solid", fgColor: { argb: "FF0D1526" } }
        : { type: "pattern", pattern: "solid", fgColor: { argb: "FF111C35" } };
      row.eachCell((cell) => { cell.fill = fill; });
    });

    // Auto-filter on header row
    sheet.autoFilter = { from: "A1", to: `${String.fromCharCode(64 + columns.length)}1` };

    // ── Stream response ─────────────────────────────────────────────────
    const filename = eventId
      ? `registrations-${eventId}.xlsx`
      : `all-registrations-${Date.now()}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Excel export error:", error);
    res.status(500).json({ success: false, message: "Failed to generate Excel file." });
  }
};

export default exportRegistrationsExcel;
