import diff from 'deep-diff';

function propDiff(props, newProps) {

  let propDiff = diff(props, newProps) || [];

  propDiff.map(item => {
    let vals = [`%c${item.path.join('.')}:    %c${item.lhs}   %c${item.rhs}`];
    let colors = ['color: purple;', 'color: red;',  'color: green;'];
    console.log(...vals.concat(colors));
  });

  console.log("%c" + "-".repeat(80), "background: black" );
}
