export const AmenitiesSection = () => {
  const amenities = [
    { icon: 'local_cafe', text: 'Чай & Кофе', color: 'bg-orange-50 text-orange-600' },
    { icon: 'kitchen', text: 'Кухня', color: 'bg-blue-50 text-blue-600' },
    { icon: 'restaurant', text: 'Посуда', color: 'bg-pink-50 text-pink-600' },
    { icon: 'cleaning_services', text: 'Уборка', color: 'bg-green-50 text-green-600' }
  ];

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-white border-t-2 border-dashed border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="bg-green-50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-800 font-heading mb-3 sm:mb-4">Всё для вашего комфорта</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 font-medium text-sm sm:text-base">Мы продумали каждую мелочь. Заходите и празднуйте, о быте мы позаботимся!</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {amenities.map((item, idx) => (
                <div key={idx} className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 border border-gray-50 hover:shadow-md transition-shadow">
                  <div className={`size-8 sm:size-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`} aria-hidden="true">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-black text-gray-700 text-center sm:text-left">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 w-full relative">
            <div className="absolute -inset-3 sm:inset-4 bg-secondary-yellow/50 rounded-full blur-xl"></div>
            <img
              alt="Amenities"
              className="relative rounded-xl sm:rounded-2xl rotate-2 border-4 border-white shadow-lg w-full object-cover h-48 sm:h-64"
              src="/images/halls/0/3.jpeg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
