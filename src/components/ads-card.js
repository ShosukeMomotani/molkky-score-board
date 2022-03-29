import React, { useEffect } from "react";

export default function AdsCard(props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
      data-ad-format="fluid"
      data-ad-layout-key="-fl+5z+3v-d0+94"
      data-ad-client={process.env.REACT_APP_GOOGLE_AD_CLIENT}
      data-ad-slot={process.env.REACT_APP_GOOGLE_AD_SLOT}
      data-full-width-responsive="true"
    ></ins>
  );
}
