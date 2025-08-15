import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheck, FaShoppingCart, FaTruck, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const location = useLocation();
  
  // Determinar a etapa atual com base no caminho da URL
  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.includes('envio')) return 2;
    if (path.includes('pagamento')) return 3;
    if (path.includes('pedido')) return 4;
    return 1; // Carrinho
  };
  
  const currentStep = getCurrentStep();
  
  const steps = [
    {
      id: 1,
      name: 'Carrinho',
      path: '/carrinho',
      icon: <FaShoppingCart className="h-5 w-5" />,
      enabled: step1
    },
    {
      id: 2,
      name: 'Envio',
      path: '/envio',
      icon: <FaTruck className="h-5 w-5" />,
      enabled: step2
    },
    {
      id: 3,
      name: 'Pagamento',
      path: '/pagamento',
      icon: <FaCreditCard className="h-5 w-5" />,
      enabled: step3
    },
    {
      id: 4,
      name: 'Finalizar',
      path: '/pedido',
      icon: <FaCheckCircle className="h-5 w-5" />,
      enabled: step4
    }
  ];
  
  return (
    <nav className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isDisabled = !step.enabled;
          
          return (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <li className="flex-1">
                  <div className={`h-0.5 w-full ${isCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                </li>
              )}
              
              <li className="relative flex flex-col items-center">
                <Link
                  to={isDisabled ? '#' : step.path}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive
                      ? 'bg-indigo-100 border-2 border-indigo-600 text-indigo-600'
                      : isCompleted
                      ? 'bg-indigo-600 text-white'
                      : isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-gray-300 text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {isCompleted ? (
                    <FaCheck className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.icon}</span>
                  )}
                </Link>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isActive || isCompleted
                      ? 'text-indigo-600'
                      : isDisabled
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
