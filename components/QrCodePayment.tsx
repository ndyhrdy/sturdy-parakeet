import React, { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { api } from "../helpers/api";
import { ChannelDana } from "./icons/ChannelDana";
import { ChannelGopay } from "./icons/ChannelGopay";
import { ChannelLinkaja } from "./icons/ChannelLinkaja";
import { ChannelOvo } from "./icons/ChannelOvo";
import { ChannelShopeepay } from "./icons/ChannelShopeepay";
import { usePaymentContext } from "./Payment";

export { QrCodePayment };

const QrCodePayment = () => {
  const { order } = usePaymentContext();

  const qrCode = order?.qrCode;
  const [creatingQrCode, setCreatingQrCode] = useState(false);
  const [attemptedCreatingQrCode, setAttemptedCreatingQrCode] = useState(false);

  const handleCreateQrCode = useCallback(async () => {
    if (creatingQrCode || qrCode) {
      return;
    }

    setCreatingQrCode(true);
    setAttemptedCreatingQrCode(true);
    await api.post(`/payment/qr/${order?.id}`);
    setCreatingQrCode(false);
  }, [creatingQrCode]);

  useEffect(() => {
    if (!attemptedCreatingQrCode) {
      handleCreateQrCode();
    }
  }, [handleCreateQrCode, attemptedCreatingQrCode]);

  if (creatingQrCode) {
    return (
      <div className="px-6">
        <p>Generating QR code...</p>
      </div>
    );
  }

  if (qrCode) {
    return (
      <div className="px-6">
        <div className="flex flex-col lg:flex-row items-center -mx-3">
          <div className="flex-shrink-0 px-3 mb-6">
            <div className="p-3 rounded-xl bg-white">
              <QRCode value={qrCode.qr_string} />
            </div>
          </div>
          <div className="flex-1 px-3 flex flex-col items-center lg:items-start">
            <p className="mb-6 text-center lg:text-start">
              Scan the QR code to pay using any QRIS-supported apps.
            </p>
            <div className="flex items-center flex-wrap -mx-1">
              <div className="px-1 mb-3">
                <ChannelOvo className="text-teal-400 h-4" />
              </div>
              <div className="px-1 mb-3">
                <ChannelGopay className="text-teal-400 h-4" />
              </div>
              <div className="px-1 mb-3">
                <ChannelShopeepay className="text-teal-400 h-4" />
              </div>
              <div className="px-1 mb-3">
                <ChannelLinkaja className="text-teal-400 h-4" />
              </div>
              <div className="px-1 mb-3">
                <ChannelDana className="text-teal-400 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <p>
        Failed to generate QR code.{" "}
        <button
          type="button"
          onClick={handleCreateQrCode}
          className="text-teal-500 dark:text-teal-400 hover:underline"
        >
          Try again
        </button>
      </p>
    </div>
  );
};
