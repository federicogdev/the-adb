import { AnimeType } from "../Anime";

export enum TopAnimeFilter {
  airing = "airing",
  upcoming = "upcoming",
  bypopularity = "bypopularity",
  favorite = "favorite",
}

export interface JikanTopParams {
  page: number;
  limit: number;
}

/**
 * QueryParams used in **getTopAnime** call
 *
 * See also: [Jikan API Documentation](https://docs.api.jikan.moe/#tag/top/operation/getTopAnime)
 */
export interface AnimeTopParams extends JikanTopParams {
  type: AnimeType;
  filter: TopAnimeFilter;
}
