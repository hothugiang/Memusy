import React, { useCallback } from 'react';
import { Text, Dimensions } from 'react-native';
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
        <Lyric
            lrc={lrc} // Use the converted lrc data
            currentTime={currentTime}
            lineHeight={16}
            lineRenderer={lineRenderer}
        />
    );
};

export default Lyrics;
