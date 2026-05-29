import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const reviews = [
  {
    id: 1,
    author: 'Алёна Малахова',
    reviews: '18 отзывов',
    date: 'сегодня',
    rating: 5,
    text: 'Нам все очень понравилось, спасибо за помощь в организации праздника. Само пространство уютное и интересное для ребят, необычный деревянный городок, большие окна, есть всё и даже больше. Благодарю Геннадия за сопровождение на всем протяжение общения.',
    verified: false,
  },
  {
    id: 2,
    author: 'Виктория А',
    reviews: '49 отзывов',
    date: '17 января 2026',
    rating: 5,
    text: 'Сказать, что мы довольны - ничего не сказать! Волшебный, чудесный праздник нам организовали Геннадий, аниматор Анна (лучшая!!!). Сам лофт имеет прекрасное расположение, не нужно никуда вилять по дворам в поиске парковки, внутри все чисто, великолепное зонирование. Программа отпад, была пижамная вечеринка и серебряная дискотека. Остались довольны и именинники, и их гости 🔥🔥🔥',
    verified: false,
  },
  {
    id: 3,
    author: 'Кристина А.',
    reviews: '30 отзывов',
    date: '1 января 2026',
    rating: 5,
    text: 'Хочу написать про аниматора,который вел утренник 23.12 в роли деда мороза и ковбоя.это было очень круто!впервые видела что бы кто-то настолько круто вел дискотеку и взаимодействовал с детьми!!!браво,настоящий артист!приходите сюда,здесь замечательно.спасибо!',
    verified: false,
  },
  {
    id: 4,
    author: 'Ольга',
    reviews: '1 отзыв',
    date: '10 ноября 2025',
    rating: 5,
    text: 'Здравствуйте! Отмечали день рождение доченьки в АркаЛофт! Остались очень довольны 👍 Уютно, комфортно по домашнему. У нас была аниматор Анна в образе Уэнсдей, программа была супер 👍 дети были в восторге 👏 Анна выражаем вам благодарность за ваш профессионализм, было весело всем даже взрослым, вы большая молодец! Большая благодарность организаторам АркаЛофт!🥰 Рекомендую как для детского, так и для взрослого (там есть шикарный зал для взрослых банкетов) праздника! 👍',
    verified: false,
    response: {
      date: '19 ноября 2025',
      text: 'Здравствуйте, Ольга, спасибо большое за отзыв и оценку!!! Будем ждать вас снова 🌸',
    },
  },
  {
    id: 5,
    author: 'Анастасия Мелихова',
    reviews: '6 отзывов',
    date: '6 ноября 2025',
    rating: 5,
    text: 'Просторный, стильный, атмосферный лофт. Были сначала в качестве гостей, а потом и сами здесь отметили сыну шестилетие. Удобно, что мероприятие под ключ. Обсудили пожелания на этапе бронирования и дальше команда Арки все подготовила. Нам осталось только прийти и насладиться праздником без всех этих организационных мук. Очень понравился сам зал и особенно решение о зонировании. Пока детей развлекают в игровой, родители могут спокойно отдохнуть в обеденной зоне.',
    verified: false,
    response: {
      date: '19 ноября 2025',
      text: 'Здравствуйте, Анастасия, большое спасибо за такой приятный отзыв, будем стараться и дальше 💛',
    },
  },
  {
    id: 6,
    author: 'Olga Pyltseva',
    reviews: '11 отзывов',
    date: '8 сентября 2025',
    rating: 5,
    text: 'Отмечали День знаний с классом в зале 7+🔥🔥🔥 Интеллектуально-развлекательный квиз с двумя ведущими. Задача была освежить знания об одноклассниках, вдоволь наобщаться, петь, танцевать и выпускать накопившуюся за лето энергию перед школьными буднями пятиклассников. С поставленной задачей справились на «ура»! Ребята остались в восторге! Учителю тоже понравилось мероприятие 👍 Спасибо огромнейшее за организацию и проведение этого шумного события 👏',
    verified: true,
    response: {
      date: '19 ноября 2025',
      text: 'Добрый вечер, Olga, огромное спасибо за отзыв 💛 Будем стараться и дальше 🌸',
    },
  },
  {
    id: 7,
    author: 'Наталья Дударева',
    reviews: '1 отзыв',
    date: '16 февраля 2025',
    rating: 5,
    text: 'Отмечали сегодня 10-летие сына в зале 7+. Выбрали из развлечений квест Форт Боярд. В восторге и дети и взрослые, всё прошло на высшем уровне👍 Лофт чистый, уютный, всё продумано до мелочей. Кухня с микроволновкой и всей необходимой посудой, чайник, холодильник, раковина. Отдельная от основного зала комната отдыха с мягким диваном и огромным Тв и игровой приставкой. Чистейший санузел. Основной огромный зал для мероприятий со сценой, проектором, караоке, дискотекой и другими плюшками😄😄😄Всё супер, очень довольны, сами теперь только сюда и всем рекомендуем👍',
    verified: false,
    response: {
      date: '5 апреля 2025',
      text: 'Здравствуйте, Наталья! Большое спасибо за столь замечательный отзыв о вашем празднике в нашем зале…',
    },
  },
  {
    id: 8,
    author: 'Юлия Юлия',
    reviews: '3 отзыва',
    date: '4 февраля 2025',
    rating: 5,
    text: 'Прекрасный лофт, организация, атмосфера! Тут прекрасно все! Отмечали день рождения дочки 03.02.Все остались в восторге!Огромная благодарность Геннадию за помощь и координацию!) .Везде все чисто, аккуратно, стильно. Всё имеется в наличии для комфортного проведения праздника.Ведущий Юрий 🔥 это отдельная тема, зажег !!Однозначно рекомендую, обязательно вернемся!!',
    verified: false,
    response: {
      date: '5 апреля 2025',
      text: 'Здравствуйте, Юлия! Спасибо за такие теплые слова о нашем лофте и организации мероприятия…',
    },
  },
  {
    id: 9,
    author: 'Ксения Большакова',
    reviews: '12 отзывов',
    date: '26 августа 2024',
    rating: 5,
    text: 'Отличное место! Праздновали день рождения дочери в зале 7+. Большое пространство, можно заказать оформление шарами, что и сделали. Учли все пожелания. Заказали шоу "нащупай". Это очень здорово! Было интересно как детям, так и взрослым. Наличие приставки, настольных игр, караоке. Это всё активно нами использовалось. К нашему приходу был сервирован стол. Администратор всегда была рядом, помогала, если что-то не могли сделать сами.',
    verified: false,
    response: {
      date: '9 октября 2024',
      text: 'Ксения, добрый день! Спасибо вам за отзыв и оценку 🤗 Будем рады видеть вас в числе наших постоянных…',
    },
  },
  {
    id: 10,
    author: 'Анастасия Т.',
    reviews: '48 отзывов',
    date: '20 июня 2024',
    rating: 5,
    text: 'Были во многих лофтах, согласно нашей проф деятельности, но день рождения ребёнка без раздумий в Арке, во-первых уютно, чисто, все продумано, много места для детей и взрослых. Во вторых, очень удобные решения по пакетным предложениям, когда можешь просто отдыхать и доверить свой праздник профи 😎 Спасибо за ваш труд! Процветания! ☺️',
    verified: false,
    response: {
      date: '10 июля 2024',
      text: 'Анастасия, благодарим за доверие и высокую оценку!!! Будем стараться и дальше 💛',
    },
  },
  {
    id: 11,
    author: 'Тимофей Столяров',
    reviews: '57 отзывов',
    date: '11 июня 2024',
    rating: 5,
    text: 'Праздновал здесь день рождения. Всё прошло отлично, лофт понравился : ) Было достаточное количество разной посуды, приборов, тапочек. Звук и в целом техника работали нормально. Проводилась ролевая игра квест, поэтому корректная работа техники была важна для нас. Администратор оперативно отвечала на вопросы и помогала. Лофт довольно просторный и с приятным дизайном : )',
    verified: false,
    response: {
      date: '11 июня 2024',
      text: 'Здравствуйте! Спасибо за отзыв 💛 У нас в каждом зале есть возможность открыть окна, а также включить кондиционер…',
    },
  },
  {
    id: 12,
    author: 'Анастасия Емельянова',
    reviews: '18 отзывов',
    date: '28 мая 2024',
    rating: 5,
    text: 'Хочу выразить огромную благодарность за организацию детского выпускного!! Отлично и уютно обустроено пространство, очень милые сотрудники, большой выбор аниматоров.Спасибо администратору за гостеприимство и грамотный подход к клиенту. 🌸 Отдельное спасибо аниматорам!! Как квест Форт Боярд понравился, так и программа "молодёжная вечеринка", ребята умнички, профессионально справились с нашим зоопарком 🤣 🔥🔥🔥🔥я сама с удовольствием наблюдала за процессом!',
    verified: false,
    response: {
      date: '29 мая 2024',
      text: 'Анастасия, добрый день! Спасибо большое за отзыв и за вашу высокую оценку 🤩🤩🤩 Мы рады, что праздник…',
    },
  },
  {
    id: 13,
    author: 'Юлия Михайлова',
    reviews: '47 отзывов',
    date: '22 апреля 2024',
    rating: 5,
    text: 'Лучший день рождения сына отмечали здесь! Места много. Расположение идеальное. Парковка удобная. Предложили на выбор много аниматоров! Спасибо огромное!',
    verified: false,
    response: {
      date: '22 апреля 2024',
      text: 'Здравствуйте, Юлия! Благодарим за добрые слова!!! Будем вас ждать снова 💛',
    },
  },
  {
    id: 14,
    author: 'Наталья Анисимова',
    reviews: '22 отзыва',
    date: '13 апреля 2024',
    rating: 5,
    text: 'Праздновали детский день рождения. Хороший лофт, приветливый персонал. Все на уровне. Спасибо Вам.',
    verified: true,
    response: {
      date: '15 апреля 2024',
      text: 'Здравствуйте, Наталья! Большое спасибо за такой приятный отзыв 🤗 Приходите к нам почаще ❤',
    },
  },
  {
    id: 15,
    author: 'Маргарита Георгиевна',
    reviews: '10 отзывов',
    date: '19 марта 2024',
    rating: 5,
    text: 'Замечательно, уютно, все организованно для удобства!',
    verified: false,
    response: {
      date: '26 марта 2024',
      text: 'Добрый вечер, Маргарита. Благодарим вас, что оценили 🙏 Мы работаем для вас!',
    },
  },
  {
    id: 16,
    author: 'Яна Процкая',
    reviews: '6 отзывов',
    date: '11 марта 2024',
    rating: 5,
    text: 'Спасибо огромное за такую организацию Гендер пати , мы Вам безумно благодарны, для нас в жизни -это очень важное событие, которое прошло невероятно божественно!!! Спасибо всем, команде за такую работу , мы на 7 ом небе от счастья!!!🤩🤩🤩🥳🥳🥳🥳😇😇😇😇👍🏻👍🏻👍🏻👍🏻👍🏻👍🏻❤️❤️❤️❤️❤️🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻💃🏻💃🏻💃🏻Это что-то неописуемое!!!🥳🥳🥳🥳🥳',
    verified: false,
    response: {
      date: '13 марта 2024',
      text: 'Яна. Огромное спасибо за отзыв!!! Были рады помочь 😉',
    },
  },
  {
    id: 17,
    author: 'Мария Овчарова',
    reviews: '35 отзывов',
    date: '11 февраля 2024',
    rating: 5,
    text: 'Празднуем в Арке второй ДР, один раз 4 года назад в детском лофте, и сейчас уже для подростков. Все супер, на кухне вся посуда, чай, кофе. В игровой сцена, караоке, и еще в отдельной комнате приставка. В общем для полуподростков самое то).',
    verified: false,
    response: {
      date: '12 февраля 2024',
      text: 'Спасибо, Мария, за приятный отзыв ❤ Ждем вас в гости снова и снова 🙏🏼',
    },
  },
  {
    id: 18,
    author: 'Ирина Галчанская',
    reviews: '5 отзывов',
    date: '21 января 2024',
    rating: 5,
    text: 'Уютно и стильно! Места хватает и детям и родителям)',
    verified: false,
    response: {
      date: '5 февраля 2024',
      text: 'Ирина, огромное спасибо за доверие 🔥',
    },
  },
  {
    id: 19,
    author: 'Софья К',
    reviews: '20 отзывов',
    date: '9 января 2024',
    rating: 5,
    text: 'Классный лофт! праздновали тут 2 года назад День Рождения дочери. Очень все понравилось!!!',
    verified: false,
    response: {
      date: '12 января 2024',
      text: 'Добрый вечер. Благодарим вас за теплые слова, приходите ещё!',
    },
  },
  {
    id: 20,
    author: 'Виктория Керберг',
    reviews: '1 отзыв',
    date: '26 декабря 2023',
    rating: 5,
    text: 'Была с детьми на утреннике 23 декабря, дети в восторге, особенно в востроге от Деда Мороза блогера, такого дедушку мы еще не видели🤘 😎 спасибо Арке Лофт, что подарили детям крутое настроение 😃',
    verified: false,
    response: {
      date: '12 января 2024',
      text: 'Добрый день, Виктория, спасибо вам большое за такой приятный отзыв 😉 Всегда будем рады видеть вас…',
    },
  },
  {
    id: 21,
    author: 'Алена Романова',
    reviews: '4 отзыва',
    date: '26 декабря 2023',
    rating: 5,
    text: 'Очень здоровское место для деток! Что бы провести незабываемо свой праздник! Мы побывали на ёлки с дедом морозом блогером очень здорово ребята аниматоры отыграли с детьми всем успели уделить внимание! Фотограф молодец не кого не забыл на детей и даже родителей ☺️☺️ в общем очень классное место обязательно придем ещё!',
    verified: false,
    response: {
      date: '12 января 2024',
      text: 'Алена, добрый день, благодарим вас 🔥 Рады стараться! Приходите к нам еще на детские мероприятия…',
    },
  },
  {
    id: 22,
    author: 'Анастасия Черкашина',
    reviews: '4 отзыва',
    date: '12 ноября 2023',
    rating: 5,
    text: 'Замечательный лофт 🥰 Светлый, стильный, вмещает 24 человека и не тесно при таком количестве гостей. Классное караоке и комната с приставкой. Доброжелательный администратор, готовая решить все вопросы. Праздник прошел великолепно 😀',
    verified: false,
    response: {
      date: '13 ноября 2023',
      text: 'Здравствуйте, Анастасия! Большое спасибо за отзыв. И, конечно же, ждем вас снова 🙏🏼',
    },
  },
  {
    id: 23,
    author: 'Анонимная Красавица',
    reviews: '78 отзывов',
    date: '31 октября 2023',
    rating: 5,
    text: 'Здравствуйте! Спасибо большое за предоставленные условия для проведения нашего праздника,считаю большую роль в этом сыграл администратор лофта!Первая встреча с улыбкой и так с каждым гостем,далее всё абсолютно рассказала нам где что,предложила зажечь свечи и вынести торт при необходимости . Вообщем в общении с ней я видела качество работы и то что каждый клиент ценный!В лофте есть всёёё,все продуманно,чисто.Просторно.Всё достойно,всё на высоте!',
    verified: true,
    response: {
      date: '13 ноября 2023',
      text: 'Добрый день! Спасибо большое, что выбрали нас 🙏👌 Всегда вам рады!',
    },
  },
  {
    id: 24,
    author: 'Anna Perovskaya',
    reviews: '136 отзывов',
    date: '30 октября 2023',
    rating: 5,
    text: 'Лучшие! Очень комфортные залы, прекрасные администраторы 😍🤍 В зале есть прихожая, где можно поиграть, полноценная кухня, свой туалет',
    verified: false,
    response: {
      date: '13 ноября 2023',
      text: 'Здравствуйте, Анна, огромное спасибо за теплые слова 😉',
    },
  },
  {
    id: 25,
    author: 'Галина П',
    reviews: '68 отзывов',
    date: '7 января 2024',
    rating: 4,
    text: 'Были на дне рождении девочки, не совсем понравилось тем, что место для игр детей на 2 этаже, хоть и есть отгорождение, но оно не очень безопасное. Если идти с детьми 3 лет, то от этого прохода отходить нельзя. А так все хорошо, аниматор, музыка, игрушки',
    verified: false,
    response: {
      date: '12 января 2024',
      text: 'Добрый вечер! Большое за добрые слова о нашей работе 🙏 Мы обязательно учтем ваше замечание и исправим…',
    },
  },
  {
    id: 26,
    author: 'Анна Жидкова',
    reviews: '22 отзыва',
    date: '2 июля 2023',
    rating: 5,
    text: 'Девочки, добрый вечер! Огромное спасибо, за организацию! Мы были в нижнем зале! Все гости и их родители, были в восторге от самого пространства! Понравился интерьер и организация самого пространства! Все продумано! Программа понравилась имениннику и гостям! Всё чётко и ясно! Спасибо за душевное отношение! Было очень приятно 🥳',
    verified: false,
    response: {
      date: '3 июля 2023',
      text: 'Анна, спасибо большое за добрые слова 🤗 Приходите к нам ещё!',
    },
  },
  {
    id: 27,
    author: 'Мария Хугаева',
    reviews: '1 отзыв',
    date: '5 июня 2023',
    rating: 5,
    text: 'Очень просторный лофт, хорошая мебель, игровая зона очень понравилась детям. Стоит отметить что есть кухонная зона, где можно помыть фрукты, сделать нарезки, при необходимости. А ещё есть комната матери и ребёнка, где можно покормить и сменить подгузники малышам.',
    verified: false,
    response: {
      date: '26 июня 2023',
      text: 'Мария, добрый день! Спасибо за обратную связь, будем ждать вас еще)',
    },
  },
  {
    id: 28,
    author: 'Карина Лукашина',
    reviews: '3 отзыва',
    date: '13 июля 2023',
    rating: 5,
    text: 'Отмечаем тут День Рождение уже второго год мальчику ( 5 и 6 лет ) всегда все проходит на Ура ! Во первых есть огромная проковка для всех ваших гостей Доброжелательный коллектив ( ко всем просьбам прислушиваются ) НЕ ЛЕЗУТ к вам со своими правилами ! Всегда готовы помочь и шарики надуть и курьера встретить пока Вы еще не приехали . Все предусмотрено от тапочек до посуды . Хорошо организовано пространство ( отдельный зал для детей ) где чисто и НЕ душно',
    verified: false,
    response: {
      date: '13 июля 2023',
      text: 'Карина, добрый день! Большое спасибо, очень приятно получать обратную связь 🔥 Ждём вас вновь 💛💛💛',
    },
  },
  {
    id: 29,
    author: 'Дмитрий Р.',
    reviews: '4 отзыва',
    date: '18 июля 2023',
    rating: 5,
    text: 'Отмечали пятилетие дочки. Праздник прошёл отлично, дети в невероятном восторге. Анимационная программа огонь, абсолютно все дети с большим интересом были вовлечены в процесс ). На празднике было 10 детей, места вполне хватило. Большой выбор оформления, аниматоров и различные программы проведения праздника.',
    verified: true,
    response: {
      date: '18 июля 2023',
      text: 'Здравствуйте, Дмитрий! Спасибо вам, что оценили ❤ Ждём снова 🙏🏼',
    },
  },
  {
    id: 30,
    author: 'Лида В',
    reviews: '11 отзывов',
    date: '15 августа 2023',
    rating: 5,
    text: 'Очень понравился лофт! Очень чисто, очень все удобное, все есть (посуда, вазы, огромное ведро мусорное и т.д.) Видно, что тщательно продумывали, когда делали лофт. Детская зона фантастическая, игрушки очень добротные. Детей просто за ноги уносили! У нас была фантастический администратор Александра, великолепная девочка, на все 100% выполняет работу, очень располагает, всем готова была помочь.',
    verified: false,
    response: {
      date: '16 августа 2023',
      text: 'Лидия! Спасибо вам большое за отзыв и оценку ❤ Были рады знакомству! Приходите к нам ещё💛',
    },
  },
];

export const Reviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const displayedReviews = reviews.slice(0, visibleReviews);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arkaloft (Арка Лофт)",
    "image": "https://arkaloft.ru/images/hero/main.jpg",
    "telephone": "+79830012520",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "пр. Дзержинского, 18",
      "addressLocality": "Новосибирск",
      "postalCode": "630000",
      "addressCountry": "RU"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "362"
    },
    "review": reviews.slice(0, 5).map(rev => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": rev.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rev.rating.toString()
      },
      "reviewBody": rev.text
    }))
  };

  return (
    <main className="min-h-screen bg-white font-body text-text-main overflow-x-hidden">
      <SEO
        title="Отзывы клиентов лофт-пространства"
        description="Отзывы и мнения семей об организации праздников в Арка Лофт в Новосибирске. Средний рейтинг 4.9 из 5 на основе 362 отзывов. Узнайте отзывы наших гостей!"
        keywords="отзывы арка лофт, отзывы детский праздник новосибирск, лофт аренда отзывы"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary-mint/10 to-secondary-yellow/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-mint/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="material-symbols-outlined text-lg">chevron_right</span>
            <span className="text-gray-900 font-bold">Отзывы</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-secondary-yellow px-4 py-2 rounded-full mb-6 shadow-lg"
              >
                <span className="material-symbols-outlined text-orange-500 text-lg">reviews</span>
                <span className="text-sm font-black text-orange-800 font-heading">Отзывы клиентов</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6 font-heading"
              >
                Реальные отзывы
                <span className="block text-primary">о нашем лофте</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl"
              >
                Честные мнения семей, которые уже отметили праздник в АркаЛофт.
                Более 500 счастливых детей и их родителей рекомендуют нас!
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 sm:gap-6"
              >
                <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-3 rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="size-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">star</span>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900">4.98</div>
                    <div className="text-xs text-gray-500 font-medium">средний рейтинг</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-3 rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600">people</span>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900">500+</div>
                    <div className="text-xs text-gray-500 font-medium">праздников</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-3 rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="size-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-600">thumb_up</span>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900">98%</div>
                    <div className="text-xs text-gray-500 font-medium">рекомендуют</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Rating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 relative overflow-hidden">
                <div className="text-center mb-6">
                  <div className="text-6xl sm:text-7xl font-black text-primary mb-3">4.9</div>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-orange-400 text-3xl sm:text-4xl">★</span>
                    ))}
                  </div>
                  <div className="text-gray-600 font-medium text-sm sm:text-base">на основе 362 отзывов</div>
                </div>

                {/* Platform badges */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="text-center text-xs sm:text-sm text-gray-500 mb-3 font-medium">Мы также на:</div>
                  <div className="flex justify-center gap-3">
                    <a href="https://2gis.ru/novosibirsk/firm/70000001026613315/tab/reviews?m=82.971997%2C55.054204%2F14.71" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 rounded-xl hover:bg-green-100 transition-all text-xs sm:text-sm">
                      <span className="material-symbols-outlined text-green-600 text-base sm:text-lg">map</span>
                      <span className="font-bold text-green-700">2ГИС</span>
                    </a>
                    <a href="https://yandex.com/maps/org/loft_arka/214653608019/reviews/?ll=82.968247%2C55.052227&z=16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 rounded-xl hover:bg-red-100 transition-all text-xs sm:text-sm">
                      <span className="material-symbols-outlined text-red-600 text-base sm:text-lg">location_on</span>
                      <span className="font-bold text-red-700">Яндекс</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reviews Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12"
          >
            {displayedReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 sm:size-12 bg-gradient-to-br from-primary to-secondary-mint rounded-full flex items-center justify-center text-white font-black text-base sm:text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-sm sm:text-base">{review.author}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{review.reviews} • {review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, idx) => (
                      <span key={idx} className="text-orange-400 text-lg sm:text-xl">★</span>
                    ))}
                  </div>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-2 mb-3 text-[10px] sm:text-xs font-bold text-green-700 bg-green-50 px-2 sm:px-3 py-1 rounded-full w-fit">
                    <span className="material-symbols-outlined text-xs sm:text-sm">check_circle</span>
                    Отзыв подтверждён
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">{review.text}</p>

                {review.response && (
                  <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-xl border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-base sm:text-lg">support_agent</span>
                      <span className="text-[10px] sm:text-xs font-bold text-gray-500">Официальный ответ • {review.response.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">{review.response.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          {visibleReviews < reviews.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <button
                onClick={loadMore}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-primary text-primary font-black text-base sm:text-lg rounded-full hover:bg-primary hover:text-white transition-all shadow-lg"
              >
                Показать ещё отзывы
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary-hover to-primary relative overflow-hidden">
        {/* Wave top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 font-heading leading-tight">
              Оставьте свой отзыв
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Поделитесь впечатлениями о вашем празднике в АркаЛофт! Ваше мнение поможет нам стать лучше.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://2gis.ru/novosibirsk/firm/70000001026613315/tab/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-full font-bold text-base sm:text-lg hover:bg-secondary-yellow hover:scale-105 transition-all shadow-2xl"
              >
                <span className="material-symbols-outlined">rate_review</span>
                Написать на 2ГИС
              </a>
              <a
                href="https://t.me/+79830012520"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/30 transition-all"
              >
                <span className="material-symbols-outlined">send</span>
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" className="fill-white"></path>
          </svg>
        </div>
      </section>
    </main>
  );
};
