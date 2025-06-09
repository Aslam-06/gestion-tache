import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

function Connexion() {
  const [message, setMessage] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { loginuser, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const onsubmit = (data) => {
    setHasSubmitted(true);

    const success = loginuser(data.email, data.password);

    if (success) {
      setMessage("Connexion réussie");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 1000);
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
          <h2 className="mb-4 text-primary fw-bold">Connectez Vous</h2>

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
            </Form.Group>

            <div className="d-grid mb-3">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="fw-bold"
                style={{ borderRadius: "10px" }}
              >
                Se Connecter
              </Button>
            </div>

            <div className="text-center mt-3">
              <span className="text-muted">
                *Vous n'avez pas encore de compte ?{" "}
                <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                  Inscrivez-vous
                </Link>
              </span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Connexion;