import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        selectedCharId: null,
        newItemLoading: false,
        offset: 0,
        charEnded: false
    }
    
    marvelService = new MarvelService();
    initialLoaded = false;

    componentDidMount() {
        if (!this.initialLoaded) {
            this.initialLoaded = true;
            this.onRequest();
        }
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharClick = (id) => {
        this.setState({
            selectedCharId: id
        })

        this.props.onCharSelected(id)
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            const {id, name, thumbnail} = item
            let clazz = 'char__item'

            if (this.state.selectedCharId === id) {
                clazz += ' char__item_selected'
            }

            return (
                <li onClick={() => this.onCharClick(id)}
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

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{ 'display': charEnded ? 'none' : 'block' }}
                        className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;