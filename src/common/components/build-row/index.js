import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import { BuildStatus } from '../../helpers/snap-builds';

import styles from './buildRow.css';

const BuildRow = (props) => {

  const {
    account,
    repo,
    architecture,
    buildId,
    duration,
    status,
    statusMessage,
    dateStarted
  } = props;

  const statusStyle = {
    [BuildStatus.SUCCESS]: styles.success,
    [BuildStatus.ERROR]: styles.error,
    [BuildStatus.PENDING]: styles.pending
  };

  let humanDuration;
  if (duration !== null) {
    humanDuration = moment.duration(duration).humanize();
  } else {
    humanDuration = '';
  }

  let humanDateStarted;
  if (dateStarted !== null) {
    const momentStarted = moment(dateStarted);
    humanDateStarted = (
      <span title={momentStarted.format('YYYY-MM-DD HH:mm:ss UTC')}>
        {momentStarted.fromNow()}
      </span>
    );
  } else {
    humanDateStarted = '';
  }

  return (
    <div className={ `${styles.buildRow} ${statusStyle[status]}` }>
      <div className={ styles.item }><Link to={`/${account}/${repo}/builds/${buildId}`}>{`#${buildId}`}</Link> {statusMessage}</div>
      <div className={ styles.item }>
        {architecture}
      </div>
      <div className={ styles.item }>
        {humanDuration}
      </div>
      <div className={ styles.item }>
        {humanDateStarted}
      </div>
    </div>
  );
};

BuildRow.propTypes = {
  // params from URL
  account: PropTypes.string,
  repo: PropTypes.string,

  // build properties
  buildId:  PropTypes.string,
  architecture: PropTypes.string,
  status:  PropTypes.string,
  statusMessage: PropTypes.string,
  dateStarted: PropTypes.string,
  duration: PropTypes.string
};

export default BuildRow;