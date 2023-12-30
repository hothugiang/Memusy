import React, { useCallback, useEffect } from 'react';
import { Text, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { Lyric } from 'react-native-lyric';

const Lyrics = ({ lrc, currentTime }) => {
    const lineRenderer = useCallback(
        ({ lrcLine: { millisecond, content }, index, active }) => {
            return (
                <Text
                    style={{
                        textAlign: 'center',
                        color: active ? 'white' : 'gray',
                        fontSize:20
                    }}
                >
                    {content}
                </Text>
            );
        },
        [currentTime]
    );

    return (
        <View style={{height: 300}}>
            <Lyric
                lrc={lrc}
                currentTime={currentTime}
                lineHeight={30}
                lineRenderer={lineRenderer}
            />
        </View>
    );
};

export default Lyrics;
