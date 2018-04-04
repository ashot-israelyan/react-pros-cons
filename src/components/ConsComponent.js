import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardsComponent from './CardsComponent';

import actions from '../redux/actions';
import * as actionTypes from '../redux/actions/actionTypes';

class ConsComponent extends Component {
    reorederCards(cards) {
        this.props.reorderCards('cons', cards);
    }

    render() {
        return (
            <div>
                CONS
                <CardsComponent cards={this.props.cons} reorederCards={this.reorederCards.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cons: state.prosCons.cons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reorderCards: (type, cards) => dispatch(actions.prosCons.reorderCards(type, cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsComponent);