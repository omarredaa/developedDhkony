// app/Components/OtpLogin.tsx
"use client";

import { auth } from "@/firebase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useState, useTransition } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// A prop to tell the parent (CheckoutForm) about the verified phone number
interface OtpLoginProps {
  onVerificationSuccess: (verifiedPhoneNumber: string) => void;
}

function OtpLogin({ onVerificationSuccess }: OtpLoginProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const [verificationId, setVerificationId] =
    useState<ConfirmationResult | null>(null);

  // 1. Initialize ReCAPTCHA
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
  };

  // 2. Request OTP Code (Triggered by Button onClick)
  const handleRequestCode = async () => {
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;

    startTransition(async () => {
      try {
        const confirmation = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier,
        );
        setVerificationId(confirmation);
        console.log("OTP Sent!");
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert(`Error: ${error.message}`);
      }
    });
  };

  // 3. Verify the 6-digit OTP Code
  const handleVerifyOtp = async () => {
    if (!verificationId) return;

    startTransition(async () => {
      try {
        await verificationId.confirm(otp);
        // On success, notify parent component with the *original* phone number
        onVerificationSuccess(phoneNumber);
      } catch (error) {
        console.error("Invalid OTP", error);
        alert("Invalid verification code. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 items-center">
      {!verificationId ? (
        /* Step 1: Phone Number Input (USING A DIV, NOT A FORM) */
        <div className="space-y-4 w-full max-w-sm">
          <Input
            placeholder="+1 123 456 7890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isPending}
          />
          <Button
            type="button"
            onClick={handleRequestCode}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Sending..." : "Send Code"}
          </Button>
        </div>
      ) : (
        /* Step 2: OTP Input Slots */
        <div className="space-y-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="button"
            onClick={handleVerifyOtp}
            disabled={isPending || otp.length < 6}
            className="w-full"
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      )}

      {/* Hidden div required for Firebase ReCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default OtpLogin;
