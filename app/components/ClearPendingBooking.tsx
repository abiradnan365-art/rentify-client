"use client";
import { useEffect } from "react";

export default function ClearPendingBooking() {
  useEffect(() => {
    sessionStorage.removeItem("pendingBooking");
  }, []);

  return null;
}