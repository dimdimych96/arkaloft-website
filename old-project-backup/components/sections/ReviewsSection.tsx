import { ImportedReviews } from '../reviews/ImportedReviews';

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg">
              ⭐ Отзывы клиентов
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Отзывы родителей
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Мы гордимся доверием семей Новосибирска и стремимся сделать каждый праздник незабываемым
          </p>
        </div>

        <ImportedReviews
          firmId={import.meta.env.VITE_DGIS_FIRM_ID || '70000001026613315'}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}