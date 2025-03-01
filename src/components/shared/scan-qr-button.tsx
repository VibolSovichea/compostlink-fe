import MButton from "../m-ui/m-button";

// const ScanQRButton = () => {

//   const onClick = () => {
//     alert("Scan QR");
//   }
//   return (
//     <MButton className="bg-primary h-12 rounded-2xl shadow-lg" onClick={onClick}>
//         Scan QR
//     </MButton>
//   )
// }

// export default ScanQRButton;

import { useState } from "react";
import QRScannerComponent from '../../app/scanform/page';

const ScanQRButton = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanResult = (result: string) => {
    console.log('QR Code result:', result);
    // Handle the QR code result here
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
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Scan QR Code
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
