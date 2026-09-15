// src/pages/Login/Login.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/button/Button';
import styles from './Login.module.scss';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(evt.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message ?? 'Ошибка входа');
    }
  };

  return (
    <section className={styles.login}>
      <h1 className={`${styles.login__title} main-title`}>Вход</h1>

      <form className={styles.login__form} onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Пароль
          <input type="password" name="password" required minLength={5} />
        </label>

        {error && <p className={styles.login__error}>{error}</p>}

        <Button type="submit" isLoading={isSubmitting}>
          Войти
        </Button>
      </form>

      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </section>
  );
}
