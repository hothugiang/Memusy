import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { Lyric } from 'react-native-lyric';

const Lyrics = ({ lrc, currentTime }) => {

    const lineRenderer = useCallback(
        ({ lrcLine, index, active,millisecond }) => {
            console.log("milliseconds",millisecond);
            return (
                <Text
                    style={{ textAlign: 'center', color: active ? 'white' : 'gray' }}>
                    {lrcLine.content}
                </Text>
            );
        },
        [],
    );

    return (
        <Lyric
            style={{ height: 500 }}
            lrc={lrc} // Use the converted lrc data
            currentTime={currentTime}
            lineHeight={16}
            lineRenderer={lineRenderer}
        />
    );
};

export default Lyrics;
