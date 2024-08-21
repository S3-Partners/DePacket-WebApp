import React from "react";

interface WalletConnectInterface {
  size: "md" | "mdl" | "sm" | "xxl";
}
const WalletConnect: React.FC<WalletConnectInterface> = ({ size }) => {
  return <w3m-button size={size} />;
};
export default WalletConnect;
