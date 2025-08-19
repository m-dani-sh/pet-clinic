import { setGlobalOptions } from "firebase-functions/v2/options";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

// Read secrets set via `firebase functions:config:set`
const gmailUser: string = process.env.FUNCTIONS_EMULATOR
  ? "test@example.com"
  : (require("firebase-functions").config().smtp.user as string);

const gmailPass: string = process.env.FUNCTIONS_EMULATOR
  ? "testpass"
  : (require("firebase-functions").config().smtp.pass as string);

const adminEmail: string = process.env.FUNCTIONS_EMULATOR
  ? "test@example.com"
  : (require("firebase-functions").config().admin.email as string);

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

// ---------- Helpers ----------
interface AppointmentData {
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  petName?: string;
  animalType?: string;
  date?: string;
  time?: string;
  doctor?: string;
  status?: string;
}

const makeUserEmailHtml = (data: AppointmentData): string => `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;">
    <h2>Appointment Confirmed</h2>
    <p>Hi ${data.ownerName || "there"},</p>
    <p>Your appointment for <strong>${data.petName || "your pet"}</strong>${
  data.animalType ? ` (${data.animalType})` : ""
} has been booked.</p>
    <ul>
      <li><strong>Date:</strong> ${data.date}</li>
      <li><strong>Time:</strong> ${data.time}</li>
      <li><strong>Doctor:</strong> ${data.doctor || "Any Available Doctor"}</li>
    </ul>
    <p>We look forward to seeing you!</p>
    <p>— PetCare Clinic</p>
  </div>
`;

const makeAdminEmailHtml = (data: AppointmentData, docId: string): string => `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;">
    <h2>New Appointment Booked</h2>
    <ul>
      <li><strong>Doc ID:</strong> ${docId}</li>
      <li><strong>Pet:</strong> ${data.petName || "-"} (${data.animalType || "-"})</li>
      <li><strong>Owner:</strong> ${data.ownerName || "-"} (${data.ownerPhone || "-"})</li>
      <li><strong>Email:</strong> ${data.ownerEmail || "-"}</li>
      <li><strong>Date & Time:</strong> ${data.date || "-"} @ ${data.time || "-"}</li>
      <li><strong>Doctor:</strong> ${data.doctor || "Any Available Doctor"}</li>
      <li><strong>Status:</strong> ${data.status || "-"}</li>
    </ul>
  </div>
`;

// ============== 1) Email on CREATE ==============
export const sendAppointmentEmailsOnCreate = onDocumentCreated("appointments/{docId}", async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data() as AppointmentData;
  const docId = event.params.docId;

  const userEmail = data.ownerEmail;

  const userMail = {
    from: gmailUser,
    to: userEmail,
    subject: "Your PetCare Appointment is Booked",
    html: makeUserEmailHtml(data),
  };

  const adminMail = {
    from: gmailUser,
    to: adminEmail,
    subject: "New Appointment Booked",
    html: makeAdminEmailHtml(data, docId),
  };

  try {
    if (userEmail) await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);
    console.log("Emails sent for doc:", docId);
  } catch (err) {
    console.error("Error sending emails:", err);
  }
});

// ============== 2) Email on STATUS CHANGE (optional) ==============
export const sendEmailsOnStatusConfirmed = onDocumentUpdated("appointments/{docId}", async (event) => {
  const before = event.data?.before.data() as AppointmentData;
  const after = event.data?.after.data() as AppointmentData;

  if (!before || !after) return null;
  if (before.status === after.status) return null;
  if (after.status !== "confirmed") return null;

  const docId = event.params.docId;
  const userEmail = after.ownerEmail;

  const userMail = {
    from: gmailUser,
    to: userEmail,
    subject: "Your PetCare Appointment is Confirmed",
    html: `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;">
        <h2>Appointment Confirmed</h2>
        <p>Hi ${after.ownerName || "there"}, your appointment is now <strong>confirmed</strong>.</p>
        <ul>
          <li><strong>Date:</strong> ${after.date}</li>
          <li><strong>Time:</strong> ${after.time}</li>
          <li><strong>Doctor:</strong> ${after.doctor || "Any Available Doctor"}</li>
        </ul>
        <p>— PetCare Clinic</p>
      </div>
    `,
  };

  const adminMail = {
    from: gmailUser,
    to: adminEmail,
    subject: "Appointment Status Updated to CONFIRMED",
    html: makeAdminEmailHtml(after, docId),
  };

  try {
    if (userEmail) await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);
    console.log("Status-confirmed emails sent for doc:", docId);
  } catch (err) {
    console.error("Error sending status-confirmed emails:", err);
  }
  return null;
});
