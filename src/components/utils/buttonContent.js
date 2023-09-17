import TestService from "../../API/TestService";

export const homeButtonContent = [
  {
    title: "Онгоинги",
    func: TestService.getAnimeOngoing,
  },
  {
    title: "Анонсы",
    func: TestService.getAnimeUpcoming,
  },
  {
    title: "Завершенные",
    func: TestService.getAnimeFinished,
  },
  {
    title: "Фильмы",
    func: TestService.getAnimeMovie,
  },
  {
    title: "OVA",
    func: TestService.getAnimeOVA,
  },
  // 'Онгоинги', 'Анонсы', 'Завершенные', 'Фильмы', 'OVA'
];

export const favoriteButtonContent = [
  {
    title: "Смотрю",
    func: null,
  },
  {
    title: "В планах",
    func: null,
  },
  {
    title: "Просмотрено",
    func: null,
  },
  {
    title: "Отложено",
    func: null,
  },
  {
    title: "Брошено",
    func: null,
  },
];
