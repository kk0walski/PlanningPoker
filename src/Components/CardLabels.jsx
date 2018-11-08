import React from "react";
import PropTypes from "prop-types";

class CardLabels extends React.Component {
  static propTypes = {
    cardId: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        labelId: PropTypes.string.isRequired,
        labelColor: PropTypes.string.isRequired,
        labelText: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const { labels, cardId } = this.props;
    return (
      <div class="list-card-labels">
        {labels.map(
          label =>
            label.cards !== undefined &&
            label.cards[cardId] !== undefined && (
              <span
                class="card-label mod-card-front"
                color={label.color}
                style={{ background: label.color }}
              />
            )
        )}
      </div>
    );
  }
}

export default CardLabels;
