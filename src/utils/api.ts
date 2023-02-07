import axios from "axios";
import { Anime, JikanResponse, TopAnimeFilter } from "../models";

export const fetchAnimes = (
  filter: TopAnimeFilter,
  limit: number
): Promise<JikanResponse<Anime[]>> =>
  axios
    .get(`https://api.jikan.moe/v4/top/anime?filter=${filter}&limit=${limit}`)
    .then((res) => res.data);
