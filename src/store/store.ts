import { TLocation } from './../types/types';
import { createEvent, createStore, createEffect } from "effector";
import { TCharacter, TEpisode, TStore } from "../types/types";

// Standard interface and functions
// export interface Todo {
//     id: number;
//     text: string;
//     done: boolean;
// }

// export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
//     todos.map((todo) => ({
//         ...todo,
//         text: todo.id === id ? text : todo.text,
//     }));

// export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
//     todos.map((todo) => ({
//         ...todo,
//         done: todo.id === id ? !todo.done : todo.done,
//     }));

// export const removeTodo = (todos: Todo[], id: number): Todo[] =>
//     todos.filter((todo) => todo.id !== id);

// export const addTodoToList = (todos: Todo[], text: string): Todo[] => [
//     ...todos,
//     {
//         id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
//         text,
//         done: false,
//     },
// ];

// Effector implementation
// interface Store {
//     todos: Todo[];
//     newTodo: string;
// }
// export const setNewTodo = createEvent<string>();
export const removeEpisode = createEvent();
export const removeEpisodes = createEvent();

export const removeCharacter = createEvent();
export const removeCharacters = createEvent();

export const removeLocation = createEvent();
export const removeLocations = createEvent();
// export const update = createEvent<{ id: number; text: string }>();
// export const remove = createEvent<number>();
// export const toggle = createEvent<number>();

export const getEpisodes = createEffect(async (url: string) => {
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

// export const getCharactersWithParams = createEffect(async (url: string) => {
//     const res = await fetch(`${url}`).then(req => req.json())
//     return res
// })

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
    // .on(update, (state, { id, text }) => ({
    //     ...state,
    //     todos: updateTodo(state.todos, id, text),
    // }))
    // .on(remove, (state, id) => ({
    //     ...state,
    //     todos: removeTodo(state.todos, id),
    // }))
    // .on(toggle, (state, id) => ({
    //     ...state,
    //     todos: toggleTodo(state.todos, id),
    // }));
