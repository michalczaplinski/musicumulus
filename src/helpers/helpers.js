import diff from 'deep-diff';

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
