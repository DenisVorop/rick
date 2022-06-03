export type TEpisode = {
    air_date: string
    characters: string[]
    created: string
    episode: string
    id: number
    name: string
    url: string
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

export type TLocation = {
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
}

export type TStore = {
    episodes: TEpisode[]
    locations: TLocation[]
    characters: TCharacter[]
    episode: TEpisode
    character: TCharacter
    location: TLocation
    locations_pages: number | null
    characters_pages: number | null
}
