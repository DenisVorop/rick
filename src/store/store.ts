import { createEvent, createStore, createEffect } from "effector";
import { TCharacter, TEpisode, TStore, TLocation } from "../types/types";

export const removeEpisode = createEvent();
export const removeEpisodes = createEvent();

export const removeCharacter = createEvent();
export const removeCharacters = createEvent();

export const removeLocation = createEvent();
export const removeLocations = createEvent();

export const getEpisodes = createEffect(async (url: string) => {
    // Это и некрасиво, и неправильно, и ужасно, и отвратительно, но я не знал как
    // подгрузить все серии разом, чтобы поделить на сезоны
    const page1 = await fetch(`${url}1`).then(req => req.json())
    const page2 = await fetch(`${url}2`).then(req => req.json())
    const page3 = await fetch(`${url}3`).then(req => req.json())
    return [...page1.results, ...page2.results, ...page3.results]
})

export const getLocations = createEffect(async (url: string) => {
    const res = await fetch(`${url}`).then(req => req.json())
    return res
})

export const getCharacters = createEffect(async (url: string) => {
    const res = await fetch(`${url}`).then(req => req.json())
    return res
})

export const getEpisode = createEffect(async (id: number) => {
    const req = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    return req.json()
})

export const getCharacter = createEffect(async (id: number) => {
    const req = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    return req.json();
})

export const getLocation = createEffect(async (name: string) => {
    const res = await fetch(`https://rickandmortyapi.com/api/location?name=${name}`)
        .then(req => req.json())
    return res.results[0]
})

export default createStore<TStore>({
    episodes: [],
    locations: [],
    characters: [],
    episode: {} as TEpisode,
    character: {} as TCharacter,
    location: {} as TLocation,
    locations_pages: null,
    characters_pages: null
})
    .on(getEpisodes.doneData, (state, episodes: TEpisode[]) => ({ ...state, episodes }))
    .on(removeEpisodes, (state) => ({
        ...state,
        episodes: [] as TEpisode[]
    }))

    .on(getLocations.doneData, (state, locations) => ({
        ...state,
        locations_pages: locations.info.pages,
        locations: [...state.locations, ...locations.results]
    }))
    .on(removeLocations, (state) => ({
        ...state,
        locations: [] as TLocation[]
    }))

    .on(getCharacters.doneData, (state, characters) => ({
        ...state,
        characters_pages: characters.info.pages,
        characters: [...characters.results]
    }))
    .on(removeCharacters, (state) => ({
        ...state,
        characters: [] as TCharacter[]
    }))

    .on(getEpisode.doneData, (state, episode: TEpisode) => ({ ...state, episode }))
    .on(removeEpisode, (state) => ({
        ...state,
        episode: {} as TEpisode
    }))
    .on(getCharacter.doneData, (state, character: TCharacter) => ({ ...state, character }))
    .on(removeCharacter, (state) => ({
        ...state,
        character: {} as TCharacter
    }))
    .on(getLocation.doneData, (state, location: TLocation) => ({ ...state, location: location }))
    .on(removeLocation, (state) => ({
        ...state,
        location: {} as TLocation
    }))
