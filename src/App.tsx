import React, { useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styles from './App.scss';
import BottomSheet, { BottomSheetRefProps } from './ui/BottomSheet/BottomSheet';
// const styles = StyleSheet.create({ ..._styles })

export default function App() {


	const ref = useRef<BottomSheetRefProps>(null)

	const onPress = useCallback(() => {
		ref?.current?.toggle()
	}, [])

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.container}>
				<StatusBar style="light" />

				<Button title='Bottom Sheet' onPress={onPress} />

				<BottomSheet ref={ref} />
			</View>

		</GestureHandlerRootView>
	);
}