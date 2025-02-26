const RegisterForm = ({ onSwitch }) => {
    return (
      <form className="form form-register">
        <h2 className="form-title">Criar Conta</h2>
        <div className="form-social">
          <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <p className="form-text">ou cadastre seu email</p>
        <div className="form-input-container">
          <input type="text" className="form-input" placeholder="Nome" />
          <input type="email" className="form-input" placeholder="Email" />
          <input type="password" className="form-input" placeholder="Senha" />
        </div>
        <button type="button" className="form-button">Cadastrar</button>
        <p className="mobile-text">
          Já tem conta? <a href="#" onClick={onSwitch}>Login</a>
        </p>
      </form>
    );
  };
  
  export default RegisterForm;