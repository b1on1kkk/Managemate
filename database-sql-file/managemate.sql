-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 24 2023 г., 20:12
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `managemate`
--

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `icon_name` varchar(30) DEFAULT NULL,
  `overview` varchar(10000) DEFAULT NULL,
  `tasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tasks`)),
  `notes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`notes`)),
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`questions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `title`, `icon_name`, `overview`, `tasks`, `notes`, `questions`) VALUES
(43, 'test123', 'Apple', '', '[{\"todo_inf\":{\"id\":0,\"sub_title\":\"Ux stages\",\"title\":\"Wireframing\",\"about\":\"Create something\",\"htag_color\":\"bg-red-500\",\"todos\":[{\"id\":0,\"checked\":false,\"text\":\"test\"},{\"id\":1,\"checked\":false,\"text\":\"test\"},{\"id\":2,\"checked\":false,\"text\":\"test\"},{\"id\":3,\"checked\":false,\"text\":\"test\"},{\"id\":4,\"checked\":false,\"text\":\"test\"},{\"id\":5,\"checked\":false,\"text\":\"test\"},{\"id\":6,\"checked\":false,\"text\":\"test\"},{\"id\":7,\"checked\":false,\"text\":\"test\"}]},\"board_id\":1},{\"todo_inf\":{\"id\":1,\"sub_title\":\"Another\",\"title\":\"Just test project\",\"about\":\"Create project\",\"htag_color\":\"bg-gray-200\",\"todos\":[{\"id\":0,\"checked\":false,\"text\":\"Create project\"}]},\"board_id\":1},{\"todo_inf\":{\"id\":2,\"sub_title\":\"test\",\"title\":\"test\",\"about\":\"test\",\"htag_color\":\"bg-gray-200\",\"todos\":[{\"id\":0,\"checked\":true,\"text\":\"test\"},{\"id\":1,\"checked\":true,\"text\":\"test\"},{\"id\":2,\"checked\":true,\"text\":\"test\"},{\"id\":3,\"checked\":false,\"text\":\"test\"},{\"id\":4,\"checked\":false,\"text\":\"test\"},{\"id\":5,\"checked\":false,\"text\":\"test\"},{\"id\":6,\"checked\":false,\"text\":\"test\"},{\"id\":7,\"checked\":false,\"text\":\"test\"},{\"id\":8,\"checked\":false,\"text\":\"test\"}],\"show_more\":false},\"board_id\":2},{\"todo_inf\":{\"id\":5,\"sub_title\":\"test4\",\"title\":\"test4\",\"about\":\"test4\",\"htag_color\":\"bg-gray-200\",\"todos\":[{\"id\":0,\"checked\":false,\"text\":\"test4\"}],\"show_more\":false},\"board_id\":2},{\"todo_inf\":{\"id\":3,\"sub_title\":\"test2\",\"title\":\"test2\",\"about\":\"test2\",\"htag_color\":\"bg-gray-200\",\"todos\":[{\"id\":0,\"checked\":true,\"text\":\"test2\"},{\"id\":1,\"checked\":true,\"text\":\"test2\"},{\"id\":2,\"checked\":true,\"text\":\"test2\"},{\"id\":3,\"checked\":true,\"text\":\"test2\"},{\"id\":4,\"checked\":true,\"text\":\"test2\"},{\"id\":5,\"checked\":false,\"text\":\"test2\"}],\"show_more\":false},\"board_id\":3},{\"todo_inf\":{\"id\":4,\"sub_title\":\"test3\",\"title\":\"test3\",\"about\":\"test3\",\"htag_color\":\"bg-gray-200\",\"todos\":[{\"id\":0,\"checked\":true,\"text\":\"test\"},{\"id\":1,\"checked\":true,\"text\":\"test\"}],\"show_more\":false},\"board_id\":4}]', '[]', '[]'),
(46, 'test_project_1', 'Apple', '', '[]', '[]', '[]');

-- --------------------------------------------------------

--
-- Структура таблицы `sessiontbl`
--

CREATE TABLE `sessiontbl` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `sessiontbl`
--

INSERT INTO `sessiontbl` (`session_id`, `expires`, `data`) VALUES
('-uWVVKIylAEUgmZ2mLkJte06IdilmtYU', 1703455224, '{\"cookie\":{\"originalMaxAge\":10800000,\"expires\":\"2023-12-24T21:48:46.461Z\",\"httpOnly\":true,\"path\":\"/\"},\"user_key\":\"a0cee8b5-aa8e-4a2f-a458-864035d87266\"}'),
('Xat7aaC84gBhNcl0qK-ZRsSjiSUaCs5p', 1703455222, '{\"cookie\":{\"originalMaxAge\":10800000,\"expires\":\"2023-12-24T21:48:30.399Z\",\"httpOnly\":true,\"path\":\"/\"},\"user_key\":\"eee9489a-8b20-4bec-b686-9b1d68cca32c\"}');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `hash_key` varchar(500) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `mail`, `hash_key`, `avatar`) VALUES
(12, 'Alex', '123', 'b1on1kkk@mail.ru', 'a0cee8b5-aa8e-4a2f-a458-864035d87266', 'http://localhost:2000/avatars?avatar_name=second.png'),
(13, 'qwerty', '123', 'just96.96@mail.ru', 'eee9489a-8b20-4bec-b686-9b1d68cca32c', 'http://localhost:2000/avatars?avatar_name=first.png'),
(14, 'Александр', '123', 'asd@mail.ru', '34d02f90-eccd-43e9-8318-78039f07a078', 'http://localhost:2000/avatars?avatar_name=second.png'),
(15, 'Алекс', '123', 'asdzxc@mail.ru', 'c76a16d0-c181-4e38-9212-7f3c999151d3', 'http://localhost:2000/avatars?avatar_name=first.png'),
(16, 'qwertyyyyy', '123', 'qweqerqw@mail.ru', '281d122c-0b98-4b80-bc32-e3722d460aad', 'http://localhost:2000/avatars?avatar_name=second.png');

-- --------------------------------------------------------

--
-- Структура таблицы `users_projects`
--

CREATE TABLE `users_projects` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users_projects`
--

INSERT INTO `users_projects` (`project_id`, `user_id`, `role`) VALUES
(43, 13, 1),
(46, 12, 1),
(46, 13, 0),
(46, 14, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessiontbl`
--
ALTER TABLE `sessiontbl`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_projects`
--
ALTER TABLE `users_projects`
  ADD PRIMARY KEY (`project_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `users_projects`
--
ALTER TABLE `users_projects`
  ADD CONSTRAINT `users_projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_projects_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
