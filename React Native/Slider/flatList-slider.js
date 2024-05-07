/*


function  or conconent : 
const renderItem = ({item}) => (
  <View style={styles.container} key={item?.node?.id}>
    <Image
      style={{
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
      source={{uri: item?.node?.productImage}}
    />
    <View style={{padding: 5}}>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{fontWeight: 400, fontSize: 12, fontFamily: 'roboto'}}>
        {item?.node?.name}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 15,
            marginTop: 5,
            fontFamily: 'roboto',
          }}>
          ৳{item.node?.variantStocks?.edges[0]?.node?.sellPrice}
        </Text>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 12,
            marginLeft: 5,
            marginTop: 5,
            fontFamily: 'roboto',
          }}>
          (${item.node?.variantStocks?.edges[0]?.node?.sellPriceDolar})
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={{
              textDecorationLine: 'line-through',
              color: '#A4A4A4',
              fontSize: 12,
            }}>
            ৳{item.node?.variantStocks?.edges[0]?.node?.comparePrice}
          </Text>
        </View>

        <View
          style={{
            fontSize: 20,
            borderColor: '#2B2B2B',
            borderWidth: 0.5,
            padding: 5,
            borderRadius: 50,
            marginRight: 10,
          }}>
          <CartIcon name="cart-outline" size={15} color="#2b2b2b" />
        </View>
      </View>
    </View>
  </View>
);


jsx code :

      <FlatList
        data={data?.mostSoldProducts?.edges}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        />

*/