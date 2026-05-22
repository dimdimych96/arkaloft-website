import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  agreedToPolicy: boolean;
}

export const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: data.name,
        photoURL: userCredential.user.photoURL || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background-off-white">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-mint/40 blob-shape blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-peach/30 blob-shape-2 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary-yellow px-4 py-2 rounded-full mb-6 shadow-sm rotate-1">
            <span className="material-symbols-outlined text-orange-500 text-lg">person_add</span>
            <span className="text-sm font-black text-orange-800">Создайте аккаунт</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Регистрация</h1>
          <p className="text-text-secondary">Для быстрого бронирования праздников</p>
        </div>
        
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-secondary-peach/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Имя
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Имя обязательно' })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                placeholder="Ваше имя"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email обязателен',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Неверный email' }
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Пароль обязателен',
                  minLength: { value: 6, message: 'Минимум 6 символов' }
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                {...register('agreedToPolicy', { required: 'Необходимо согласие с политикой' })}
                className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Я согласен с{' '}
                <Link to="/privacy" className="text-primary font-bold hover:underline">
                  политикой конфиденциальности
                </Link>{' '}
                и{' '}
                <Link to="/terms" className="text-primary font-bold hover:underline">
                  пользовательским соглашением
                </Link>
              </label>
            </div>
            {errors.agreedToPolicy && (
              <p className="text-sm text-red-600">{errors.agreedToPolicy.message}</p>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-full bg-primary text-white font-black text-lg hover:bg-primary-hover transition-transform hover:scale-105 shadow-[0_6px_0_0_#2E7D32] disabled:opacity-50"
            >
              {isSubmitting ? 'Создание...' : 'Создать аккаунт'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-text-secondary">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
