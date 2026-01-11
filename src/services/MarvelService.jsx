import useHttp from "../hooks/http.hook"

function useMarvelService() {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = '/api'
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'

    const getAllCharacters = async (offset = 0) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}/?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 250)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? `${comic.description.slice(0, 250)}...` : 'There is no description for this comic',
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            lang: comic.textObjects.languages,
            price: comic.prices[0].price
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService