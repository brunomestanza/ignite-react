import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    } 
    if (session.activeSubscription) {
      router.push('/posts'); // Método usado para redirecionar o usuário dentro de alguma função
      return;
    }
    // Criação de uma checkout session dentro do stripe, nós utilizamos as API routes nesse caso pra que a API key não fique no FrontEnd
    try {
      const response = await api.post('/subscribe')
      const { sessionId }  = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({sessionId});
    } catch (err) {
      alert (err.message);
    }
  }

  return(
    <button
      className={styles.subscribeButton}
      onClick={handleSubscribe} 
      type="button"
    >
      Subscribe now
    </button>
  )
}
