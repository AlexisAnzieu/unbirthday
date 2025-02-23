import { useEffect, useState } from "react";
import { getGuests } from "../db";
import "../styles/GuestList.css";

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  registeredAt: string;
}

type SortType = "lastName" | "registeredAt";

function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortType>("registeredAt");

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

  const sortGuests = (guests: Guest[], sortType: SortType) => {
    return [...guests].sort((a, b) => {
      if (sortType === "lastName") {
        return a.lastName.localeCompare(b.lastName);
      }
      return (
        new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
      );
    });
  };

  const handleSort = (type: SortType) => {
    setSortBy(type);
    setGuests(sortGuests(guests, type));
  };

  return (
    <div className="guest-list-container">
      <div className="card">
        <h1>Liste des invités</h1>
        <p className="guest-count">
          {guests.length} {guests.length <= 1 ? "invité" : "invités"}
        </p>
        <p className="subtitle">Pour le samedi 29 mars</p>
        <div className="sort-controls">
          <button
            onClick={() => handleSort("lastName")}
            className={sortBy === "lastName" ? "active" : ""}
          >
            Trier par nom
          </button>
          <button
            onClick={() => handleSort("registeredAt")}
            className={sortBy === "registeredAt" ? "active" : ""}
          >
            Trier par date
          </button>
        </div>
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
