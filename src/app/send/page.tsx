"use client";

import Packet from "@/components/send/Packet";

export default function Send() {
  const packetData = {
    fields: {
      image: {
        url: "/images/redPacketCover2.png",
      },
    },
  };
  return (
    <>
      <Packet {...packetData}></Packet>
    </>
  );
}
