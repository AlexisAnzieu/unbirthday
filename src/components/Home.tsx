import React, { useState, useEffect } from "react";
import { addGuest } from "../db";
import "../App.css";

function Home() {
  const [timeLeft, setTimeLeft] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const eventDate = new Date("2025-03-29T19:00:00");
      const diff = eventDate.getTime() - now.getTime();

      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setTimeLeft(`${days} jours restants`);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="card">
          <p className="subtitle">Très chers invités,</p>
          <div className="border-decoration" />
          <h1>Joyeux </h1>
          <h1> Non-Anniversaire</h1> <h1> à tous !</h1>
          <div className="event-details">
            <div className="event-section">
              <p className="event-highlight">🎭 L'Invitation</p>
              <p>
                Nous vous invitons à vivre une soirée hors du temps, plongeant
                dans l'univers fantastique d'Alice au Pays des Merveilles.
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
              <br />
              <p>
                Nous avons hâte de vous retrouver pour cette aventure
                inoubliable ! 💫
              </p>
              <br />
              <p className="event-highlight">✨ Carla & Hortense ✨</p>
            </div>
          </div>
          <div className="time-display">{timeLeft}</div>
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
              {showSuccess && (
                <div className="success-message">
                  Merci {formData.firstName} {formData.lastName} ! Nous avons
                  hâte de vous voir au pays des merveilles ! 🫖
                </div>
              )}
              <button
                className="whimsical-button"
                onClick={() => {
                  try {
                    addGuest(formData.firstName, formData.lastName);
                    setShowSuccess(true);
                    setTimeout(() => {
                      setIsModalOpen(false);
                      setFormData({ firstName: "", lastName: "" });
                      setShowSuccess(false);
                    }, 3000);
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
