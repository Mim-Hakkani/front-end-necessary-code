/*

****************************** function *****************************


  const [first, setFirst] = useState(6); // Number of items to fetch initially
  const { data, loading, error, fetchMore } = useQuery(ALL_CATEGORY_WISE_IMAGE_INDEXPAGE, {
    variables: { first, after: null },
  });



    const handleLoadMore = () => {
    if (!loading && data.categoriesWithImages.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          first: 10, // Number of items to fetch in each subsequent request
          after: data.categoriesWithImages.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            categoriesWithImages: {
              ...fetchMoreResult.categoriesWithImages,
              edges: [...prev.categoriesWithImages.edges, ...fetchMoreResult.categoriesWithImages.edges],
            },
          };
        },
      });
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={{ flexBasis: '50%' }}>
      <Carousel
        loop
        width={width}
        height={163}
        autoPlay={true}
        data={item.node.categoryImages.edges}
        scrollAnimationDuration={1000}
        vertical={true}
        renderItem={({ index, item }) => (
          <View key={index}>
            <Image
              style={{
                width: width * 0.46,
                height: 163,
                borderRadius: 4,
              }}
              resizeMode="cover"
              source={{ uri: item.node.image }}
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
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.node.name}
      </Text>
    </View>
  );


 ******************** jsx *****************************

    <FlatList
        data={data?.categoriesWithImages?.edges || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <SkeletonPlaceholderComponent />}
      />


************************** placeholder-skeleton **********************


const SkeletonPlaceholderComponent = () => (
  <SkeletonPlaceholder borderRadius={4} backgroundColor="#DBEEF4" speed={1000}>
    <SkeletonPlaceholder.Item flexDirection="row" flexWrap="wrap" columnGap={4} rowGap={10}>
      {[...Array(10)].map((_, index) => (
        <SkeletonPlaceholder.Item flexDirection="column" marginLeft={15} key={index}>
          <SkeletonPlaceholder.Item width={156} height={60} marginBottom={5} />
          <SkeletonPlaceholder.Item width={156} height={5} />
        </SkeletonPlaceholder.Item>
      ))}
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

*/