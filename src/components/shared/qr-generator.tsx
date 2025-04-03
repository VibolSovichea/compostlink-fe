import Image from "next/image";
import QRCode from "qrcode"; 
import { useEffect, useState } from "react";

interface QRGeneratorProps {
  data?: string;
  personalInfo?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    id?: string;
  };
}

const QRGenerator = ({ data, personalInfo }: QRGeneratorProps) => {
  const [qrImageUrl, setQrImageUrl] = useState("");

  useEffect(() => {
    const canvas = document.createElement('canvas');
    if (personalInfo) {
      const randomId = personalInfo.id || Math.random().toString(36).substring(2, 10);
      
      const qrData = JSON.stringify({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phoneNumber: personalInfo.phoneNumber,
        id: randomId,
        timestamp: new Date().toISOString()
      });
      
      QRCode.toCanvas(canvas, qrData, { width: 200 }, (err) => {
        if (!err) {
          setQrImageUrl(canvas.toDataURL());
          canvas.id = 'qr-canvas';  // Add an ID to find it later
          canvas.style.display = 'none';  // Hide the canvas
          document.body.appendChild(canvas);
        }
      });
    } else if (data) {
      QRCode.toCanvas(canvas, data, { width: 200 }, (err) => {
        if (!err) {
          setQrImageUrl(canvas.toDataURL());
          canvas.id = 'qr-canvas';
          canvas.style.display = 'none';
          document.body.appendChild(canvas);
        }
      });
    }
  }, [data, personalInfo]);

  return (
    <div className="flex flex-col items-center">
      {qrImageUrl ? (
        <Image src={qrImageUrl} alt="QR Code" width={200} height={200} />
      ) : (
        <p>Generating QR code...</p>
      )}
    </div>
  );
};

export default QRGenerator;