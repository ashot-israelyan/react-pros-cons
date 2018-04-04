import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardsComponent from './CardsComponent';

import actions from '../redux/actions';
import * as actionTypes from '../redux/actions/actionTypes';

class ProsComponent extends Component {
    reorederCards(cards) {
        this.props.reorderCards('pros', cards);
    }

    render() {
        return (
            <div>
                PROS
                <CardsComponent cards={this.props.pros} reorederCards={this.reorederCards.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pros: state.prosCons.pros
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reorderCards: (type, cards) => dispatch(actions.prosCons.reorderCards(type, cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProsComponent);