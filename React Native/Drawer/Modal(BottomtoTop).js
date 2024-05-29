// function

const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
const [showFocus,setShowFocus] =useState(false)

const handleCloseSubCat = () => {
    setShowFocus(true);

    setTimeout(() => {
      setShowSubCategoryModal(false);
      setShowFocus(false); // Reset showFocus after closing the modal
    }, 50); // Delay for 200ms
  };


// jsx 


<View style={styles.backdrop}>
    <Modal
    animationType="slide"
    transparent={true}
    visible={showSubCategoryModal}
    onRequestClose={() => {
        setShowSubCategoryModal(false);
    }}>
        <TouchableWithoutFeedback onPress={() => setShowSubCategoryModal(false)}>

        
    <View style={styles.centeredView}>

    <TouchableWithoutFeedback>
        <View style={styles.modalView}>


        <ScrollView>
            <Text style={styles.catText}>{categoryName}</Text>

            <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
            }}>
            {subCategoryData?.categoryWiseSubCategoryListAndMostSoldProducts?.subcategories?.edges?.map(
                item => (
                <View
                    style={{
                    flexBasis: '22%',
                    paddingBottom: 15,
                    }}
                    key={item?.node?.id}>
                    <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <FastImage
                        style={{height: 60, width: 60, borderRadius: 50}}
                        source={{
                        uri: item?.node?.image,
                        priority: FastImage.priority.normal,
                        // cache:FastImage.cacheControl.cacheOnly
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                    <Text
                        numberOfLines={2}
                        style={{
                        color: '#2b2b2b',
                        paddingTop: 8,
                        lineHeight: 15,
                        textAlign: 'center',
                        fontSize: 13,
                        }}>
                        {item?.node?.name}
                    </Text>
                    </View>
                </View>
                ),
            )}
            </View>

            <Pressable
            style={{
                position: 'absolute',
                top: 0,
                right: 0
            }}
            onPress={handleCloseSubCat}>
            <Close name="close" size={22} color="#2b2b2b" 
            
            style={{
                height:36,
                width:36,
                borderRadius:50,
                backgroundColor:showFocus ? '#EDE9E9': '#fff',
                textAlign:'center',
                paddingTop:6
            }}
            />
            </Pressable>
        </ScrollView>
        </View>
        </TouchableWithoutFeedback>
    </View>
    </TouchableWithoutFeedback>
    </Modal>
</View>


// css 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    subcategoryImage:{
      height:60,
      width:60,
      borderRadius:50
    },
  
    subcategoryItem:{
      width:88
    },
  
    subcategoryName:{
     textAlign:'center',
     color:'#2b2b2b',
     marginTop:8
    },
    catText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2b2b2b',
      marginBottom: 18,
      paddingLeft: 2,
    },
    viewAllContainer: {
      paddingTop: 18,
      paddingBottom: 26,
      paddingLeft: 12,
      flexDirection:'row',
    },
    viewAllButton: {
      height: 60,
      width: 60,
      borderRadius: 50,
      backgroundColor: '#EDE9E9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewAllText: {
      color: '#2b2b2b',
      marginTop:8
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      width: '100%',
    },
    modalView: {
      backgroundColor: 'white',
      shadowColor: '#000',
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '100%',
      maxHeight: '80%',
      position: 'relative',
    },
  });





