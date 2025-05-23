import MButton from "@/components/m-ui/m-button";
import { useState } from "react";
import QRScannerComponent from "@/components/shared/qr-scanner";

interface ScanQRButtonProps {
  className?: string;
  icon: React.ReactNode;
}

const ScanQRButton = ({ className, icon }: ScanQRButtonProps) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanResult = (result: string) => {
    window.location.href = result;
  }

  const handleScanError = (error: Error) => {
    console.error('QR Code scan error:', error);
  };

  const handleScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('video') as HTMLVideoElement;
      videoElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <>
      <MButton
        onClick={() => setIsScanning(true)}
        className={className}
      >
        {icon}
      </MButton>

      <QRScannerComponent
        isOpen={isScanning}
        onClose={() => setIsScanning(false)}
        onResult={handleScanResult}
        onError={handleScanError}
      />
    </>
  );
};

export default ScanQRButton;
