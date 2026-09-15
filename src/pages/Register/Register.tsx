// src/pages/Register/Register.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/button/Button';
import styles from './Register.module.scss';

export default function Register() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(evt.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await register(email, password, name);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message ?? 'Ошибка регистрации');
    }
  };

  return (
    <section className={styles.register}>
      <h1 className={`${styles.register__title} main-title`}>Регистрация</h1>

      <form className={styles.register__form} onSubmit={onSubmit}>
        <label>
          Имя
          <input type="text" name="name" required />
        </label>

        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Пароль
          <input type="password" name="password" required minLength={5} />
        </label>

        {error && <p className={styles.register__error}>{error}</p>}

        <Button type="submit" isLoading={isSubmitting}>
          Зарегистрироваться
        </Button>
      </form>

      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
}
