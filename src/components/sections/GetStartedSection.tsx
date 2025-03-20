import { memo } from 'react';
import { Button } from '../ui/Button';

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: 'Crie sua conta',
    description: 'Comece criando sua conta gratuita em apenas alguns segundos.',
    icon: '📝',
  },
  {
    title: 'Personalize seu perfil',
    description: 'Adicione suas informações e preferências para uma experiência personalizada.',
    icon: '👤',
  },
  {
    title: 'Explore recursos',
    description: 'Descubra todas as ferramentas e recursos disponíveis para você.',
    icon: '🚀',
  },
  {
    title: 'Comece a usar',
    description: 'Aproveite todos os benefícios e comece a usar a plataforma.',
    icon: '✨',
  },
];

export const GetStartedSection = memo(() => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Comece Sua Jornada
            </h1>
            <p className="text-xl text-gray-600">
              Siga estes passos simples para começar a usar nossa plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="secondary"
              className="px-12"
              aria-label="Criar conta gratuita"
            >
              Criar Conta Gratuita
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Não requer cartão de crédito • Configuração em 2 minutos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

GetStartedSection.displayName = 'GetStartedSection'; 