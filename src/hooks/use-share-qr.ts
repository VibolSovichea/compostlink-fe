export const useQrShare = () => {

  const shareQR = async () => {
    try {
      const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
      if (!canvas) {
        console.log('Canvas element not found');
        return;
      }

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png");
      });

      if (navigator.share && navigator.canShare) {
        try {
          const file = new File([blob], "Redeem QR Code", {
            type: "image/png",
          });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "Redeem QR Code",
            });
            return;
          }
        } catch (shareError) {
          console.log('Share failed, falling back to download:', shareError);
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "Redeem QR Code";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error sharing/downloading QR:', error);
    }
  };

  return {
    shareQR
  }
}