import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase";
import type { AcceptanceRecord } from "./acceptanceService";

export type CheckoutSessionResponse = {
  acceptanceId: string;
  checkoutUrl: string;
};

export async function createCheckoutSession(
  payload: Omit<AcceptanceRecord, "createdAt" | "status" | "acceptedAt"> & {
    formPayload: Record<string, unknown>;
  }
): Promise<CheckoutSessionResponse> {
  if (!app) throw new Error("Firebase no inicializado");
  const functions = getFunctions(app, "us-central1");
  const fn = httpsCallable<
    typeof payload,
    CheckoutSessionResponse
  >(functions, "createCheckoutSession");
  const result = await fn(payload);
  return result.data;
}
