import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import { useEffect } from 'react';

import styles from './App.module.scss';

export default function App() {

	console.log(styles);
	
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text style={styles.text}>This is app using scss to create styling the components</Text>
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}
