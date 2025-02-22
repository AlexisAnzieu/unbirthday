import React, { useState, useEffect } from "react";
import { addGuest } from "../db";
import "../App.css";

function Home() {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [teaQuote, setTeaQuote] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });

  const quotes = [
    "Un très joyeux non-anniversaire à vous !",
    "C'est toujours l'heure du thé !",
    "Nous sommes tous fous ici !",
    "Pourquoi un corbeau ressemble-t-il à un bureau ?",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    const quoteTimer = setInterval(() => {
      setTeaQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="card">
          <p className="subtitle">Carla et Hortense te souhaitent</p>
          <div className="border-decoration" />
          <h1>Un Très Joyeux Non-Anniversaire !</h1>
          <p className="subtitle">Le samedi 29 mars</p>
          <div className="event-details">
            <div className="event-section">
              <p className="event-highlight">🎭 L'Invitation</p>
              <p>
                Très chers invités, Joyeux Non-Anniversaire à tous ! Nous vous
                invitons à vivre une soirée hors du temps, plongeant dans
                l'univers fantastique d'Alice au Pays des Merveilles.
              </p>
            </div>

            <div className="event-section">
              <p className="event-highlight">📅 Quand ?</p>
              <p>Samedi 29 mars - L'heure du thé débutera à 19h !</p>
            </div>

            <div className="event-section">
              <p className="event-highlight">🎪 Au programme</p>
              <p>
                Des jeux d'équipe aussi surprenants que les aventures d'Alice,
                où l'esprit de compétition rivalisera avec la vitesse du Lapin
                Blanc <span className="event-emoji">🐇</span>
              </p>
              <p>
                La meilleure équipe repartira avec un prix aussi extravagant que
                le Chapelier Fou lui-même !
                <span className="event-emoji">🎁</span>
              </p>
            </div>

            <div className="event-section">
              <p className="event-highlight">✨ Les Activités</p>
              <p>Nous vous avons concocté :</p>
              <p>• Des activités délirantes</p>
              <p>• Des énigmes aussi mystérieuses que le Chat du Cheshire</p>
              <p>
                • Des moments de pur enchantement dans un pays où l'impossible
                n'existe pas...
              </p>
            </div>

            <div className="event-section">
              <p className="event-highlight">🎩 Dress Code</p>
              <p>
                Enfilez vos bottes de voyageur audacieux, ajustez votre chapeau
                le plus extravagant et laissez-vous emporter dans ce monde
                merveilleux où les règles du réel sont suspendues !
              </p>
            </div>

            <div className="event-section">
              <p>
                Merci de confirmer votre présence avant que la Reine de Cœur ne
                s'énerve et n'ordonne de couper des têtes. Nous avons besoin de
                savoir combien de tasses de thé préparer !{" "}
                <span className="event-emoji">🫖</span>
              </p>
              <p className="event-highlight">✨ Carla & Hortense ✨</p>
            </div>
          </div>
          <div className="time-display">{timeLeft}</div>
          <p className="quote">{quotes[teaQuote]}</p>
          <button
            className="whimsical-button"
            onClick={() => setIsModalOpen(true)}
          >
            Confirmer ma venue
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmer votre présence</h2>
            <div className="modal-content">
              <input
                type="text"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="modal-input"
              />
              <input
                type="text"
                placeholder="Nom"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="modal-input"
              />
              <button
                className="whimsical-button"
                onClick={() => {
                  try {
                    addGuest(formData.firstName, formData.lastName);
                    alert(
                      `Merci ${formData.firstName} ${formData.lastName} ! Nous avons hâte de vous voir à la fête du thé ! 🫖`
                    );
                    setIsModalOpen(false);
                    setFormData({ firstName: "", lastName: "" });
                  } catch (err) {
                    console.error("Error adding guest:", err);
                    alert("Une erreur est survenue lors de l'enregistrement.");
                  }
                }}
              >
                Confirmer
              </button>
              <button
                className="whimsical-button cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
