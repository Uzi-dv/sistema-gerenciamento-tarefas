const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const { login, recuperarSenha, cadastrar } = useMock
  ? require("./authService.mock")
  : require("./authService");
