import axios from "axios";
import { Genre } from "../data/genres";
import { Anime, JikanResponse, TopAnimeFilter } from "../models";

export const fetchAnimes = (
  filter: TopAnimeFilter,
  limit: number
): Promise<JikanResponse<Anime[]>> =>
  axios
    .get(`https://api.jikan.moe/v4/top/anime?filter=${filter}&limit=${limit}`)
    .then((res) => res.data);

export const fetchGenres = (): Promise<JikanResponse<Genre[]>> =>
  axios.get("https://api.jikan.moe/v4/genres/anime").then((res) => res.data);
