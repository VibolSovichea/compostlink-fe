"use client";

import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: Error) => void;
  isOpen: boolean;
  onClose: () => void;
}

const QRScannerComponent = ({ onResult, onError, isOpen, onClose }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        onResult(result.data);
        qrScanner.stop();
        onClose();
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    setScanner(qrScanner);

    return () => {
      qrScanner.destroy();
    };
  }, [onResult, onClose]);

  useEffect(() => {
    if (!scanner) return;

    if (isOpen) {
      scanner.start().catch((error) => {
        if (onError) onError(error);
      });
    } else {
      scanner.stop();
    }
  }, [isOpen, scanner, onError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white bg-red-500 p-2 rounded-full"
        >
          Close
        </button>
        <video ref={videoRef} className="w-full" />
      </div>
    </div>
  );
};

export default QRScannerComponent;