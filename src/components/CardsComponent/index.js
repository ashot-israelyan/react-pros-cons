import React, { Component } from 'react';
import PropTypes from 'prop-types'
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import Card from './Card';
import uniqueId from 'lodash/uniqueId';

import actions from '../../redux/actions';
import * as actionTypes from '../../redux/actions/actionTypes';

@DragDropContext(HTML5Backend)
class Container extends Component {
	moveCard = (dragIndex, hoverIndex) => {
		const { cards } = { ...this.props };
		const dragCard = cards[dragIndex];

		const newState = update(this.props, {
			cards: {
				$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
			}
		});

		this.props.reorderCards(this.props.type, newState.cards);
	};

	removeCard = (id) => {
		this.props.deleteCard(this.props.type, id);
	}

	hadleInputSubmit = (value, id) => {
		const cardIndex = this.props.cards.findIndex(el => el.id === id);

		if (cardIndex > -1) {
			this.props.updateCard(this.props.type, id, value);

			return;
		}

		this.props.addCard(this.props.type, value);
	};

	addEmptyCard = () => {
		this.props.addCard(this.props.type, '');
	}

	render() {
		return (
			<div className={this.props.type + '-container'}>
				{this.props.type.toUpperCase()}

				<div className="cards-container">
					{(this.props.cards || []).map((card, i) => (
						<Card
							key={card.id}
							index={i}
							id={card.id}
							text={card.text}
							moveCard={this.moveCard}
							hadleInputSubmit={this.hadleInputSubmit}
							addEmptyCard={this.addEmptyCard}
							removeCard={this.removeCard}
						/>
					))}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		cards: state.prosCons[ownProps.type]
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reorderCards: (type, cards) => dispatch(actions.prosCons.reorderCards(type, cards)),
		addCard: (cardType, value) => dispatch(actions.prosCons.addCard(cardType, value)),
		updateCard: (cardType, id, value) => dispatch(actions.prosCons.editCard(cardType, id, value)),
		deleteCard: (cardType, id) => dispatch(actions.prosCons.deleteCard(cardType, id))
	}
}

Container.propTypes = {
	type: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);