import React, { useCallback, useEffect } from 'react';
import { Text, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { Lyric } from 'react-native-lyric';

const Lyrics = ({ lrc, currentTime }) => {

    const lineRenderer = useCallback(
        ({ lrcLine, index, active,millisecond }) => {
            console.log("milliseconds",millisecond);
            return (
                <Text
                    style={{ textAlign: 'center', fontSize: 16, color: active ? 'white' : 'gray', lineHeight: 20}}>
                    {lrcLine.content}
                </Text>
            );
        },
        [],
    );

    return (
        <View style={{height: 300}}>
            <Lyric
                lrc={lrc}
                currentTime={currentTime}
                lineHeight={20}
                lineRenderer={lineRenderer}
            />
        </View>
    );
};

export default Lyrics;
