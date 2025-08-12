const notFound = (req, res, next) => {
  const error = new Error(`Não encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Definir o código de status, se não estiver definido
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Definir o status
  res.status(statusCode);

  // Retornar o erro como JSON
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = { notFound, errorHandler };
