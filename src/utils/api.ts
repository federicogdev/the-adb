import axios from "axios";
import { Genre } from "../data/genres";
import { Anime, JikanResponse, Statistics, TopAnimeFilter } from "../models";

export const fetchAnimes = (
  filter: TopAnimeFilter,
  limit: number
): Promise<JikanResponse<Anime[]>> =>
  axios
    .get(`https://api.jikan.moe/v4/top/anime?filter=${filter}&limit=${limit}`)
    .then((res) => res.data);

export const fetchGenres = (): Promise<JikanResponse<Genre[]>> =>
  axios.get("https://api.jikan.moe/v4/genres/anime").then((res) => res.data);

export const fetchAnimeDetails = (_id: number): Promise<JikanResponse<Anime>> =>
  axios
    .get(`https://api.jikan.moe/v4/anime/${_id}/full`)
    .then((res) => res.data);

export const fetchAnimeStatistics = (
  _id: number
): Promise<JikanResponse<Statistics>> =>
  axios
    .get(`https://api.jikan.moe/v4/anime/${_id}/statistics`)
    .then((res) => res.data);

export const searchAnimes = (q: string): Promise<JikanResponse<Anime[]>> =>
  axios
    .get(`https://api.jikan.moe/v4/anime?q=${q}&order_by=members&sort=desc`)
    .then((res) => res.data);
