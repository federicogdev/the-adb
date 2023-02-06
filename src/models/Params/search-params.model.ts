import { AnimeRating, AnimeStatus, AnimeType } from "../Anime";

export enum SortOptions {
  asc = "asc",
  desc = "desc",
}

export enum SearchOrder {
  mal_id = "mal_id",
  title = "title",
  start_date = "start_date",
  end_date = "end_date",
  score = "score",
  scored_by = "scored_by",
  rank = "rank",
  popularity = "popularity",
  members = "members",
  favorites = "favorites",
}

export enum AnimeSearchOrder {
  type = "type",
  rating = "rating",
  episodes = "episodes",
}

export interface JikanSearchParams {
  q: string;
  page: number;
  limit: number;
  score: number;
  min_score: number;
  max_score: number;
  sfw: boolean;
  genres: string;
  genres_exclude: string;
  sort: SortOptions | string;
  letter: string;
  producers: string;
  start_date: string;
  end_date: string;
}

/**
 * QueryParams used in **getAnimeSearch** call
 *
 * See also: [Jikan API Documentation](https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch)
 */
export interface AnimeSearchParams extends JikanSearchParams {
  type: AnimeType | string;
  status: AnimeStatus | string;
  rating: AnimeRating | string;
  order_by: AnimeSearchOrder | SearchOrder | string;
}
