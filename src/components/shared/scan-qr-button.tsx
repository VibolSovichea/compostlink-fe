import MButton from "@/components/m-ui/m-button";
import { useState } from "react";
import QRScannerComponent from "@/app/scanform/page";
import { FaArrowRight } from "react-icons/fa";
 

const ScanQRButton = () => {
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
        className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-xl"
      >
        <span className="text-lg font-medium">Scan QR Code</span>
        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <FaArrowRight className="text-green-500 w-5 h-5" />
        </span>
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
