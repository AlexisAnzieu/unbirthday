export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  registeredAt: string;
}

const API_URL = "/api";

export const addGuest = async (firstName: string, lastName: string) => {
  const response = await fetch(`${API_URL}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName }),
  });
  if (!response.ok) {
    throw new Error("Failed to add guest");
  }
  return response.json();
};

export const getGuests = async (): Promise<Guest[]> => {
  const response = await fetch(`${API_URL}/guests`);
  if (!response.ok) {
    throw new Error("Failed to fetch guests");
  }
  return response.json();
};
