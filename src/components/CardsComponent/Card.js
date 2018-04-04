import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		if (dragIndex === hoverIndex) {
			return
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		props.moveCard(dragIndex, hoverIndex)

		monitor.getItem().index = hoverIndex
	},
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))

class Card extends Component {
	state = {
		text: this.props.text,
		cardAdded: !!this.props.text
	};

	onChangeHandler = (event) => {
		if (event.target.value.length === 1 && !this.state.cardAdded) {
			this.props.addEmptyCard();
			this.setState({ cardAdded: true });
		}

		if (!event.target.value.length) {
			this.props.removeCard(this.props.id);

			return false;
		}

		this.setState({ text: event.target.value });
	}

	handleBlur = () => {
		this.props.hadleInputSubmit(this.state.text, this.props.id);
	}

	render() {
		const {
			index,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0 : 1

		return connectDragSource(
			connectDropTarget(
				<div className="card" style={{ opacity }}>
					<strong>{index + 1}.</strong>
					<input
						type="text"
						defaultValue={this.state.text}
						onChange={this.onChangeHandler}
						onBlur={this.handleBlur} />
				</div>
			),
		)
	}
}

Card.propTypes = {
	index: PropTypes.number.isRequired,
	id: PropTypes.any.isRequired,
	text: PropTypes.string.isRequired,
	moveCard: PropTypes.func.isRequired,
	hadleInputSubmit: PropTypes.func.isRequired,
	addEmptyCard: PropTypes.func.isRequired,
	removeCard: PropTypes.func.isRequired
}

export default Card;