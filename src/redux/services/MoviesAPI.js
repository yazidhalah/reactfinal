import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MoviesAPI = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/' }),
    reducerPath: 'MoviesAPI',
    endpoints: (builder) => ({
        getTopRatedTV: builder.query({
            query: () => {
                return {
                    url: '3/tv/top_rated',
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd" },
                };
            },
        }),
        getTopRatedMovies: builder.query({
            query: ({ page }) => {
                return {
                    url: '3/movie/top_rated',
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd", page: page },
                }
            }
        }),
        getMoviesCategories: builder.query({
            query: () => {
                return {
                    url: '3/genre/movie/list',
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd" }
                }
            }
        }),
        getTVCategories: builder.query({
            query: () => {
                return {
                    url: '3/genre/tv/list',
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd" }
                }
            }
        }),
        getTrendingAll: builder.query({
            query: () => {
                return {
                    url: '3/trending/all/day',
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd" }
                }
            }
        }),
        getMovieDetails: builder.query({
            query: (args) => {
                return {
                    url: `3/movie/${args.movieId}`,
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd" }
                }
            }
        }),
        getMoviesByGenre: builder.query({
            query: (args) => {
                return {
                    url: `3/discover/movie`,
                    params: { api_key: "4dc0a40e67ccc092899835b67beb1bfd", with_genres: args.genreId }
                }
            }
        })
    }),
});

export const { useGetTopRatedTVQuery, useGetTopRatedMoviesQuery, getTopRatedMovies, useGetMovieDetailsQuery,
    useGetMoviesCategoriesQuery, useGetTVCategoriesQuery, useGetTrendingAllQuery, usePostRateMovieMutation } = MoviesAPI;
