import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background-off-white">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-mint/40 blob-shape blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-peach/30 blob-shape-2 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary-yellow px-4 py-2 rounded-full mb-6 shadow-sm rotate-1">
            <span className="material-symbols-outlined text-orange-500 text-lg">login</span>
            <span className="text-sm font-black text-orange-800">С возвращением!</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Вход</h1>
          <p className="text-text-secondary">Войдите для управления бронированиями</p>
        </div>
        
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-secondary-mint/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register('password', { required: 'Пароль обязателен' })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm text-gray-600">Запомнить</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-bold text-primary hover:underline">
                Забыли пароль?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-full bg-primary text-white font-black text-lg hover:bg-primary-hover transition-transform hover:scale-105 shadow-[0_6px_0_0_#2E7D32] disabled:opacity-50"
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">или войдите через</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-red-500">g_mobiledata</span>
                <span className="font-bold text-gray-700">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-blue-600">share</span>
                <span className="font-bold text-gray-700">VK</span>
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-text-secondary">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
