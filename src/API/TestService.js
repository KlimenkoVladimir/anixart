import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default class TestService {
  static async getAnime(filter = "bypopularity", type = null, page = 1) {
    const response = await axios.get("https://api.jikan.moe/v4/top/anime", {
      params: {
        type: type,
        filter: filter,
        page: page,
      },
    });
    return response;
  }

  static async getAnimeOngoing() {
    return TestService.getAnime("airing");
  }
  static async getAnimeUpcoming() {
    return TestService.getAnime("upcoming");
  }
  static async getAnimeFinished() {
    return TestService.getAnime("bypopularity");
  }
  static async getAnimeMovie() {
    return TestService.getAnime(null, "movie");
  }
  static async getAnimeOVA() {
    return TestService.getAnime(null, "ova");
  }

  static async getAnimeSearch(inputQueary) {
    const response = await axios.get("https://api.jikan.moe/v4/anime", {
      params: {
        q: inputQueary,
      },
    });
    return response;
  }

  static async getAnimeById(id) {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/full`
    );
    return response;
  }

  static async getAnimeStatistic(id) {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/statistics`
    );
    return response;
  }

  static async getAnimePictures(id) {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/pictures`
    );
    return response;
  }
}
