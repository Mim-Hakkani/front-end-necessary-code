/*
  const animationStyle = React.useCallback(value => {
    'worklet';

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const scale = interpolate(value, [1, 1, 1], [1, 1, 1]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{scale}],
      zIndex,
      opacity,
    };
  }, []);


jsx code :


    <View
            style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {data?.categoriesWithImages?.edges?.map(items => (
              <View style={{flexBasis: '50%'}}>
                <Carousel
                  loop
                  width={width}
                  height={163}
                  autoPlay={true}
                  data={items?.node?.categoryImages?.edges}
                  scrollAnimationDuration={1000}
                  vertical={true}
                  renderItem={({index, item}) => (
                    <View key={index}>
                     
                      <Image
                        style={{
                          width:width*0.46,
                          height: 163,
                          borderRadius: 4,
                        }}
                        resizeMode="cover"
                        source={{uri: item?.node?.image}}
                      />
                    </View>
                  )}
                  customAnimation={animationStyle}
                />

                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 13,
                    color: '#424242',
                    fontFamily: 'roboto',
                    paddingTop: 8,
                    paddingBottom: 12,
                  }}
                  numberOfLines={2} // Limit to 2 lines
                  ellipsizeMode="tail">
                  {items?.node?.name}
                </Text>
              </View>
            ))}
          </View>

*/