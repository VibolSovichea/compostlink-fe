const getCurrentLocation = () => {
  return new Promise<{ latitude: number; longitude: number } | null>((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => resolve(null)
      );
    } else {
      resolve(null);
    }
  });
}

export default getCurrentLocation;