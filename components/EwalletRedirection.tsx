import { lowerCase } from "lodash";
import React, { FC, useCallback, useMemo } from "react";
import { api } from "../helpers/api";
import { usePaymentContext } from "./Payment";
import { isMobileDevice as isMobileDeviceHelper } from "../helpers/device";

export { EwalletRedirection };

type Props = {
  channelKey: string;
  channelLabel: string;
};

type RedirectionActions = {
  desktop_web_checkout_url?: string;
  mobile_web_checkout_url?: string;
  mobile_deeplink_checkout_url?: string;
  qr_checkout_string?: string;
};

const EwalletRedirection: FC<Props> = ({ channelKey, channelLabel }) => {
  const { locked, onLock, onError, onUnlock, order } = usePaymentContext();
  const isMobileDevice = useMemo(() => {
    return isMobileDeviceHelper();
  }, []);

  const handleBegin = useCallback(async () => {
    if (locked || !order) {
      return;
    }

    onLock();
    try {
      const { data } = await api.post<RedirectionActions>(
        `/payment/ewallet/${order.id}/redirection/${lowerCase(channelKey)}`
      );
      if (isMobileDevice && data.mobile_web_checkout_url) {
        window.location.href = data.mobile_web_checkout_url;
        return;
      }
      if (data.desktop_web_checkout_url) {
        window.location.href = data.desktop_web_checkout_url;
        return;
      }
    } catch (error) {
      onError("Failed to retrieve payment destination. Please try again.");
    }

    onUnlock();
  }, [locked, isMobileDevice, onError, onLock, onUnlock]);

  return (
    <div className="p-6">
      <p>
        Click the button below to begin payment with {channelLabel}. You will be
        redirected back here when payment has succeeded.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleBegin}
          disabled={locked}
          className={`rounded-lg text-white h-10 px-4 text-lg ${
            locked
              ? "bg-stone-500 cursor-not-allowed"
              : "transition-colors bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Pay with {channelLabel} &rarr;
        </button>
      </div>
    </div>
  );
};
