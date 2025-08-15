// Mensagens de erro comuns
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua conexão com a internet.',
  UNAUTHORIZED: 'Você não está autorizado a acessar este recurso.',
  FORBIDDEN: 'Acesso negado. Você não tem permissão para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro no servidor. Por favor, tente novamente mais tarde.',
  VALIDATION_ERROR: 'Por favor, verifique os dados informados.',
  TIMEOUT_ERROR: 'Tempo de requisição esgotado. Tente novamente.',
  UNKNOWN_ERROR: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
};

// Códigos de status HTTP comuns
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Função para obter mensagem de erro com base no código de status
export const getErrorMessage = (error) => {
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const { status } = error.response;

  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_MESSAGES.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return ERROR_MESSAGES.SERVER_ERROR;
    case HTTP_STATUS.BAD_REQUEST:
      return error.response.data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
    default:
      return error.response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

export default {
  ...ERROR_MESSAGES,
  ...HTTP_STATUS,
  getErrorMessage,
};
