import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    DG: {
      Widgets: {
        Reviews: new (options: {
          container: HTMLElement;
          firmId: string;
          width: string;
          height: string;
          onlyMine: boolean;
        }) => {
          destroy: () => void;
        };
      };
    };
  }
}

interface DgisReviewsProps {
  firmId?: string;
  width?: string;
  height?: string;
  className?: string;
}

export function DgisReviews({
  firmId,
  width = '100%',
  height = '600px',
  className = '',
}: DgisReviewsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<{
    destroy: () => void;
  } | null>(null);

  // Функция для инициализации виджета
  const initWidget = useCallback((): boolean => {
    if (!window.DG || !containerRef.current) {
      console.log('DG not loaded or container not ready');
      return false;
    }

    try {
      // Очищаем предыдущий виджет, если есть
      if (widgetRef.current) {
        widgetRef.current.destroy();
        widgetRef.current = null;
      }

      // Создаем контейнер для виджета
      const container = containerRef.current;
      container.innerHTML = ''; // Очищаем контейнер

      // Добавляем проверку на существование DG.Widgets.Reviews
      if (!window.DG.Widgets || typeof window.DG.Widgets.Reviews !== 'function') {
        console.error('2GIS Reviews widget is not available');
        return false;
      }

      widgetRef.current = new window.DG.Widgets.Reviews({
        container,
        firmId: firmId || '',
        width: '100%',
        height: '100%',
        onlyMine: false,
      });

      console.log('2GIS widget initialized');
      return true;
    } catch (error) {
      console.error('Error initializing 2GIS widget:', error);
      return false;
    }
  }, [firmId]);

  // Функция для загрузки скрипта
  const loadScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      // Если скрипт уже загружен
      if (window.DG?.Widgets?.Reviews) {
        resolve(true);
        return;
      }

      // Если скрипт уже загружается
      if (document.getElementById('dg-widget-script')) {
        const checkInterval = setInterval(() => {
          if (window.DG?.Widgets?.Reviews) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
        return;
      }

      // Загружаем скрипт
      const script = document.createElement('script');
      script.id = 'dg-widget-script';
      script.src = 'https://widgets.2gis.com/js/DGWidgetLoader.js';
      script.async = true;
      
      script.onload = () => {
        // Даем время на инициализацию DG
        const maxAttempts = 50; // 5 секунд максимум (50 * 100мс)
        let attempts = 0;
        
        const checkDG = () => {
          attempts++;
          if (window.DG?.Widgets?.Reviews) {
            console.log('2GIS script loaded successfully');
            resolve(true);
          } else if (attempts < maxAttempts) {
            setTimeout(checkDG, 100);
          } else {
            console.error('Failed to load 2GIS script: Timeout');
            resolve(false);
          }
        };
        
        checkDG();
      };
      
      script.onerror = () => {
        console.error('Failed to load 2GIS script');
        resolve(false);
      };
      
      document.body.appendChild(script);
    });
  }, []);

  useEffect(() => {
    if (!firmId || firmId === '') {
      console.warn('2GIS firmId is not provided');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const initializeWidget = async () => {
      try {
        // Пытаемся загрузить скрипт, если он еще не загружен
        const scriptLoaded = await loadScript();
        
        if (!isMounted) return;
        
        if (!scriptLoaded) {
          throw new Error('Failed to load 2GIS script');
        }

        // Инициализируем виджет
        const success = initWidget();
        
        if (isMounted) {
          setIsLoading(false);
          setHasError(!success);
        }
      } catch (error) {
        console.error('Error in widget initialization:', error);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    // Устанавливаем таймаут для инициализации
    timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        console.log('Widget initialization timeout');
        setHasError(true);
        setIsLoading(false);
      }
    }, 15000); // 15 секунд таймаут

    initializeWidget();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      
      // Очищаем виджет при размонтировании
      if (widgetRef.current) {
        try {
          widgetRef.current.destroy();
        } catch (e) {
          console.error('Error destroying widget:', e);
        }
        widgetRef.current = null;
      }
    };
  }, [firmId, initWidget, loadScript]);

  if (hasError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg text-center border-2 border-dashed border-gray-300 ${className}`}
        style={{ width, height }}
      >
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Отзывы временно недоступны</h3>
        <p className="text-gray-600 mb-4 max-w-md">
          {!firmId || firmId === '' 
            ? 'ID организации не настроен. Обратитесь к администратору.'
            : 'Не удалось загрузить виджет отзывов. Проверьте соединение с интернетом.'}
        </p>
        {firmId && firmId !== '' && (
          <a
            href={`https://2gis.ru/firm/${firmId}/tab/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Открыть на 2GIS
          </a>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-gray-700 font-medium mb-1">Загрузка отзывов 2GIS</p>
          <p className="text-gray-500 text-sm">Это может занять несколько секунд...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      style={{ width, height }}
    />
  );
}