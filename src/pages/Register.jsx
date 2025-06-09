import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

function Inscription() {
  const [message, setMessage] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { registeruser, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const onsubmit = (data) => {
    setHasSubmitted(true);

    const success = registeruser(data);

    if (success) {
      setMessage("Inscription validée ! Redirection en cours...");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } else {
      setMessage(null);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Card className="w-100 shadow-sm" style={{ maxWidth: "500px", borderRadius: "16px" }}>
        <Card.Body className="p-4">
          <h2 className="mb-4 text-success fw-bold">Créer un compte</h2>

          <Form onSubmit={handleSubmit(onsubmit)}>
            {message && (
              <Alert variant="success" className="mb-4">
                {message}
              </Alert>
            )}

            {hasSubmitted && error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Identifiant</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom d'utilisateur"
                {...register("identifiant", {
                  required: "Ce champ est requis",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Uniquement lettres et chiffres",
                  },
                })}
                isInvalid={!!errors.identifiant}
              />
              <Form.Control.Feedback type="invalid">
                {errors.identifiant?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="exemple@domaine.com"
                {...register("email", {
                  required: "Ce champ est requis",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email invalide",
                  },
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Ce champ est requis",
                  minLength: { value: 5, message: "Au moins 5 caractères" },
                  maxLength: { value: 10, message: "Au plus 10 caractères" },
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Entre 5 et 10 caractères
              </Form.Text>
            </Form.Group>

            <div className="d-grid mb-3">
              <Button
                variant="success"
                type="submit"
                size="lg"
                className="fw-bold"
                style={{ borderRadius: "10px" }}
              >
                S'inscrire
              </Button>
            </div>

            <div className="text-center mt-3">
              <span className="text-muted">
                Déjà inscrit ?{" "}
                <Link to="/login" className="text-success fw-semibold text-decoration-none">
                  Connectez-vous
                </Link>
              </span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Inscription;