export async function getFullAddressFromCoords(lat: number, lng: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
  
      if (data && data.display_name) {
        return data.display_name; // Returns full formatted address
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  
    return "Unknown Address";
  }
  