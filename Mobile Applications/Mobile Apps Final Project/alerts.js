import { Alert, Platform } from 'react-native';

/*
import { showAlert } from './src/alerts';

      <View style={styles.btnContainer}>
        <Button title="Submit" onPress={() => showAlert('Button pressed!')} />
      </View>
*/



/**
 * showAlert(title, message, options) -> Promise<number>
 * Resolves with the index of the button pressed (0 = first button).
 */
export function showAlert(title = '', message = '', options = { okText: 'OK' }) {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.alert === 'function') {
      // simple single-button alert on web
      const body = message ? `${title}\n\n${message}` : title;
      window.alert(body);
      resolve(0);
      return;
    }

    // native: show Alert.alert with one button
    Alert.alert(title, message, [
      { text: options.okText || 'OK', onPress: () => resolve(0) },
    ], { cancelable: false });
  });
}

/**
 * showConfirm(title, message, options) -> Promise<boolean>
 * Resolves true if "ok", false if "cancel".
 */
export function showConfirm(title = '', message = '', options = { okText: 'OK', cancelText: 'Cancel' }) {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.confirm === 'function') {
      const confirmed = window.confirm(message ? `${title}\n\n${message}` : title);
      resolve(!!confirmed);
      return;
    }

    // native: two-button dialog
    Alert.alert(
      title,
      message,
      [
        { text: options.cancelText || 'Cancel', onPress: () => resolve(false), style: 'cancel' },
        { text: options.okText || 'OK', onPress: () => resolve(true) },
      ],
      { cancelable: true },
    );
  });
}

export default { showAlert, showConfirm };