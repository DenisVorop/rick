export type TEpisode = {
    air_date: string
    characters: string[]
    created: string
    episode: string
    id: number
    name: string
    url: string
}

export type TStore = {
    episodes: TEpisode[]
    episode: TEpisode
    character: any
}

export type TCharacter = {
    created: string
    episode: string[]
    gender: string
    id: number
    image: string
    location: { name: string, url: string }
    name: string
    origin: { name: string, url: string }
    species: string
    status: string
    type: string
    url: string
}
