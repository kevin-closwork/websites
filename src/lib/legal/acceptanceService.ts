import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export type AcceptanceMethod = "WEB_CLICKWRAP" | "ESIGN_PLATFORM" | "WET_SIGNATURE";

export type AcceptanceRecord = {
  customer: {
    legalName: string;
    rfc: string;
    taxRegime: string;
    fiscalAddress: Record<string, string>;
    signerName: string;
    signerRole: string;
    email: string;
    phone: string;
  };
  frameworkDocId: string;
  frameworkVersion: string;
  frameworkHash: string;
  orderDocId: string;
  orderVersion: string;
  orderHash: string;
  privacyVersion: string;
  privacyHash: string;
  method: AcceptanceMethod;
  acceptedAt?: string;
  ipAddress: string;
  userAgent: string;
  scrolledToEnd: boolean;
  checkboxTerms: string;
  checkboxRecurring: string;
  checkboxMerchant: string;
  formPayload: Record<string, unknown>;
  totalClosers: number;
  monthlyAmountCents: number;
  currency: string;
  status: "pending" | "completed";
  stripePaymentIntentId?: string;
  stripeSubscriptionId?: string;
  summarySentAt?: string;
  summaryObjectedAt?: string;
  createdAt: ReturnType<typeof serverTimestamp>;
};

/** Append-only: solo create, nunca update/delete desde cliente. */
export async function createAcceptance(
  data: Omit<AcceptanceRecord, "createdAt" | "status"> & { status?: AcceptanceRecord["status"] }
): Promise<string> {
  if (!db) throw new Error("Firestore no disponible");
  const ref = await addDoc(collection(db, "acceptances"), {
    ...data,
    status: data.status ?? "pending",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
