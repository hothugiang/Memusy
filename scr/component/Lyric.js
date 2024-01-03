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
                        fontSize:18
                    }}
                >
                    {content}
                </Text>
            );
        },
        [currentTime]
    );

    return (
        <View>
            <Lyric
                lrc={lrc}
                currentTime={currentTime}
                lineHeight={25}
                lineRenderer={lineRenderer}
            />
        </View>
    );
};

export default Lyrics;
