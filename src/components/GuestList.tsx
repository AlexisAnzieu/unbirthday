import { useEffect, useState } from "react";
import { getGuests } from "../db";

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  registeredAt: string;
}

function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGuests = async () => {
      try {
        setLoading(true);
        const guestList = await getGuests();
        setGuests(guestList);
      } catch (error) {
        console.error("Error loading guests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGuests();
  }, []);

  return (
    <div className="guest-list-container">
      <div className="card">
        <h1>Liste des invités</h1>
        <p className="subtitle">Pour le samedi 29 mars</p>
        <div className="guest-list">
          {loading ? (
            <p className="loading">Chargement...</p>
          ) : guests.length > 0 ? (
            guests.map((guest) => (
              <div key={guest.id} className="guest-item">
                <span className="guest-name">
                  {guest.firstName} {guest.lastName}
                </span>
                <span className="guest-date">
                  {new Date(guest.registeredAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))
          ) : (
            <p className="no-guests">Aucun invité pour le moment...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuestList;
