import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import _styles from './BottomSheet.scss'
const styles = StyleSheet.create({ ..._styles })

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const BottomSheet = React.forwardRef<BottomSheetProps, BottomSheetRefProps>((props, ref) => {

    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const active = useSharedValue(false)
    const _height = useSharedValue(0)

    const scrollTo = useCallback((height: number) => {
        "worklet"
        active.value = height !== 0;
        _height.value = height

        translateY.value = withSpring(height, { damping: 50 })
    }, [])

    const isActive = useCallback(() => {
        return active.value
    }, [])

    const toggle = useCallback((height?: number) => {

        if (active.value) scrollTo(0)

        if (!active.value) {
            let _h = height || SCREEN_HEIGHT / 3
            if (_h > 0) _h = -_h
            scrollTo(_h)
        }

    }, [active.value, translateY.value])

    useImperativeHandle(ref, () => ({ scrollTo, isActive, toggle }), [scrollTo, isActive, toggle])

    const gesture = Gesture.Pan()
        .onStart((event) => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd((event) => {

            if (translateY.value > _height.value) {
                scrollTo(0)
            }

            if (translateY.value < -SCREEN_HEIGHT / 2) {
                scrollTo(MAX_TRANSLATE_Y)
            }
        })

    // useEffect(() => {
    //     scrollTo(-SCREEN_HEIGHT / 3)
    // }, [])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 5],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        }
    })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[{ ...styles.bottomSheetContainer, height: SCREEN_HEIGHT, top: SCREEN_HEIGHT }, rBottomSheetStyle]}>

                <View style={styles.line} />

            </Animated.View>
        </GestureDetector>
    )
})

export type BottomSheetRefProps = {
    scrollTo: (height: number) => void
    isActive: () => boolean
    toggle: (height?: number) => void
}

interface BottomSheetProps {
    [key: string]: any
}

export default BottomSheet;