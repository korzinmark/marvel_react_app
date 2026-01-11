import { useParams, Link } from 'react-router-dom';

import { useState, useEffect  } from 'react'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './singleComicPage.scss';

function SingleComicPage() {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {loading, error, getComic, clearError} = useMarvelService()

    useEffect(() => {
        updateComic()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId])

    function updateComic() {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    function onComicLoaded(comic) {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

function View({comic}) {
    const {title, description, pageCount, thumbnail, lang, price} = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;