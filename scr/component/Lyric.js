import React, { useCallback } from 'react';
import { Text } from 'react-native';
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
        <Lyric
            lrc={lrc} // Use the modified lrc data
            currentTime={currentTime}
            lineHeight={25}
            lineRenderer={lineRenderer}
            autoScroll
            autoScrollAfterUserScroll={500}
            
        />
    );
};

export default Lyrics;
