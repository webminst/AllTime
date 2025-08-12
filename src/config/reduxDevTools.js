// Configuração para o Redux DevTools em diferentes ambientes
const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || ((...args) => {
  if (args.length === 0) return undefined;
  if (typeof args[0] === 'object') return args[0];
  return {}
});

export default composeEnhancers;
