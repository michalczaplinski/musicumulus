import diff from 'deep-diff';
import moment from 'moment';

export function propDiff(props, newProps) {

  let propDiff = diff(props, newProps) || [];

  propDiff.map(item => {
    let vals = [`%c${item.path.join('.')}:    %c${item.lhs}   %c${item.rhs}`];
    let colors = ['color: purple;', 'color: red;',  'color: green;'];
    console.log(...vals.concat(colors));
  });

  console.log("%c" + "-".repeat(80), "background: black" );
}

export function httpsify(url) {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  } else {
    return url;
  }
}

/*
 * Helper for formatting times in audio-friendly way
 */
export function trackTime(time) {
  let duration = moment.duration(time);
  if (duration.hours()) {
    return moment.utc(time).format("HH:mm:ss");
  } else if (duration.minutes()) {
    return moment.utc(time).format("mm:ss");
  } else {
    return moment.utc(time).format("00:ss");
  }
}
