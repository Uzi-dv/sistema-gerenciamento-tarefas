const LoginForm = ({ onSwitch }) => {
    return (
      <form className=" form form-login">
        <h2 className="form-title">Entrar com</h2>
        <div className="form-social">
          <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <p className="form-text">ou utilize sua conta</p>
        <div className="form-input-container">
          <input type="email" className="form-input" placeholder="Email" />
          <input type="password" className="form-input" placeholder="Senha" />
        </div>
        <a href="#" className="form-link">Esqueceu a senha?</a>
        <button type="button" className="form-button">Logar</button>
        <p className="mobile-text">
          Não tem conta? <a href="#" onClick={onSwitch}>Registre-se</a>
        </p>
      </form>
    );
  };
  
  export default LoginForm;  