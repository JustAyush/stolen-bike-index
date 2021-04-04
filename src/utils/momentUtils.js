import moment from 'moment';
import config from '../config';

export const dateDisplayFormat = (
  date,
  format = config.DATE_DISPLAY_FORMAT
) => {
  if (!date) return 'N/A';
  return moment(date * 1000).format(format);
};

export const convertTo10DigitTimestamp = (date) => {
  if (!date) return date;
  return moment(new Date(date)).format('X');
};
