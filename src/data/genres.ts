export interface Genre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export const genres: Genre[][] = [
  [
    {
      mal_id: 1,
      name: "Action",
      url: "https://myanimelist.net/anime/genre/1/Action",
      count: 4521,
    },
    {
      mal_id: 2,
      name: "Adventure",
      url: "https://myanimelist.net/anime/genre/2/Adventure",
      count: 3752,
    },
    {
      mal_id: 46,
      name: "Award Winning",
      url: "https://myanimelist.net/anime/genre/46/Award_Winning",
      count: 232,
    },
  ],
  [
    {
      mal_id: 4,
      name: "Comedy",
      url: "https://myanimelist.net/anime/genre/4/Comedy",
      count: 6995,
    },
    {
      mal_id: 8,
      name: "Drama",
      url: "https://myanimelist.net/anime/genre/8/Drama",
      count: 2787,
    },
    {
      mal_id: 22,
      name: "Romance",
      url: "https://myanimelist.net/anime/genre/22/Romance",
      count: 2000,
    },
  ],
  [
    {
      mal_id: 10,
      name: "Fantasy",
      url: "https://myanimelist.net/anime/genre/10/Fantasy",
      count: 5066,
    },
    {
      mal_id: 14,
      name: "Horror",
      url: "https://myanimelist.net/anime/genre/14/Horror",
      count: 517,
    },
    {
      mal_id: 40,
      name: "Psychological",
      url: "https://myanimelist.net/anime/genre/40/Psychological",
      count: 408,
    },
  ],
];
