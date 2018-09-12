import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter } from '../actions/filters';

export class StoryFilters extends React.Component {
  constructor(props) {
  super(props);
  console.log(props);
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  render() {
    return (
      <div className="filter-container">
            <input
              type="text"
              className="text-input-new"
              placeholder="search stories"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryFilters);
