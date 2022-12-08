import React, { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { api } from "../helpers/api";
import { Link } from "../renderer/Link";
import { usePaymentContext } from "./Payment";

export { EwalletQrCode };

const EwalletQrCode = () => {
  const { onLock, onUnlock } = usePaymentContext();

  const [qrCodeString, setQrCodeString] = useState<null | string>(null);
  const [deeplinkUrl, setDeeplinkUrl] = useState<null | string>(null);
  const [creatingEwalletCharge, setCreatingEwalletCharge] = useState(false);

  const { order } = usePaymentContext();

  const handleCreateEwalletCharge = useCallback(async () => {
    if (creatingEwalletCharge || qrCodeString) {
      return;
    }

    setCreatingEwalletCharge(true);
    try {
      const { data } = await api.post<{
        qr_checkout_string: string;
        mobile_deeplink_checkout_url: string;
      }>(`/payment/ewallet/${order?.id}/redirection/shopeepay`);
      setQrCodeString(data.qr_checkout_string);
      setDeeplinkUrl(data.mobile_deeplink_checkout_url);
    } catch (error) {
      window.alert(error);
    }
    setCreatingEwalletCharge(false);
  }, [creatingEwalletCharge]);

  useEffect(() => {
    if (creatingEwalletCharge) {
      onLock();
    } else {
      onUnlock();
    }
  }, [creatingEwalletCharge, onLock, onUnlock]);

  useEffect(() => {
    handleCreateEwalletCharge();
  }, [handleCreateEwalletCharge]);

  if (creatingEwalletCharge) {
    return (
      <div className="p-6">
        <p>Looking for a payment destination...</p>
      </div>
    );
  }

  if (qrCodeString && deeplinkUrl) {
    return (
      <div className="p-6 flex flex-col items-center">
        <p className="mb-6 text-center">
          Please scan or tap on the QR code to begin payment.
        </p>
        <Link href={deeplinkUrl} className="bg-white p-3 rounded-xl">
          <QRCode value={qrCodeString} />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p>
        Failed to find a payment destination.{" "}
        <button
          type="button"
          onClick={handleCreateEwalletCharge}
          className="text-teal-500 dark:text-teal-400 hover:underline"
        >
          Try again
        </button>
      </p>
    </div>
  );
};
