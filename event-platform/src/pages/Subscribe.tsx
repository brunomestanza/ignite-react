import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const navigate = useNavigate();

  // useMutation retorna uma função para executar a mutation, e aonde são salvos os dados de retorno dela e algumas outras infos, como o loading
  // que nos da uma visibilidade sobre o status da requisição
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    if (name &&  email) {
      createSubscriber({
        variables: {
          name,
          email
        }
      }).then(() => navigate('/event'));
    }
  };

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong></h1>
          <p className="mt-4 text-gray-200 leading-relaxed">Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.</p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <Input onChange={event => setName(event.target.value)} type="text" title="Seu nome completo" />
            <Input onChange={event => setEmail(event.target.value)} type="email" title="Digite seu email" />
            <button
              disabled={loading}
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img className="mt-10" src="/src/assets/code-mockup.png" alt="Code mockup" />
    </div>
  );
};
