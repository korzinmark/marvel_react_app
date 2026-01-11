import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

function CharList({onCharSelected}) {
    const [charList, setCharList] = useState([])
    const [selectedCharId, setSelectedCharId] = useState(null)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)
    
    const {loading, error, getAllCharacters} = useMarvelService()

    let initialLoaded = false

    useEffect(() => {
        if (!initialLoaded) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            initialLoaded = true
            onRequest(offset, true)
        }
    }, [])

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    function onCharListLoaded(newCharList) {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    function onCharClick(id) {
        setSelectedCharId(id)
        onCharSelected(id)
    }

    function renderItems(arr) {
        const items = arr.map((item) => {
            const {id, name, thumbnail} = item
            let clazz = 'char__item'

            if (selectedCharId === id) {
                clazz += ' char__item_selected'
            }

            return (
                <li onClick={() => onCharClick(id)}
                    className={clazz}
                    key={id}>
                        <img src={thumbnail} alt={name} />
                        <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
        
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

export default CharList;