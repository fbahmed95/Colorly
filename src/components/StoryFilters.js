import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter } from '../actions/filters';

export class StoryFilters extends React.Component {
  constructor(props) {
  super(props);
  console.log(props);
  }
  // state = {
  //   calendarFocused: null
  // };
  // onDatesChange = ({ startDate, endDate }) => {
  //   this.props.setStartDate(startDate);
  //   this.props.setEndDate(endDate);
  // };
  // onFocusChange = (calendarFocused) => {
  //   this.setState(() => ({ calendarFocused }));
  // }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  // onSortChange = (e) => {
  //   if (e.target.value === 'date') {
  //     this.props.sortByDate();
  //   } else if (e.target.value === 'amount') {
  //     this.props.sortByAmount();
  //   }
  // };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input-new"
              placeholder="Search stories"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
        </div>
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
