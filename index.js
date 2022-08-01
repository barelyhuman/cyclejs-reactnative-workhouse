import xs from 'xstream';
import {setup} from '@cycle/run';
import {
  makeReactNativeDriver,
  View,
  TouchableHighlight,
  Text,
} from '@cycle/react-native';
import {name as appName} from './app.json';

const styles = {
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    backgroundColor: '#191815',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
};

function main(sources) {
  const inc = Symbol();
  const inc$ = sources.react.select(inc).events('press');

  const count$ = inc$.fold(count => count + 1, 0);

  const elem$ = count$.map(i =>
    View(
      {
        style: styles.view,
      },
      [
        TouchableHighlight(
          inc,
          {
            style: styles.button,
          },
          [View([Text({style: styles.buttonText}, `Counter: ${i}`)])],
        ),
      ],
    ),
  );

  return {
    react: elem$,
  };
}

const program = setup(main, {
  react: makeReactNativeDriver(appName),
});

setTimeout(() => {
  program.run();
}, 10);
