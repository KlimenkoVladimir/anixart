import TestServise from "../../API/TestServise"

export const homeButtonContent = [{
    title: 'Онгоинги',
    func: TestServise.getAnimeOngoing
  },
  {
    title: 'Анонсы',
    func: TestServise.getAnimeUpcoming
  },
  {
    title: 'Завершенные',
    func: TestServise.getAnimeFinished
  },
  {
    title: 'Фильмы',
    func: TestServise.getAnimeMovie
  },
  {
    title: 'OVA',
    func: TestServise.getAnimeOVA
  },
    // 'Онгоинги', 'Анонсы', 'Завершенные', 'Фильмы', 'OVA'
]

export const favoriteButtonContent = [{
    title: 'Смотрю',
    func: null
  },
  {
    title: 'В планах',
    func: null
  },
  {
    title: 'Просмотренно',
    func: null
  },
  {
    title: 'Отложено',
    func: null
  },
  {
    title: 'Брошено',
    func: null
  },
]


